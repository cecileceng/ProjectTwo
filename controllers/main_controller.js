'use strict';
//dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var router = express.Router();
var models = require('../models');

var pry = require('pryjs');

//redirect to home route by default
router.get('/', function(req, res) {
    res.redirect('/home');
});
//home route, load markers from database, render index file
router.get('/home', function(req, res) {
    models.Markers.findAll().then(function(data){
        //bodyParser.json(data.dataValues);
        //console.log(data);
        res.render('index',{theGoogleMarkers:data});
    });
});

router.get('/marker',function(req,res){
    res.render('marker');
});

/*COMMENTED OUT THIS CODE FOR GITSOME

//when directed to burgers route, get burger.js logic, call functions within it.
router.get('/burgers', function(req, res) {
    burger.selectAll(function(data) {
        //when called (it's never called) render response through index.handlebars
        res.render('index', { burgers: data });
    });
});

//when route is burger/create run function
router.post('/burgers/create', function(req, res) {
    //call burger logic insertOne function(column,data,callback);
    burger.insertOne('burger_name', req.body.name, function() {
        //redirect to updated main page after insertOne
        res.redirect('/burgers');
    })
})
*/
router.get('/users/update/:id', function(req, res){
    res.render('users/update_users');
});

router.post('/marker/create',function(req,res){
    //eval(pry.it)
    models.Markers.create({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        title: req.body.title
    }).then(function(){
        //eval(pry.it)
        res.redirect('/home');
    });
});
//commented out the old create route
// router.post('/users/create', function(req, res){
//     console.log("hello, world");
//     models.Users.create({name:req.body.name,
//                             email:req.body.email,
//                              githubID:req.body.githubID,
//                              userName:req.body.userName,
//                              languages:req.body.languages,
//                              rating:req.body.rating,
//                              }).then (function(){
//                                  res.redirect('/home');
//                              });
// });




/*
//update route
router.put('/burgers/update/devour/:id', function(req, res) {
    //tableName, column, ID, callback
    burger.updateOne('burgers','devoured', req.params.id, function() {
        //redirect to home upon response
        res.redirect('/burgers');
    })
})
*/
router.put('/users/update/:id', function(req, res){
    models.Users.update({
        languages:req.body.languages,
        rating:req.body.rating,
        email:req.body.email,
        name:req.body.name
    }).then (function(){
        res.redirect('/home');
    });
});
//router.put()

/*

//delete method available because method override
router.delete('/burgers/delete/:id', function(req, res) {
    //run burger.js logic of deleteOne(table,id,callback)
    burger.deleteOne('burgers',req.params.id, function() {
        //upon delete, redirect home
        res.redirect('/burgers');
    })
})


COMMENTED OUT THIS CODE FOR GITSOME

*/


//initial load/direct
router.use(function(req, res) {
    res.redirect('/home');
})
//export
module.exports = router;
