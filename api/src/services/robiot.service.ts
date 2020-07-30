import axios, { AxiosResponse } from 'axios';
import logger from '../util/logger';

/**
 * Service used to call ROBIOT API
 */

const robiotUrl = process.env.ROBIOT_URL; //One API per Robiot !

export async function getRobiotPosition(): Promise<AxiosResponse> {
    try {
        const response = await axios.get(`${robiotUrl}/configurations/301`, {
            params: {},
        });
        return response.data;
    } catch (e) {
        logger.error(e);
    }
}

export async function getRobiotBattery(): Promise<AxiosResponse> {
    try {
        const response = await axios.get(`${robiotUrl}/configurations/101`, {
            params: {},
        });
        return response.data;
    } catch (e) {
        logger.error(e);
    }
}

export async function moveRobiot(x: string, y: string): Promise<AxiosResponse> {
    try {
        const response = await axios.put(`${robiotUrl}/configurations/302`, {
            id: '302',
            link: {
                params: { rel: 'self' },
                href: '/configurations/302',
            },
            name: 'Destination Location',
            content: `${x},${y}`, //ex: 2.0,2.0
            status: 'ACTIVE',
        });
        return response.data;
    } catch (e) {
        logger.error(e);
    }
}
