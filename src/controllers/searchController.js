module.exports.findbyterm = (app,req,res,query) =>{
   app.src.dao.searchDAO.findbyterm(query,(response)=>{
       res.status(response.status).send(response);
   });

  
    }
module.exports.autocomplete = (app,req,res,text) =>{
    app.src.dao.searchDAO.autocomplete(text,(response)=>{
        res.status(response.status).send(response);
    });
}