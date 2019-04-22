import User, {IUser} from "../models/User";
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import Permissions from '../services/Permissions'

require('dotenv').load();

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

    static async loginWithPassword(email: string, password: string): Promise<boolean> {
        if (!email || !password) {
            throw new Error("A field is incomplete!");
        }
        return await User.findOne({"email": email}).exec().then(async userModel => {
            if (userModel != null) {
                return argon2.verify(userModel['password'], password);
            } else {
                return false;
            }
        });
    }

    static async loginWithToken(token: string) {
        const key: string = process.env.JWT_SECRET || '';
    }

}

export default UserController;
