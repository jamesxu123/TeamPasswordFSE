import mongoose, {Schema, Document} from "mongoose";
const UserSchema: Schema = new Schema<any>({
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

UserSchema.methods.findByToken = (token: string) => {

}


export interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export default mongoose.model<IUser>('User', UserSchema);

