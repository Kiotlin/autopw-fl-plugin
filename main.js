const gp = require('./node_modules/generate-password');
const cp = require('./node_modules/copy-paste');

const { method, parameters } = JSON.parse(process.argv[2]);

const password = gp.generate({
	length: 18,
	numbers: true
});

if (method === "query") {
	console.log(JSON.stringify(
		{
			"result": [{
				"Title": password,
				"Subtitle": "Copy this password to clipboard",
				"JsonRPCAction": {
                    "method": "copy_to_clipboard",
					"parameters": [password]
                },
				"IcoPath": "Images\\app.png"
			}]
		}
	));
}

if (method === "copy_to_clipboard") {
	pwd = parameters[0];
	copy_to_clipboard(pwd);
}

function copy_to_clipboard(password) {
	cp.copy(password);
}

 

