const app = require('./config/server')

var port = 80;

app.listen(port,()=>{
    console.log('API Instagram is running port 80');
})
