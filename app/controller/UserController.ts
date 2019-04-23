import User, {IUser} from "../models/User";
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import Permissions from '../services/Permissions'

class UserController {
    static async makeUser(firstName: string, lastName: string, email: string, password: string): Promise<void | string> {
        if (!firstName || !lastName || !email || !password) {
            throw new Error("A field is incomplete!");
        }
        if (!await User.findOne({"email": email})) {
            const hashed = await argon2.hash(password);
            const user: IUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashed
            });
            user.save().catch(error => {
                console.log(error);
                throw new Error(error)
            });
            return "User " + escape(email) + " created.";
        } else {
            console.log("error");
            throw new Error("User already exists!")
        }
    }

    static async loginWithPassword(email: string, password: string): Promise<any> {
        if (!email || !password) {
            throw new Error("Login failed!");
        }
        return await User.findOne({"email": email}).then(async userModel => {
            if (userModel != null) {
                let result: boolean = await argon2.verify(userModel['password'], password);
                if (result) {
                    let json = {
                        email: email,
                        permission: 999// User.schema.methods.getPermission(email)
                    };
                    return await jwt.sign(json, process.env.JWT_SECRET || "", {expiresIn: '1h'})
                } else {
                    throw new Error("Login failed!")
                }
            } else {
                throw new Error("Login failed")
            }
        }).catch((err) => {
            throw new Error(err)
        })


    }

    static async loginWithToken(token: string) {
        const key: string = process.env.JWT_SECRET || '';
        return await jwt.verify(token, key, ((err, decoded) => {
            if (err) {
                throw new Error("Token login failed!");
            } else {
                return jwt.sign(decoded, key, {expiresIn: '1h'})
            }
        }))
    }

}

export default UserController;
