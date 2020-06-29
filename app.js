const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const valiator = require('email-validator')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')
// const ejs = require('ejs').renderFile;
const expressHandlebars = require('express-handlebars')
const path = require('path');
const { urlencoded } = require('body-parser');
const coderRouter = require('./routes/coderRouter')
const port = '3000';
const host = 'localhost';

//Making a instance of express
let app = express();
//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//===========Setting the viewport engine===========
// app.engine('html',ejs);
app.engine('hbs', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/',
    partialsDir: __dirname + 'views/coders'

}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))


//==================ENDPOINTS============
app.use('/coder', coderRouter);




// ============CONNECT TO MONGOOSE==============
const url = 'mongodb://localhost:27017/myapp';
mongoose.Promise = global.Promise;
mongoose.connect(url, ({ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:true,  useFindAndModify:true }));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Sucessfully connected to database..');
});





// =============LISTENING THE SERVER===============

app.listen(port, () => {
    console.log(`Server is Running Sucessfully at http://${host}:${port}`);
})
