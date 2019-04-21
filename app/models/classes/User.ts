import mongoose, {Schema, Document} from "mongoose";
import uuidv1 from 'uuid/v1'
const UserSchema: Schema = new Schema<any>({
    UUID: {
        default: uuidv1,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


export interface IUser extends Document {
    UUID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export default mongoose.model<IUser>('User', UserSchema);

