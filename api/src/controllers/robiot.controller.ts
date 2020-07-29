import { Request, Response, NextFunction } from 'express';
import '../config/passport';
import logger from '../util/logger';

/**
 * GET /api/v1/robiot/
 * get Config list from one ROBIOT
 */
export const getConfigListFromRobiot = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req.body);
    res.status(200).send({ message: 'here is your config list' });
};

/**
 * GET /api/v1/robiot/:ConfigId
 * get Robiot config by config Id
 */
export const getConfigByIdFromRobiot = async (req: Request, res: Response) => {
    logger.debug(req.body);
    res.status(200).send({ message: 'une config robiot par config id' });
};

/**
 * PUT /api/v1/robiot/:ConfigId
 * Update Robiot config by config Id.
 */
export const putConfigByIdToRobiot = async (req: Request, res: Response) => {
    logger.debug(req.body);
    res.status(200).send({ message: 'config du robiot par configId' });
};
