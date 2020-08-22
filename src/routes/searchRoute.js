module.exports = app => {
    app.get('/v1/document/findbyterm', (req, res) => {
        let query = {
            term: req.query.term!=undefined ? req.query.term:'',
            size: req.query.size!=undefined ? req.query.size:10,
            from: req.query.from!=undefined ? req.query.from:0
        }
        
        app.src.controllers.searchController.findbyterm(app,req,res,query);
    

        //res.send("Bem vindo a interface backend de busca avançada do projeto NIMPI.");
    })
}