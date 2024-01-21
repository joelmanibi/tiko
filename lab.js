const db = require("../../../models");
const Departure = db.departure;
const DepartureDay = db.departureDay;
const DepartureType = db.departureType;
const Trip = db.trip;
const Partner = db.partner;
const Station = db.station;

exports.searchdeparture = (req,res) => {

  const current = new Date();
  const  annee = current.getFullYear();
  const  mois = current.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
  const jour = current.getDate();
  const  heures = current.getHours();
  const today = annee+"-"+mois+"-"+jour;
  const maDate = new Date(req.params.date);
  const dayInJs = maDate.getDay();

  (today === maDate) ? Departure.findAll(
      {
        order: [['departureHour', 'ASC']],
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
          },

      ]
      }
  ).then(dep=>{
      res.status(200).json({dep})
  }).catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });
    }): Departure.findAll(
      {
        order: [['departureHour', 'ASC']],
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
          },

      ]
      }
  ).then(dep=>{
      res.status(200).json({dep})
  }).catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });
    })
}