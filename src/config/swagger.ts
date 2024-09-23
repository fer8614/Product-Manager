import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "Rest API Node.js / Express / Typescript",
      version: "1.0.0",
      description: "API Docs for products",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('https://devpositive.com/logo.png');
      height: 70px;
      width: auto;
    }
  `,
  customSiteTitle: "Docs Rest API Node.js / Express / Typescript",
};
export default swaggerSpec;
export { swaggerUiOptions };
