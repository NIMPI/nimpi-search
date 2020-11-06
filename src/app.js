require('dotenv').config();
const app = require('./config/server')

var port = process.env.PORT_API;

app.listen(port,()=>{
    console.log('API Instagram is running port '+port);
})
