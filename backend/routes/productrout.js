import express from "express";
import { listProduct, addProduct, removeProduct, singleProduct } from "../controller/productcontroller.js";
import upload from "../middleware/mulder.js";
import adminAuth from "../middleware/adminAuth.js";

const productrouter = express.Router();

productrouter.post("/add", adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);
productrouter.get("/list", listProduct);
productrouter.post("/single", singleProduct);
productrouter.post("/remove", adminAuth, removeProduct);

export default productrouter;
