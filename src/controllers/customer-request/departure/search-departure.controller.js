const db = require("../../../models");
const { Op } = require("sequelize");
const Departure = db.departure;
const DepartureDay = db.departureDay;
const DepartureType = db.departureType;
const Booking = db.booking;
const Trip = db.trip;
const Partner = db.partner;
const Station = db.station;
const Seat = db.seat;

exports.searchdeparture = (req,res) => {

  const current = new Date();
  const  currentYear = current.getFullYear();
  const  currentMonth = current.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
  const currentDay = current.getDate();
  const  heures = current.getHours();
  const minutes = current.getMinutes();
  const currentHour = heures+":"+minutes;
  const today = currentYear+"-"+currentMonth+"-"+currentDay;
  const requestDate = new Date(req.params.date);
  const dayInJs = requestDate.getDay();
  const  requestYear = requestDate.getFullYear();
  const  requestMonth = requestDate.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
  const requestDay = requestDate.getDate();

  const MyrequestDate = requestYear+"-"+requestMonth+"-"+requestDay;

  (today == MyrequestDate) ? Departure.findAll(
    {
      where: {
        departureHour: {
          [Op.gte]: currentHour,
        }
      },
      order: [['departureHour', 'ASC']],

      include: [
        {
          model: Trip,
          required: true,
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
).then(departures=>{
    // Promesses pour chaque départ
    const promises = departures.map(departure => {
      // Recherche des sièges réservés pour le départ et la date spécifiés
      return Booking.findAll({
          attributes: ['IdSeat'],
          where: {
              idDeparture: departure.departureId,
              departureDate: MyrequestDate,
          }
      })
          .then(bookedSeats => {
              const bookedSeatIds = bookedSeats.map(booking => booking.IdSeat);
  
              // Recherche des sièges non réservés
              return Seat.findAll({
                  where: {
                      seatId: {
                          [Op.notIn]: bookedSeatIds,
                      }
                  }
              });
          })
          .then(unbookedSeats => {
              // Calculer le nombre de places disponibles pour ce départ
              
              const availableSeats = unbookedSeats.length;
              console.log(availableSeats);
              // Ajouter le nombre de places disponibles à l'objet départ
              departure.availableSeats = availableSeats;
  
              return {
                departure: departure,
                availableSeats: availableSeats
            };
          });
  });
  
  // Exécution de toutes les promesses en parallèle
  return Promise.all(promises);
  })
  .then(departuresWithSeats => {
  res.status(200).json({ departuresWithSeats });

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
          required: true,
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
).then(departures => {
  // Promesses pour chaque départ
  const promises = departures.map(departure => {
    // Recherche des sièges réservés pour le départ et la date spécifiés
    return Booking.findAll({
        attributes: ['IdSeat'],
        where: {
            idDeparture: departure.departureId,
            departureDate: MyrequestDate,
        }
    })
        .then(bookedSeats => {
            const bookedSeatIds = bookedSeats.map(booking => booking.IdSeat);

            // Recherche des sièges non réservés
            return Seat.findAll({
                where: {
                    seatId: {
                        [Op.notIn]: bookedSeatIds,
                    }
                }
            });
        })
        .then(unbookedSeats => {
            // Calculer le nombre de places disponibles pour ce départ
            
            const availableSeats = unbookedSeats.length;
            console.log(availableSeats);
            // Ajouter le nombre de places disponibles à l'objet départ
            departure.availableSeats = availableSeats;

            return {
              departure: departure,
              availableSeats: availableSeats
          };
        });
});

// Exécution de toutes les promesses en parallèle
return Promise.all(promises);
})
.then(departuresWithSeats => {
res.status(200).json({ departuresWithSeats });
})
.catch(error => {
res.status(500).send({
    message: error.message,
    statutcode: 0
});
});
}
