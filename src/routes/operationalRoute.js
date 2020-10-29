module.exports = app =>{
    app.post(process.env.API+'/indexing', (req, res) => {
        
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