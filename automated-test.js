var http = require('http'),
    fs = require('fs'),
    config = require('./config/' + (process.env.NODE_ENV || 'development'),
    logger = require('./utils/logger'),

    NHLScore = require('./lib/nhl'),
    NFLScore = require('./lib/nfl');

var league = Object.create(NHLScore);

var getData = (function() {
	var rawResponse = '';
	var request = http.get(league.updateURL, function(res) {
		res.on('data', function(chunk) {
			//console.log('Got %d bytes of data', chunk.length);
			rawResponse += chunk;
		});
		res.on('end', function() {
			var array = league.getGameArray(rawResponse);
			//tofs(array);
			logger.debug('Response: ' + JSON.stringify(array,null,2));
		});
	}).on('error', function(e) {
		logger.error('Error: ' + e.message);
	});

	var tofs = function(data){
		var s = JSON.stringify(data,null,2);

		var d = new Date(); 

		var dateString = d.getMonth().toString() + 
			d.getDate().toString() + 
			d.getFullYear().toString() + 
			d.getHours().toString() + 
			d.getMinutes().toString();

		var fsName = './tests/' + league.league + '-automated/' + 
			league.league + '-' + dateString + '.json';

		fs.writefs(fsName, s, function(err) {
			if(err) {
				logger.error(err);
			} else {
				logger.debug(fsName + ' save successfully.');
			}
		});
	};
})();

var loop = setInterval(getData, config.pollingInterval);
