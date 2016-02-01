var fs = require('fs'),
	glob = require('glob'),
	paths = glob.sync('pages/*txt'),
	string = '';

/* GET ALL FONT DATA */
paths.forEach(function(elem, index, array) {
	fs.readFile(elem, 'utf8', function (err,data) {
	  	if (err) {
	    	return console.log(err);
	  	}

	  	string += data + '\n';

	  	if (index === array.length - 1) {
        	handleData(string);   
        }
	});
});


/* HANDLE DATA */
function handleData(string) {
	var data = string.replace(/(\r\n|\n|\r)/gm,"").split("font:");
		filteredData = [];

	data.forEach(function(elem, index, array) {
		if (filteredData.indexOf(elem) === -1) {
			filteredData.push(elem);
		}

		if (index === array.length - 1) { 
        	writeResult(filteredData); 
        }
	});
}

/* AND WHRITE RESULT */
function writeResult(filteredData) {
	var string = '';

	filteredData.forEach(function(elem, index, array) {
		string += elem + '\n';

		if (index === array.length - 1) { 
        	fs.writeFile('main.txt', string, function (err) {
  				if (err) return console.log(err);
			}); 
        }
	});
}