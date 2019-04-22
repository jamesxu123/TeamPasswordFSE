import mongoose, {Schema, Document} from "mongoose";
import {IUser} from './User'
import Password, {IPassword} from "./Password";

const VaultSchema: Schema = new Schema<any>({
    vaultName: {
        type: String,
        required: true,
        unique: true
    },
    vaultAdmin_ids: {
        type: [String],
        required: true
    },
    vaultMember_ids: {
        type: [String],
        required: true
    },
    passwords: {
        type: [Password]
    }
});

export interface IVault extends Document {
    vaultName: string,
    vaultAdmin_ids: Array<IUser['_id']>,
    vaultMember_ids: Array<IUser['_id']>,
    passwords: Array<IPassword>
}

export default mongoose.model<IVault>('Vault', VaultSchema);
