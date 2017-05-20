var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
//var cookieParser = require('cookie-parser');
//var methodOverride = require('method-override');
//var cors = require('cors');

module.exports = function (app, config) {

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(compress());
	//app.use(cookieParser());
	//app.use(methodOverride());
	//app.use(cors());

	// Routing
	require('./routes')(app, config);

	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	if(app.get('env') === 'development'){
		app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.json({
				message: err.message,
				error: err,
				title: 'error'
			});
		});
	}

	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {},
			title: 'error'
		});
	});

};