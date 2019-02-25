import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import authenticationApi from './api/authentication';
//import checkoutApi from './api/checkout';
//import loginApi from './api/login';

const app = express();
const port = process.env.PORT || 4000;

const storeName = 'elektra';
const domainName = 'elektra.vtexcommercestable.com.br';
const apiKey = 'dkdkdk';
const apiToken = 'dkdkdk';

let Router = express.Router();
let enableCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
};

app.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(bodyParser.json({ type: 'application/vnd.api+json' }))
	.use(methodOverride('X-HTTP-Method-Override'))
	.use(enableCrossDomain)
	.use(Router);

authenticationApi(app, storeName, domainName, apiKey, apiToken);
//checkoutApi(app, storeName, domainName, apiKey, apiToken);
app.get('*', (req, res) => {
	res.send('VINNEREN-MIDDLEWARE!!!');
}).listen(port, () => {
	console.log(`[APP] Listening on port => ${port}`)
});
