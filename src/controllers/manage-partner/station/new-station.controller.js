const db = require("../../../models");
const Station = db.station;

exports.NewStation =  (req,res) => {
    Station.create ({
      stationName : req.body.stationName,
      idPartner : req.body.idPartner,
      stationCity : req.body.stationCity,
      latitude : req.body.latitude,
      longitude : req.body.longitude
    }).then(station => {
      res.json({ message: "Gare crée avec succes" });
    }).catch(err =>{
      res.json({ message: err.message });
    })
  }