module.exports.findbyterm = (query,callback)=>{
    var client = require('../config/connectionelastic.js');

        client.search({  
            index: 'nimpi',
            type: '_doc',
            body: {
              query: {
                "query_string": {
                 "query": `*${query.term}*`
               },    
             },
             "size":query.size,
             "from":query.from
            }
          },function (error, response,status) {
              if (error){
                let retorno = {
                    "status":400,
                    "msg":"Error fetching documents in Elasticsearch"
                }
                return callback(retorno);
              }
              else {
                let retorno = {
                    "status":200,
                    "data":response.hits.hits};
                return callback(retorno);
                /*
                response.hits.hits.forEach(function(hit){
                 retorno.push(hit);
                })
                ;
                */
              }
          });
}