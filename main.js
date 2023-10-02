const gp = require('./node_modules/generate-password');
const cp = require('./node_modules/copy-paste');

const { method, parameters } = JSON.parse(process.argv[2]);

const isQuery = method === "query";
const isCopy = method === "copy_to_clipboard";

const sub_parameters = isQuery? parameters[0].split(' ') : null;
const [ handle, mark ] = isQuery? sub_parameters : [];
const handle_exist = isQuery? ( handle === '>' ) : false;
const rules_exist = isQuery? ( sub_parameters.length >= 2 ) : false;

const default_pwd_length = 18;
/**
 * SOME RULES FOR GENERATING PASSWORD:
 * TODO: length: any number
 * numbers: 'n'
 * symbols: '!'
 * lowercase: 'l'
 * uppercase: 'u'
 * excludeSimilarCharacters: 's'
 * TODO: exclude: String (only take effect when handle equals to '-')
 * strict: 't'
 */
const rules = {
	numbers_mk: 'n',
	symbols_mk: '@',
	lowercase_mk: 'l',
	uppercase_mk: 'u',
	strict_mk: 's',
	all_mk: 'n@lus'
};

if ( isCopy ) {
	pwd = parameters[0];
	copy_to_clipboard(pwd);

	return 0;
}

/* TODO: 'pwd > s' would crash */
if ( handle_exist && rules_exist && is_at_least_1_true(mark) ) {
	password = gp.generate({
		length: 18,
		numbers: mark.includes(rules.numbers_mk),
		symbols: mark.includes(rules.symbols_mk),
		lowercase: mark.includes(rules.lowercase_mk),
		uppercase: mark.includes(rules.uppercase_mk),
		strict: mark.includes(rules.strict_mk),
	});

	check_query(password);
} else {
	/* default 18 bit password */
	default_pwd = gp.generate({
		length: default_pwd_length,
		numbers: true,
		// symbols: true
	});

	check_query(default_pwd);
}

function check_query(pwd) {
	console.log(JSON.stringify(
		{
			"result": [{
				"Title": pwd,
				"Subtitle": "Copy this password to clipboard",
				"JsonRPCAction": {
					"method": "copy_to_clipboard",
					"parameters": [pwd]
				},
				"IcoPath": "Images\\app.png"
			}]
		}
	));
}

function copy_to_clipboard(password) {
	cp.copy(password);
}

function is_at_least_1_true(mark) {
	for ( let m of mark ) {
		if ( rules.all_mk.includes(m) ) {
			return true;
		}
	}
	return false;
}
