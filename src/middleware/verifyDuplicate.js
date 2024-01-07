const db = require("../models");
const Departure = db.departure;
const Trip = db.trip;

checkDuplicateDeparture = (req, res, next) => {
  // User number
  Departure.findOne({
    where: {
      idTrip: req.body.idTrip,
      idTypeDeparture: req.body.idTypeDeparture
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Échec ! Le depart est déjà enrégistré !"
      });
      return;
    }
    next();
  });
};

checkDuplicateTrip = (req, res, next) => {
  // User number
  Trip.findOne({
    where: {
      tripOrigine: req.body.tripOrigine,
      tripDestination: req.body.tripDestination
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Échec ! Le trajet est déjà enrégistré !"
      });
      return;
    }
    next();
  });
};

const verifyDuplicate = {
  checkDuplicateDeparture: checkDuplicateDeparture,
  checkDuplicateTrip:checkDuplicateTrip
  };
  module.exports = verifyDuplicate;