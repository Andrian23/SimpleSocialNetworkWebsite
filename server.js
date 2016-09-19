var express = require('express');

var app = express();

var path = require('path');
var bodyParser = require('body-parser')
var jsonfile = require('jsonfile')
app.use(bodyParser.json())

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost'
    , user: 'root'
    , password: 'root'
    , database: 'test'
});

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});




app.post('/reg', function (req, res) {
    var user = req.body;
    connection.query('INSERT INTO users(user_name, user_sname, user_login, user_pass) values("' + user.firstName + '", "' + user.lastName + '", "' + user.username + '", "' + user.password + '")', function (err, rows, fields) {
        if (!err)
            res.send({
                success: true
            });
        else
            res.send({
                success: false
            });
    });

})


app.post('/log', function (req, res) {
    var user = req.body;
    var resUser = {};
    var check = false;
    connection.query('select * from users', function (err, rows, fields) {
        if (!err) {
            for (var i = 0; i < rows.length; i++) {
                if (user.name == rows[i].user_login) {
                    check = true;
                    resUser = rows[i];
                    getCompani(resUser.idUser, function (data) {
                        resUser.companies = data;
                        getChildren(resUser.idUser, function (children) {
                            for (var i = 0; i < resUser.companies.length; i++) {
                                resUser.companies[i].children = [];
                                resUser.companies[i].all_compani_earnings = resUser.companies[i].compani_earnings;
                                for (var j = 0; j < children.length; j++) {
                                    if (resUser.companies[i].id == children[j].main_compani_id) {
                                        resUser.companies[i].children.push(children[j]);
                                        console.log(children[j]);
                                        resUser.companies[i].all_compani_earnings += children[j].compani_earnings;
                                    }
                                }
                            }
                            res.send(resUser);

                        })



                    });

                }
            }
            if (!check) {
                res.send(resUser);
            }


        } else
            console.log('Error while performing Query.33333');


    });

    function getCompani(id, cb) {
        connection.query('select * from maincompani where user_id=?', [id], function (error, row, field) {
            if (!error) {
                cb(row)
            } else
                console.log('Error while performing Query.1111');

        })
    }

    function getChildren(id, callback) {
        connection.query('select * from child_compani where main_compani_id in (select id from maincompani where user_id=?)', [id], function (error, row, field) {
            if (!error) {
                callback(row)
            } else
                console.log(error);

        })
    }


})


app.post('/add', function (req, res) {
    var data = req.body;
    console.log("children[j]");
    connection.query('insert into maincompani(compani_name, compani_earnings, user_id) values(?, ?, ?)', [data.compani.compani_name, data.compani.compani_earnings, data.id], function (err, rows, fields) {
        if (!err)
            return true
        else
            console.log('Error while performing Query.');

    });

})
app.post('/delcom', function (req, res) {
    var data = req.body;
    console.log(data);
    connection.query('delete from maincompani where id=?', [data.id], function (err, rows, fields) {
        if (!err)
            return true
        else
            console.log('Error while performing Query.');

    });

})

app.post('/update', function (req, res) {
    var compani = req.body;
    connection.query('UPDATE maincompani SET compani_name = ?, compani_earnings = ? WHERE id = ?', [compani.compani_name, compani.compani_earnings, compani.id], function (err, rows, fields) {
        if (!err)
            console.log('Good');
        else
            console.log('Error while performing Query.');
    });
});

app.post('/add-child', function (req, res) {
    var data = req.body;
    console.log(data);
    connection.query('insert into child_compani(compani_name, compani_earnings, main_compani_id) values(?, ?, ?)', [data.compani.compani_name, data.compani.compani_earnings, data.id], function (err, rows, fields) {
        if (!err)
            return true
        else
            console.log(err);

    });

})
app.post('/delcom-child', function (req, res) {
    var data = req.body;
    console.log(data);
    connection.query('delete from child_compani where id=?', [data.id], function (err, rows, fields) {
        if (!err)
            return true
        else
            console.log('Error while performing Query.');

    });

})

app.post('/update-child', function (req, res) {
    var compani = req.body;
    connection.query('UPDATE child_compani SET compani_name = ?, compani_earnings = ? WHERE id = ?', [compani.compani_name, compani.compani_earnings, compani.id], function (err, rows, fields) {
        if (!err)
            console.log('Good');
        else
            console.log('Error while performing Query.');
    });
});




app.listen(8080, function () {
    console.log('listen on port');
});