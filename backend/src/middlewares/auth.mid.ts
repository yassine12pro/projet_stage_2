import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(HTTP_UNAUTHORIZED).json({ message: "Token missing or not provided" });
    }

    try {
        // Verify token using the secret key (you may use process.env.JWT_SECRET instead of hardcoding 'secret')
        const decodedUser = verify(token, "secret");
        req.user = decodedUser; // Attach user info to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid token or expired token
        return res.status(HTTP_UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};
