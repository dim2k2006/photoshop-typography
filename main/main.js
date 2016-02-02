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
        	filter(filteredData); 
        }
	});
}

/* FILTER DATA */
function filter(filteredData) {
	var m = filteredData,
		count = m.length-1;

	for (var i = 0; i < count; i++) {
		for (var j = 0; j < count-i; j++) {
			var a = m[j],
				newA = a.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi,''),
				numA = parseInt(newA.replace(/[^\d.]/g,'')),
				b = m[j+1],
				newB = b.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi,''),
				numB = parseInt(newB.replace(/[^\d.]/g,''));

			if (numA > numB) {
	           var max = m[j];
	           m[j] = m[j+1];
	           m[j+1] = max;
	        }
		}
	} 

	m = m.reverse();  
	
	writeResult(m); 
}

/* WHRITE RESULT */
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