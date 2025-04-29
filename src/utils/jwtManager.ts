import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;

class Tokenhandle {
  static generateToken(user: { id: string; email: string; username: string }) {
    return jwt.sign(
      {
        id: user.id.toString(),
        email: user.email,
        name: user.username,
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' },
    );
  }

  static verifyToken(token: string): JwtPayload | string {
    return jwt.verify(token, JWT_SECRET_KEY);
  }
}

export default Tokenhandle;
