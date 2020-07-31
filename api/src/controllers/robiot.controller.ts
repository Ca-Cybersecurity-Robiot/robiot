import { Request, Response } from 'express';
import '../config/passport';
import { getRobiotBattery, getRobiotPosition, getRobiotStatus, moveRobiot } from '../services/robiot.service';
import logger from '../util/logger';

/**
 * GET /api/v1/robiot/
 * get Config list from one ROBIOT
 */
export const getConfigListFromRobiot = async (req: Request, res: Response): Promise<void> => {
    const result = await getRobiotPosition();
    logger.debug(req.body);
    res.status(200).send(result);
};

/**
 * GET /api/v1/robiot/:ConfigId
 * get Robiot config by config Id
 */
export const getConfigByIdFromRobiot = async (req: Request, res: Response) => {
    let result;
    if (req.params.configId == '301') {
        result = await getRobiotPosition();
    } else if (req.params.configId == '201') {
        result = await getRobiotStatus();
    } else if (req.params.configId == '101') {
        result = await getRobiotBattery();
    }
    console.log(req);
    // logger.debug(req.body);
    res.status(200).send(result);
};

/**
 * PUT /api/v1/robiot/:ConfigId
 * Update Robiot config by config Id.
 */
export const putConfigByIdToRobiot = async (req: Request, res: Response) => {
    try {
        const result = await moveRobiot(req.body.content);
        logger.debug(req.body);
        res.status(200).send({ message: result });
    } catch (e) {}
};
