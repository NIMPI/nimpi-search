const app = require('./config/server')

var port = 5530;

app.listen(port,()=>{
    console.log('API Instagram is running port 5530');
})
