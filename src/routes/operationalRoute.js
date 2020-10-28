module.exports = app =>{
    app.post('/api/v1/indexing', (req, res) => {
        
        app.src.controllers.autenticate.isAuth(req,(Auth)=>{
            if (Auth.isAuth){
                app.src.controllers.elasticController.indexingElastic(app,req,res);
            }else{
            res.send({
                "status":404,
                "Error":"Invalid credentials. Please consult the administrator."})
            }
            
        });
       
    })
}