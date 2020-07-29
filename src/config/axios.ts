//const axios = require('axios').default;
import axios, { AxiosResponse } from 'axios';

const uriAPI = 'http://localhost:8080/ecotree/robiot-api'; //One API per Robiot !

export function getRobiotPosition() {
    return axios
        .get(`${uriAPI}/configurations/301`, {
            params: {},
        })
        .then(function (response: AxiosResponse) {
            console.log(response.data);
        })
        .catch(function (error: string) {
            console.log(error);
        });
}

export async function getRobiotBattery() {
    return await axios
        .get(`${uriAPI}/configurations/101`, {
            params: {},
        })
        .then(function (response: AxiosResponse) {
            return response.data;
        })
        .catch(function (error: string) {
            console.log(error);
        });
}

export function moveRobiot(x: string, y: string) {
    return axios
        .put(`${uriAPI}/configurations/302`, {
            id: '302',
            link: {
                params: { rel: 'self' },
                href: '/configurations/302',
            },
            name: 'Destination Location',
            content: `${x},${y}`, //ex: 2.0,2.0
            status: 'ACTIVE',
        })
        .then(function (response: AxiosResponse) {
            console.log(response.data);
        })
        .catch(function (error: string) {
            console.log(error);
        });
}
