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

export function putAction(link: string) {
    return axios
        .put(`${uriAPI}/${link}`, {
            id: 302,
            link: {
                params: { rel: 'self' },
                href: link,
            },
            name: 'Destination Location',
            content: '2.0,2.0',
            status: 'ACTIVE',
        })
        .then(function (response: string) {
            console.log(response);
        })
        .catch(function (error: string) {
            console.log(error);
        });
}
