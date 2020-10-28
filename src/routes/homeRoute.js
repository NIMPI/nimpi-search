module.exports = app => {
    app.get('/', (req, res) => {
        res.redirect('api/v1/docs');
        /*
        res.send({
            "status": 200,
            "Message": "Welcome to the advanced search backend interface of the NIMPI project."
        });
        */
    });


}