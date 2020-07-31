import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import '../config/passport';
import logger from '../util/logger';
import asyncHandler from '../util/asyncHandler';
import { checkUniqueDirection, checkFloatFormat } from '../validators/robiot.validator';

import { getRobiotBattery, getRobiotPosition, moveRobiot, getRobiotStatus } from '../services/robiot.service';

/**
 * GET /api/v1/robiot/
 * get Config list from one ROBIOT
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConfigListFromRobiot = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req.body);
    const result = await getRobiotPosition();
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
 * GET /api/v1/robiot/configuration/battery
 * Get Robiot Battery value
 * @param req
 * @param res
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRobiotBatteryValue = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(await getRobiotBattery());
});

/**
 * PUT /api/v1/robiot/:ConfigId
 * Update Robiot config by config Id.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const putMoveRobiot = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await body('content', 'Content is not valid')
        .isString()
        .custom(checkUniqueDirection)
        .withMessage('Vous ne pouvez pas configurer x et y en même temps')
        .custom(checkFloatFormat)
        .withMessage('Le format float accepté est le suivant "1.5" ')
        .run(req);

    const errors = validationResult(req);

    if (errors.errors.length) throw new Error(JSON.stringify(errors));

    logger.debug(req.body);
    const { content } = req.body;
    const result = await moveRobiot(content);
    res.status(200).send(result);
});
