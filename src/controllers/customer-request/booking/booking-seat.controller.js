const db = require("../../../models");
const { Op } = require("sequelize");
const Departure = db.departure;
const ColumnSeat = db.columnSeat;
const Booking = db.booking;
const Seat = db.seat;

exports.availableSeat = (req,res) => {

    const votreIdDeDepart = req.params.departure;  // Remplacez par l'ID de votre départ
    const votreDateDeDepart = req.params.date; ;  
    Booking.findAll({
        attributes: ['IdSeat'],
        where: {
          idDeparture: votreIdDeDepart,
          departureDate: votreDateDeDepart,
        }
      })
        .then(bookedSeats => {
          const bookedSeatIds = bookedSeats.map(booking => booking.IdSeat);
      
          return Seat.findAll({
          //  attributes: ['seatId', 'seatNumber', 'idBuSeat', 'IdSeat5Row', 'IdSeatPosition5Row', 'IdSeat4Row', 'IdSeatPosition4Row', 'createdAt', 'updatedAt'],
            where: {
              seatId: {
                [Op.notIn]: bookedSeatIds,
              }
            },
            include : [
                {
                    model: ColumnSeat,
                    as: "Positionfor5Row"
                },
                {
                    model: ColumnSeat,
                    as: "Positionfor4Row"
                }
            ]
          });
        })
        .then(unbookedSeats => {
            res.status(200).json({unbookedSeats})
        })
        .catch(error => {
            res.status(500).send({
                message: err.message,
                statutcode: 0
               });
        });
}