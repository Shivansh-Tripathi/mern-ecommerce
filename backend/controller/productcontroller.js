import { v2 as cloudinary } from "cloudinary";
import productModel from "../mongoose/productmodel.js";

// Function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Fallback if images passed as URL/array string in req.body
        if (imagesUrl.length === 0 && req.body.image) {
            imagesUrl = Array.isArray(req.body.image) ? req.body.image : [req.body.image];
        }

        const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : (sizes || []);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subcategory: subcategory || req.body.subCategory || "",
            bestseller: bestseller === "true" || bestseller === true ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.error("Add Product Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// Function to list products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("List Product Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// Function to remove product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Removed Successfully" });
    } catch (error) {
        console.error("Remove Product Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// Function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId, id } = req.body;
        const product = await productModel.findById(productId || id);
        res.json({ success: true, product });
    } catch (error) {
        console.error("Single Product Error:", error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct };
