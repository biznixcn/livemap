var fs = require("fs");

exports.load = function(filename)  {
	var data = fs.readFileSync(filename, "utf8");
	data = data.replace(/\"+/g, ""); 
	data = data.replace(/\r|\t/g, "");
			
	var lines = data.split("\n");
	var cols = lines[0].split(",");		
	lines.shift();

	var data = [];
	for (var line in lines) {
		var fields = lines[line].split(",");
		var entry = {};
		var pushIt = false;
		for (var i = 0; i<fields.length;i++) { 	
			var val = fields[i];
			var key= cols[i].replace(/\s+/g,"");
			if (key.length > 0 && val.length > 0) {
				entry[key] = val;
				pushIt = true;
			}
		}
		if (pushIt) data.push(entry);
	}

	return data;
}