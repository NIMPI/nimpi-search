module.exports.indexingElastic = (app,req,res) =>{
var params_elastic_mongo = require('../dao/params_sync.json')

var index = params_elastic_mongo.elasticsearch.elasticsearchIndices.NIMPI.index;
var type = params_elastic_mongo.elasticsearch.elasticsearchIndices.NIMPI.type;
var collection = params_elastic_mongo.elasticsearch.elasticsearchIndices.NIMPI.collectionName;

//executar o método para sincronização da base de dados.
app.src.dao.indexingDAO.index_elastic_from_mongo(index,type,collection,(resposta)=>{
    res.send(resposta);
}); 
}