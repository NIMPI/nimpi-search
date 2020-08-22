module.exports = app =>{
    app.get('/api/', (req, res) => {
        res.send("Bem vindo a interface backend de busca avançada do projeto NIMPI.");
    })
}