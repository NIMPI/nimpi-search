var elasticsearch=require('elasticsearch');
require('dotenv').config();





var client = new elasticsearch.Client( {  
  
  hosts: [
    process.env.USER_ELASTIC==''?`http://${process.env.HOST_ELASTIC}:${process.env.PORT_ELASTIC}/`:
`http://${process.env.USER_ELASTIC}:${process.env.PASSWORD_ELASTIC}@${process.env.HOST_ELASTIC}:${process.env.PORT_ELASTIC}/`
  ]
});

/*
client.indices.putMapping({
  index: 'nimpi',
  type: '_doc',
  body: {
  properties: {
  'title': {
  'type': 'completion'
  },
  }
  }
  },function(err,resp,status){
  if (err) {
  console.log(err);
  }
  else {
  console.log(resp);
  }
  });
*/
module.exports = client;  
