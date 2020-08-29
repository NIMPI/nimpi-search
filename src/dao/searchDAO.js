const { suggest } = require('../config/connectionelastic.js');

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

module.exports.autocomplete = (texto,callback)=>{
  var client = require('../config/connectionelastic.js');
  client.search({  
    index: 'nimpi',
    type: '_doc',
    body: {
      "suggest": {
        "jobsuggest": {
          "prefix": `${texto}`,
          "completion": {
            "field": "title",
            "size":100,
            "fuzzy": {
              "fuzziness": 1
            }
          }
        }
      }
    }
  },function (error, response,status) {
      if (error){
        let retorno = {
            "status":status,
            "msg":"error when searching for suggestions in elasticsearch "
        }
        return callback(retorno);
      }
      else {
        //retornar apenas as sugestões e score
        let sugestoes = [];

      let suggest = response.suggest.jobsuggest[0].options;
        //console.log(suggest[0].text)
      
        //console.log(suggest[0].text.indexOf('test'));
      
      for(let i = 0; i < suggest.length; i++){
       sugestoes[i] = suggest[i].text;
        
     }

     console.log(sugestoes);
     
        let retorno = {
            "status":status,
            "data":sugestoes};
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