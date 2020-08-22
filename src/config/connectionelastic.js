var elasticsearch=require('elasticsearch');
require('dotenv').config();


var client = new elasticsearch.Client( {  
  hosts: [
    `http://${process.env.USER_ELASTIC}:${process.env.PASSWORD_ELASTIC}@${process.env.HOST_ELASTIC}:${process.env.PORT_ELASTIC}/`,
  ]
});

module.exports = client;  
