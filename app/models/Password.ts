import mongoose, {Schema, Document} from "mongoose";

const PasswordSchema: Schema = new Schema<any>({
    password: {
        type: String
    }
});

export interface IPasswordSchema extends Document {
    vaultName: string,
}

export default mongoose.model<IPasswordSchema>('Password', PasswordSchema);
