import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import { IJwtPayload } from './interfaces/IUser';
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;

class Tokenhandle {
  static generateToken(user: IJwtPayload) {
    return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
  }
}

export default Tokenhandle;
