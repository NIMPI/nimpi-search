//carregar as dependencias no meu módulo
const elasticsearch = require('elasticsearch');
const chalk = require('chalk');
const moment = require('moment');
const mongoClient = require('mongodb').MongoClient;
const params_elastic_mongo = require('./params_sync.json')

//parâmentros de conexão mongo
const url_mongo = params_elastic_mongo.mongodb.url;

//parâmetros de conexão elasticsearch
/*node: params_elastic_mongo.elasticsearch.url + "" + params_elastic_mongo.elasticsearch.port,
    auth: {
        username: 'elastic',
        password: '$uportE99'
      },
 auth: {
   username: 'elastic',
   password: '$uportE99'
 } 
  node: 'https://elastic:$uportE99@localhost:9200',
    requestTimeout: 6 * 350 * 25000,
    requestTimeout: Infinity,
    keepAlive: false
    // log: 'debug',
  */
const elasticClient = new elasticsearch.Client({
    host: [
        {
            host: 'localhost',
            auth: 'elastic:$uportE99',
            protocol: 'http',
            port: 9200
        }
    ]
})

var itemQue = [];
var limitData = 1000
var offset = 0;
var prev = 0;
var iIndex = 1;

//função para copiar os dados do elasticsearch
function bulkop(data, callback) {
    elasticClient.bulk({
        body: data
    }, function (error, response) {
        if (callback)
            callback(error, response);
    });
    data = [];
};

//função para formatar a data
Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]);
};

function index_elastic_from_mongo(esIndexName, esIndexType, collectionName, callback) {
    mongoClient.connect(url_mongo, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        if (err) {
            let retorno = {
                "msg": "Sorry unable to connect to MongoDB Error"
            }
            return (callback(retorno));
            //console.log(chalk.yellow('Sorry unable to connect to MongoDB Error:\n'), chalk.red(err));
        } else {

            // mongodb
            console.log(chalk.yellow("Connected successfully to server", url_mongo));
            var db = client.db(params_elastic_mongo.mongodb.database);
            db.collection(collectionName, function (err, collection) {

                collection.find({}).skip(offset).limit(limitData).sort({ _id: -1 }).toArray(function (err, result) {
                    if (result.length > 0) {
                        process.nextTick(function () {
                            result.forEach(element => {
                                for (prop in element) {
                                    if (typeof element[prop] === 'object') {
                                        if (prop.indexOf('_DATE') != -1) {
                                            var m = moment(new Date(element[prop]).yyyymmdd(), ["MM/DD/YYYY", "YYYY/MM/DD", "DD/MM/YYYY"]);
                                            if (m.isValid()) {
                                                element[prop] = m;
                                            }
                                            else
                                                delete element[prop];
                                        }
                                    }
                                }
                                if (element._id) {
                                    itemQue.push
                                        ({
                                            index: {
                                                _index: esIndexName,
                                                _type: esIndexType,
                                                _id: element._id
                                            }
                                        });
                                    delete element._id;
                                }
                                else {
                                    itemQue.push
                                        ({
                                            index: {
                                                _index: esIndexName,
                                                _type: esIndexType,
                                                _id: iIndex
                                            }
                                        });
                                    // console.log(itemQue);
                                }
                                itemQue.push(JSON.stringify(element));
                                // console.log(itemQue);
                                iIndex++;
                            });//End For loop

                            if (itemQue.length > 0) {
                                // console.log(JSON.stringify(itemQue));
                                bulkop(itemQue, function (err, res) {
                                    prev = offset;
                                    offset = offset + limitData;

                                    console.log(chalk.blue("prevSet :" + prev + " newSet : " + offset))
                                    if (err) {
                                        let retorno = {
                                            "msg": err
                                        }
                                        return (callback(retorno));
                                    } else if (res) {
                                        console.log(chalk.green("Data Items added succesfully :" + res.items.length))
                                        index_elastic_from_mongo(esIndexName, esIndexType, collectionName, callback);
                                    }
                                })//end Bulk copy Elastic search   
                            }
                            else {
                                //process.exit()
                            }
                        });//Process Next tick
                    }//end if result  
                    else {

                        //console.log(chalk.red("All the data successfully imported into the Elasticsearch!"));
                        //process.exit()
                        let retorno = {
                            "msg": "All the data successfully imported into the Elasticsearch!"
                        }
                        return (callback(retorno));
                    }
                });//end select query mongo collection table
            })
        }
    });
}

module.exports = { index_elastic_from_mongo };
