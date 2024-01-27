var express = require('express');
const cors = require("cors");

var app = express();
var corsOptions = {
    origin: "*"
  };
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
//parse request date type application/json

const db = require("./src/models");
db.sequelize.sync();

app.use(bodyParser.json());
//parse request date type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static', express.static('assets'));

// for parsing multipart/form-data


//creer route pour auth,incident,mop
require('./src/routes/auth/auth-customer.route')(app);
require('./src/routes/auth/auth-sudo.route')(app);
require('./src/routes/auth/auth-partner.route')(app);
require('./src/routes/manage-partner/station.route')(app);
require('./src/routes/manage-partner/bus.route')(app);
require('./src/routes/manage-partner/trip.route')(app);
require('./src/routes/manage-partner/departure.route')(app);
require('./src/routes/customer-request/departure.route')(app);

// set port
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    });
    
module.exports = app;