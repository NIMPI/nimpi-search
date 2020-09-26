require('dotenv').config();
module.exports.isAuth = (req,callback)=>{
    
    const [hashType,hash] = req.headers.authorization.split(' ');
    const [user,password] = Buffer.from(hash,'base64').toString().split(':');
    
    if(process.env.USER_AUTH == user && password == process.env.PASSWORD){
    return callback({isAuth : true});
}else{
    return callback({isAuth : false});
}
}