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
    app.get('/v1/autocomplete',(req,res)=>{
        let text = req.query.text!=undefined ? req.query.text:'';
        app.src.controllers.searchController.autocomplete(app,req,res,text);
    })
    app.get('/v1/didyoumean',(req,res)=>{
        let text = req.query.text!=undefined ? req.query.text:'';
        app.src.controllers.searchController.didyoumean(app,req,res,text);
    })


}