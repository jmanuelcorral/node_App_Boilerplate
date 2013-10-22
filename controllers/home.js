exports.setup = function (controllername, app) {
    var url = "/" + controllername + "/";
        // action POST /home/index
    app.post(url + "index", function (req, res, next){
        res.render('home', {title: "hello"});
    });
    // action GET /home/index
    app.get(url + "index",function (req, res, next){
         res.render('home', {title: "hello"});
    });
}
