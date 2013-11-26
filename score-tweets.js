var http = require('http'),	
    fs = require('fs'),
    logger = require('./utils/logger'),
    NHLScore = require('./lib/nhl'),
    NFLScore = require('./lib/nfl');

var league = Object.create(NHLScore);

var rawResponse = '';
var request = http.get(league.updateURL, function(res) {
	res.on('data', function(chunk) {
		//console.log('Got %d bytes of data', chunk.length);
		rawResponse += chunk;
	});
	res.on('end', function() {
		var array = league.getGameArray(rawResponse);
		logger.debug('Response: ' + JSON.stringify(array));
	});
}).on('error', function(e) {
	logger.error('Error: ' + e.message);
});
