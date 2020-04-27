import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "TS API template",
            version: "1.0.0",
            description: "A TypeScript API template",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/",
            },
            contact: {
                name: "alehuo",
                url: "https://github.com/alehuo",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: [path.join("src", "controllers", "*.ts")],
};
export const swaggerSpec = swaggerJsdoc(options);
