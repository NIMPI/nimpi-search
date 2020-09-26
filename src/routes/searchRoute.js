module.exports = app => {
    app.get('/v1/document/findbyterm', (req, res) => {

        app.src.controllers.autenticate.isAuth(req, (Auth) => {
            if (Auth.isAuth) {
                let query = {
                    term: req.query.term != undefined ? req.query.term : '',
                    size: req.query.size != undefined ? req.query.size : 10,
                    from: req.query.from != undefined ? req.query.from : 0
                }

                app.src.controllers.searchController.findbyterm(app, req, res, query);
            } else {
                res.send({
                    "status": 404,
                    "Error": "Invalid credentials. Please consult the administrator."
                })
            }

        });
        //res.send("Bem vindo a interface backend de busca avançada do projeto NIMPI.");
    })
    app.get('/v1/autocomplete', (req, res) => {

        app.src.controllers.autenticate.isAuth(req, (Auth) => {
            if (Auth.isAuth) {
                let text = req.query.text != undefined ? req.query.text : '';
                app.src.controllers.searchController.autocomplete(app, req, res, text);
            } else {
                res.send({
                    "status": 404,
                    "Error": "Invalid credentials. Please consult the administrator."
                })
            }

        });
    })
    app.get('/v1/didyoumean', (req, res) => {

        app.src.controllers.autenticate.isAuth(req, (Auth) => {
            if (Auth.isAuth) {
                let text = req.query.text != undefined ? req.query.text : '';
                app.src.controllers.searchController.didyoumean(app, req, res, text);
            } else {
                res.send({
                    "status": 404,
                    "Error": "Invalid credentials. Please consult the administrator."
                })
            }
        });
    })

    app.get('/v1/findbymetadata', (req, res) => {
        app.src.controllers.autenticate.isAuth(req, (Auth) => {
            if (Auth.isAuth) {
                let metadata = {
                    size: req.query.size == undefined ? 10 : parseInt(req.query.size),
                    from: req.query.from == undefined ? 0 : parseInt(req.query.from),
                    title: req.query.title == undefined ? "" : req.query.title,
                    description: req.query.description == undefined ? "" : req.query.description,
                    dateInitial: req.query.dateInitial == undefined ? '0001-01-01' : req.query.dateInitial,
                    dateFinal: req.query.dateFinal == undefined ? '9999-01-01' : req.query.dateFinal,
                    publisherName: req.query.publisherName == undefined ? "" : req.query.publisherName,
                    type: req.query.type == undefined ? "" : req.query.type,
                    tag: req.query.tag == undefined ? "" : req.query.tag
                }

                app.src.controllers.searchController.findbymetadata(app, req, res, metadata);
            } else {
                res.send({
                    "status": 404,
                    "Error": "Invalid credentials. Please consult the administrator."
                })
            }
        });
    })


}