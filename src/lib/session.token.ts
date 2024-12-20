import jwt from "jsonwebtoken";

type Payload = {
  userId: number;
  iat: number;
  exp: number;
};

const JWT_SECRET = process.env.JWT_SECRET!;
export function decodeToken(token: string): Payload {
  return jwt.verify(token, JWT_SECRET) as Payload;
}
