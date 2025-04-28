// import jwt ,{Secret,JwtPayload}from "jsonwebtoken"
// import { config } from "dotenv";
// config();
// const JWT_SECRET_KEY:Secret =process.env.JWT_SECRET_KEY
// class Tokenhandle {
//     static generateToken(user:any) {
//         return jwt.sign(
//             {
//                 id: user.id.toString(),
//                 email: user.email,
//                 name: user.username,
//             },
//             JWT_SECRET_KEY,
//             { expiresIn: "1h" }
//         );
//     }

//     static verifyToken(token:any) {
//         return jwt.verify(token,JWT_SECRET_KEY);
//     }
// }
// export default Tokenhandle
