const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const api = require('./api');

app.use('/api', api);

app.get('/',(req,res)=>{
	res.send('This is an ExpressJS App');
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));