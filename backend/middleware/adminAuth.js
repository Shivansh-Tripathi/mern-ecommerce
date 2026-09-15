import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Please login again." });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret_key_12345");
        if (token_decode.role !== "admin" && token_decode !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)) {
            return res.json({ success: false, message: "Not Authorized. Admin access required." });
        }
        next();
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;
