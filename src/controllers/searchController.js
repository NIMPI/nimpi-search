module.exports.findbyterm = (app,req,res,query) =>{
   app.src.dao.searchDAO.findbyterm(query,(response)=>{
       res.status(response.status).send(response);
   });
    }