import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please login again.' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret_key_12345");
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error("User Auth Error:", error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
