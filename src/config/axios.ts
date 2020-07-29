const axios = require('axios').default;

const uriAPI = 'http://localhost:3000/api-docs/';

export function getAction(link: string) {
    return axios
        .get(`${uriAPI}/${link}`, {
            params: {
                //ID: 12345,
            },
        })
        .then(function (response: string) {
            console.log(response);
        })
        .catch(function (error: string) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

export function postAction() {
    return axios
        .post(`${uriAPI}/user`, {
            firstName: 'Fred',
            lastName: 'Flintstone',
        })
        .then(function (response: string) {
            console.log(response);
        })
        .catch(function (error: string) {
            console.log(error);
        });
}

export function putAction() {
    return axios.put(`${uriAPI}/user`, {
        firstName: 'Fred',
        lastName: 'Flintstone',
    });
}
