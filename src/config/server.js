const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const cookieParser = require ('cookie-parser')



const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//documentação da api
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
//app.use(`/api/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//carregando meus módulos automaticamente através da dependencia consign
const consign = require('consign')
consign()
    .then('./src/routes')
    .then('./src/controllers')
    .then('./src/dao')
    .into(app)


module.exports = app;

