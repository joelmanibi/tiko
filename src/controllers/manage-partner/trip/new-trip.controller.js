const db = require("../../../models");
const Trip = db.trip;

exports.NewTrip =  (req,res) => {
    Trip.create ({
      tripOrigine : req.body.tripOrigine,
      tripDestination : req.body.tripDestination,
      tripCost : req.body.tripCost
    }).then(trip => {
      res.json({ message: "La ligne a été enregistré avec succes" });
    }).catch(err =>{
      res.json({ message: err.message });
    })
  }