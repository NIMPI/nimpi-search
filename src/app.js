const app = require('./config/server')

var port = 3000;

app.listen(port,()=>{
    console.log('API Instagram is running port '+port);
})
