import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
class Tokenhandle {
    static generateToken(user) {
        return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
    }
}
export default Tokenhandle;
