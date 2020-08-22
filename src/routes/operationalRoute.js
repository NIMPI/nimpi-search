module.exports = app =>{
    app.post('/api/indexing', (req, res) => {
     app.src.controllers.elasticController.indexingElastic(app,req,res);
    })
}