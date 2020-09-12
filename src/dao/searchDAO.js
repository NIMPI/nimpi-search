const { suggest } = require('../config/connectionelastic.js');

module.exports.findbyterm = (query,callback)=>{
    var client = require('../config/connectionelastic.js');

        client.search({  
            index: 'nimpi',
            type: '_doc',
            body: {
              query: {
                "query_string": {
                 "query": ""+query.term+"",
                 "default_operator":"OR",
            
               },    
             },
             "size":query.size,
             "from":query.from,
             "aggs": {
    
              "type": {
                "terms": {
                  "field": "type.keyword",
                  "size": 10
                }
          },
            "year": {
                "terms": {
                  "field": "year",
                  "size": 10
                }
          },
            "date": {
                "terms": {
                  "field": "date",
                  "size": 5
                }
          },
            "tags": {
                "terms": {
                  "field": "tags.keyword",
                  "size": 5
                }
            }
          }
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
                    "data":response.hits.hits,
                    "filters":response.aggregations
                  };
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
            "field": "title.completion",
            "size":100,
            "fuzzy": {
              "fuzziness":"auto"
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
       if(sugestoes.indexOf(suggest[i].text)==-1){
        sugestoes.push(suggest[i].text);
       }
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

module.exports.didyoumean = (texto,callback)=>{
  var client = require('../config/connectionelastic.js');
  client.search({  
    index: 'nimpi',
    type: '_doc',
    body: {
      "suggest": {
        "text":`${texto}`,
        "simple_phrase": {
          "phrase": {
            "field": "title",
            "confidence": 0.0,
            "direct_generator": [
              {
                "field": "title"
              }
            ],
            "collate": {
              "query": {
                "source": {
                  "match": {
                    "title": {
                      "query": "{{suggestion}}",
                      "fuzziness": "1",
                      "operator": "and"
                    }
                  }
                }
              },
              "prune": "true"
            }
          }
        }
      }
    }},function (error, response,status) {
      if (error){
        let retorno = {
            "status":status,
            "msg":"error when searching for suggestions in elasticsearch "
        }
        return callback(retorno);
      }
      else {



        let text_correct = response.suggest.simple_phrase[0].options[0].text;
     
        let retorno = {
            "status":status,
            "isCorrection":response.suggest.simple_phrase[0].options.length>1 ? true : false,
            "data":response.suggest.simple_phrase[0].options.length>1 ? text_correct : "Não há correção." };
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