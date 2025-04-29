import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
class Tokenhandle {
    static generateToken(user) {
        return jwt.sign({
            id: user.id.toString(),
            email: user.email,
            name: user.username,
        }, JWT_SECRET_KEY, { expiresIn: '1h' });
    }
    static verifyToken(token) {
        return jwt.verify(token, JWT_SECRET_KEY);
    }
}
export default Tokenhandle;
