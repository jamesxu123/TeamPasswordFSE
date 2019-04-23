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
    },
    permission: {
        type: Number,
        required: true,
        default: 1
    }
});

UserSchema.methods.getPermission = async function (email: string) {
    let user: IUser = await this.findOne({email: email});
    return user['permission']
};


export interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    permission: number
}

export default mongoose.model<IUser>('User', UserSchema);

