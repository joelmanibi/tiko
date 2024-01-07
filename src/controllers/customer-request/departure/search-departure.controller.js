const db = require("../../../models");
const Departure = db.departure;
const DepartureDay = db.departureDay;
const DepartureType = db.departureType;
const Trip = db.trip;
const Partner = db.partner;
const Station = db.station;

exports.searchdeparture = (req,res) => {

  const maDate = new Date(req.params.date);
  const dayInJs = maDate.getDay();

  Departure.findAll(
      {
        include: [
          {
            model: Trip,
            include : [
              {
                model:Station,
                as : "gare_from",
                where : {
                  stationCity: req.params.from,
                },
                include:[
                  {
                    model:Partner
                  }
                ]
              },
              {
                model:Station,
                as : "gare_to",
                where : {
                  stationCity: req.params.to,
                }
              }
            ]
          },
          {
            model: DepartureDay,
            where : {
              DayJs: dayInJs,
            }
          },
          {
            model: DepartureType
          }
      ]
      }
  ).then(dep=>{
      res.status(200).json({dep})
  }).catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });
    });
}