// src/common/middleware/verify-control-key.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/custom-error';
import { HttpStatus } from '../types/http-status.enum';
import { CONFIG } from '../_config/constants';

export const verifyControlKey = (req: Request, res: Response, next: NextFunction) => {
    const clientKey = req.headers['x-control-key'];

    if (typeof clientKey !== 'string' || clientKey !== CONFIG.CONTAINER_CONTROL_KEY) {
        throw new CustomError(HttpStatus.UNAUTHORIZED, '인증이 필요합니다.');
    }

    next();
};
