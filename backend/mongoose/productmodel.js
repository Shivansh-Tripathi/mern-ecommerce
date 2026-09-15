import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});
//for not creating schema multiple times we create model and export it
const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
                         //if available use it otherwise create new model
export default productModel;