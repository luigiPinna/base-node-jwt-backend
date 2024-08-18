import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & { id: number; email: string; role: string };
        }
    }
}

// Questo assicura che il file venga trattato come un modulo
export {};