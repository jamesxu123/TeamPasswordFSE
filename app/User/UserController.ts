import User, {IUser} from "./User";
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'

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

    static async loginWithPassword(email: string, password: string): Promise<string> {
        if (!email || !password) {
            throw new Error("Login failed!");
        }
        return User.findOne({"email": email}).then(async userModel => {
            if (userModel != null) {
                let result: boolean = await argon2.verify(userModel['password'], password);
                if (result) {
                    let json = {
                        email: email,
                        permission: userModel['permission']
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

    // static async loginWithToken(token: string): Promise<string> {
    //     const key: string = process.env.JWT_SECRET || '';
    //     return new Promise<string>((resolve, reject) => {
    //         jwt.verify(token, key, (err, decoded) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 jwt.sign(decoded, key, {expiresIn: '1h'}, (err, decoded) => {
    //                     if (err) {
    //                         reject(err)
    //                     } else {
    //                         resolve(decoded)
    //                     }
    //                 });
    //             }
    //         })
    //     })
    // }
}

// return jwt.verify(token, key, ((err, decoded) => {
//     if (err) {
//         throw new Error("Token login failed!");
//     } else {
//         return jwt.sign(decoded, key, {expiresIn: '1h'})
//     }
// }))
export default UserController;
