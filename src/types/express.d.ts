import { User } from "./user";

type UserId = {
    userId: number;
}
declare global {
    namespace Express {
        interface Request {
        user: UserId;
        }
    }
}