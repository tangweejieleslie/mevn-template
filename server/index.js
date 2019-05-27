const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// app.use(express.json());

app.use(bodyParser.json({limit: '3mb'}));
app.use(cors());

const api = require('./api');

app.use('/api', api);

app.get('/',(req,res)=>{
	res.send('This is an ExpressJS App');
});

// const port = process.env.PORT || 4040;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// console.log(__dirname);

const httpOptions = {
	cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
	key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
}

https.createServer(httpOptions, app).listen(port, ()=>{
	console.log('Listening on port', port);
});