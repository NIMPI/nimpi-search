module.exports = app =>{
    app.get('/v1/home/', (req, res) => {
        app.src.controllers.autenticate.isAuth(req,(Auth)=>{
            if (Auth.isAuth){
            res.send({
                "status":200,
                "Message":"Welcome to the advanced search backend interface of the NIMPI project."});
            }else{
            res.send({
                "status":404,
                "Error":"Invalid credentials. Please consult the administrator."})
            }
        });
        
    })
}