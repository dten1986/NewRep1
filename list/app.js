
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'tpl'));
app.set('view engine', 'ejs');

app.use(express.bodyParser());

// 123
var listSchema = new Schema({
	text: { type: String, required: true },
	date: { type: Date, default: Date.now },
	complete: { type: Boolean, default: false }
});

var List = mongoose.model('List', listSchema);

mongoose.connect('mongodb://localhost/list');
mongoose.connection.on('open', function() {
	var db = mongoose.connection.db;
//	console.log(mongoose.connection.readyState);
	function findData(err) {
		if(err) throw err;
		List.find({}, useData);
	}
	
	function useData(err, data) {
		data.map(function(item) {
			console.log(item.text + ' ' + item.date + ' ' + item.complete);
		});
	}
	
	
	
	
	mongoose.disconnect();
});




//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());

app.use(app.router);

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

/* development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
