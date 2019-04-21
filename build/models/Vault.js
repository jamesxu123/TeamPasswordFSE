"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Password_1 = __importDefault(require("./Password"));
const VaultSchema = new mongoose_1.Schema({
    vaultName: {
        type: String,
        required: true
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
        type: [Password_1.default]
    }
});
exports.default = mongoose_1.default.model('Vault', VaultSchema);
