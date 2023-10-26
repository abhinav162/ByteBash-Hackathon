import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Address = model('Address', addressSchema);

export default Address;