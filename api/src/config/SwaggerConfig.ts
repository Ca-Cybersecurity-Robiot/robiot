import { SwaggerOptions } from 'swagger-ui-express';

export const SwaggerConfig: SwaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        info: {
            title: 'Robiot API',
            version: '1.0.0',
            description: 'Welcome on Robiot REST API',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/',
            },
            contact: {
                name: 'Robiot',
                url: 'https://robiot.io/',
                email: 'contact@robiot.io',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api/',
            },
        ],
    },
    apis: ['./src/swagger-doc/*.spec.yml'],
};
