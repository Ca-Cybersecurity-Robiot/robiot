import axios, { AxiosResponse } from 'axios';

const uriAPI = 'http://localhost:8080/ecotree/robiot-api'; //One API per Robiot !

export async function getRobiotPosition(): Promise<AxiosResponse> {
    let result = null;
    await axios
        .get(`${uriAPI}/configurations/301`, {
            params: {},
        })
        .then(function (response: AxiosResponse) {
            result = response.data;
        })
        .catch(function (error: string) {
            console.log(error);
        });

    return result;
}

export async function getRobiotBattery(): Promise<AxiosResponse> {
    let result = null;
    await axios
        .get(`${uriAPI}/configurations/101`, {
            params: {},
        })
        .then(function (response: AxiosResponse) {
            result = response.data;
        })
        .catch(function (error: string) {
            console.log(error);
        });

    return result;
}

export async function moveRobiot(x: string, y: string): Promise<AxiosResponse> {
    let result = null;
    await axios
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
            result = response.data;
        })
        .catch(function (error: string) {
            console.log(error);
        });

    return result;
}
