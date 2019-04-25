"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    static makeUser(firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!firstName || !lastName || !email || !password) {
                throw new Error("A field is incomplete!");
            }
            if (!(yield User_1.default.findOne({ "email": email }))) {
                const hashed = yield argon2.hash(password);
                const user = new User_1.default({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashed
                });
                user.save().catch(error => {
                    console.log(error);
                    throw new Error(error);
                });
                return "User " + escape(email) + " created.";
            }
            else {
                console.log("error");
                throw new Error("User already exists!");
            }
        });
    }
    static loginWithPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error("Login failed!");
            }
            return User_1.default.findOne({ "email": email }).then((userModel) => __awaiter(this, void 0, void 0, function* () {
                if (userModel != null) {
                    let result = yield argon2.verify(userModel['password'], password);
                    if (result) {
                        let json = {
                            email: email,
                            permission: userModel['permission']
                        };
                        return yield jwt.sign(json, process.env.JWT_SECRET || "", { expiresIn: '1h' });
                    }
                    else {
                        throw new Error("Login failed!");
                    }
                }
                else {
                    throw new Error("Login failed");
                }
            })).catch((err) => {
                throw new Error(err);
            });
        });
    }
    static loginWithToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = process.env.JWT_SECRET || '';
            return yield jwt.verify(token, key, ((err, decoded) => {
                if (err) {
                    throw new Error("Token login failed!");
                }
                else {
                    return jwt.sign(decoded, key, { expiresIn: '1h' });
                }
            }));
        });
    }
}
exports.default = UserController;
