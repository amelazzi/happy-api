import expressJSDocSwagger from 'express-jsdoc-swagger'
import packageJson from '../../package.json' assert { type: 'json' }
import { environment } from '../environment'

const options = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
  },
  baseDir: './',
  filesPattern: ['./**/*.ts', './**/*.js'],
  servers: [
    {
      url: `http://localhost:${environment.port}`,
      description: 'Local server',
    },
    {
      url: `https://${packageJson.name.replaceAll('-', '.')}.{env}.qualia.fr`,
      description: 'Kciope servers',
      variables: {
        env: {
          enum: ['dev', 'staging'],
          default: 'dev',
        },
      },
    },
  ],
  exposeSwaggerUI: true,
  swaggerUIPath: environment.swagger.path,
  exposeApiDocs: true,
  apiDocsPath: `${environment.swagger.path}/json`,
  notRequiredAsNullable: true,
}

export const initSwagger = (app) => {
  expressJSDocSwagger(app)(options, {
    components: {
      securitySchemes: {
        JwtAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  })
}
