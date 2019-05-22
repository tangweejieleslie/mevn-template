const express = require('express');
const cors = require('cors');

const app = express();

const port = 4000;

app.get('/',(req,res)=>{
	res.send('This is an ExpressJS App');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))