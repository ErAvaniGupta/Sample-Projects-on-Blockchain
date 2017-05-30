 //server.js
 
	// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             			// log requests to the console (express4)
    var bodyParser = require('body-parser');    			// pull information from HTML POST (express4)
    var methodOverride = require('method-override'); 		// simulate DELETE and PUT (express4)
	var Web3 = require('web3');
    
	
	
	// configuration =================
	var mongoose   = require('mongoose');
	var db = mongoose.connect('mongodb://localhost/test'); 
	db.connection.on('connected', function (data) {
	console.log("MongoDb is running...");
	}); // connection to mongoDB database 

	
	
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

	
	
	
	// define model to store viewers and their tickets details in mongoDb=================
    var Viewer = mongoose.model('Viewer', {
        username : String,
		password : String,
		account	 : String,
		ticketsBought : { type: Number, default: 0 }
	});
	
	
	
	
	
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
	


	//Ethereum Config =============================================================
	var web3 = new Web3();
	web3.setProvider(new web3.providers.HttpProvider('http://192.168.43.90:8545'));	

	var listening = web3.net.listening;
	console.log("Listening to web3: "+listening); // true of false




	//Ethereum Contract=============================================================
	var concert = web3.eth.contract([{"constant":true,"inputs":[],"name":"buyer2","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"numOfTickets","type":"uint256"}],"name":"buyTickets","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numTickets","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"buyer3","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ticketsLeft","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"buyer1","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_organiser","type":"address"},{"name":"numOfTickets","type":"uint256"},{"name":"_priceOfTickets","type":"uint256"},{"name":"_buyer1","type":"address"},{"name":"_buyer2","type":"address"},{"name":"_buyer3","type":"address"},{"name":"_supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"numOfTicketsBooked","type":"uint256"},{"indexed":false,"name":"numOfTicketsLeft","type":"uint256"}],"name":"TicketsBooked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"reason","type":"string"}],"name":"TicketsNotBooked","type":"event"}]).at('0x89943bbbb3901e27c2d948fba068c0c336abac40');
	
	


	// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all tickets booking status from mongoDb
    app.get('/api/viewers', function(req, res) {

         // use mongoose to get all viewers from the database
        
 		Viewer.find(
			{ticketsBought:{$ne:0}},
			{username:1,ticketsBought:1},
			 function(err, viewers) {
				if (err)
					res.send(err)
				res.json(viewers);
		
		
		});
		
	});

    // book tickets and update the status after booking
    app.post('/api/viewers', function(req, res) {

       
		
		 Viewer.find({username: req.body.user, password : req.body.pass},{account:1,_id:0},function(err,viewers){
			if(err)
				res.send(err)
			else {
			
			var buyerAccount = viewers[0].toObject().account; 
		 	var hash = concert.buyTickets.sendTransaction(req.body.numTickets,{from:web3.eth.accounts[1]});//used one of the account statically
			
			
			console.log(viewers[0].toObject().account);
			console.log(hash);
			
			
			
			var events = concert.allEvents();
			events.watch(function(error, event){
				if (error) {
					console.log("Error: " + error);
				} 
				else 
				{
					console.log(event.event + ": " + JSON.stringify(event.args));
					if(event.event == "TicketsBooked"){
						
						
						
						Viewer.findOneAndUpdate(
						{username:req.body.user,
						password:req.body.pass
						//account:viewers[0].toObject().account
						},
						{$inc:{ticketsBought:+req.body.numTickets}},
						function(err,viewer){
						if(err)
						res.send(err);
				
						}); 
		
		
						Viewer.find(
						{ticketsBought:{$ne:0}},
						{username:1,ticketsBought:1},
						function(err, viewers) {
						if (err)
						res.send(err)
						res.json(viewers);
		
		
						});
						
						
					}
				}
			});
		
		
		}	

    });
	
	
	});

    	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	