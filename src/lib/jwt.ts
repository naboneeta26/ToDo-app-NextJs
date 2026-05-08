import jwt, { type JwtPayload } from 'jsonwebtoken';

const secretkey = process.env.JWT_SECRET as string;

if(!secretkey){
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, secretkey, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secretkey);
}