const db = require("../../../models");
const { Op } = require("sequelize");
const MyConfig = require("../../conf/random")
const Departure = db.departure;
const Booking = db.booking;
const ColumnSeat = db.columnSeat;
const Seat = db.seat;
const Trip = db.trip;
const Partner = db.partner;
const Station = db.station;
const DepartureDay = db.departureDay;
const DepartureType = db.departureType;

exports.bookingSeat = (req,res) => {

    const IdsSeat = req.body.MySeatId;  // Remplacez par l'ID de votre départ
    const votreDateDeDepart = req.body.date; 
    
    const idTicketSeller = 4;
    const idBookingState = 1; // etat reservé par defaut
    const idDeparture = req.body.idDeparture;
    var userID = req.userId;
    
    const appointment = new Date(votreDateDeDepart);
    var date = appointment.setDate(appointment.getDate() + 1); 
    var year = new Date(date).getUTCFullYear();
    var year = year.toString();
    var year = year.substr(2, 2);
    var Month = new Date(date).getMonth() +1;
    var Month = Month.toString();
    // Vérifiez si IdsSeat est un tableau
  if (Array.isArray(IdsSeat)) {
    //z Boucle à travers chaque élément du tableau
    IdsSeat.forEach((IdSeat) => {
      // Créez un objet pour chaque jour et exécutez la fonction Departure.create
      var code = MyConfig.randomCodeGenerator();
      var bookinCode = "TK-"+year+Month+code+userID+idDeparture+IdSeat;
      Booking.create({
        bookingCode: bookinCode,
        IdSeat: IdSeat,
        idDeparture: idDeparture,
        departureDate: votreDateDeDepart,
        idUser:userID,
        idBookingState : idBookingState,
        idTicketSeller: idTicketSeller
      }).then((result) => {
          console.log(`Vous avez reservé le siege No ${IdSeat}.`);
        })
        .catch((error) => {
          console.error(`Erreur lors de la reservation du siege No ${IdSeat}: ${error.message}`);
        });
    });

    res.status(200).send({message:"Votre réservation a été effectué avec succès"});
  } else {
    res.status(400).send({message:"Le champ IdsSeat doit être un tableau."});
  }
   
}

exports.getMyBooking = (req,res) => {

  Booking.findAll({
    where: {
      idUser: req.userId,
      idBookingState : {
        [Op.ne] : 3
      }
    },
    order: [['bookingId', 'DESC']],
    include: [
      {
        model: Departure,
        
        include: [
          {
            model: Trip,
            required: true,
            include : [
              {
                model:Station,
                as : "gare_from",
                include:[
                  {
                    model:Partner
                  }
                ]
              },
              {
                model:Station,
                as : "gare_to",
              }
            ]
          },
          {
            model: DepartureDay,
          },
          {
            model: DepartureType
          },
  
      ]
      }
    ]
  }).then(mybooking => {
    res.status(200).json({ mybooking });
    })
    .catch(error => {
    res.status(500).send({
        message: error.message,
        statutcode: 0
    });
    })
}

exports.getMyBookingClose = (req,res) => {

  Booking.findAll({
    where: {
      idUser: req.userId,
      idBookingState : {
        [Op.eq] : 3
      }
    },
    order: [['bookingId', 'DESC']],
    include: [
      {
        model: Departure,
        
        include: [
          {
            model: Trip,
            required: true,
            include : [
              {
                model:Station,
                as : "gare_from",
                include:[
                  {
                    model:Partner
                  }
                ]
              },
              {
                model:Station,
                as : "gare_to",
              }
            ]
          },
          {
            model: DepartureDay,
          },
          {
            model: DepartureType
          },
  
      ]
      }
    ]
  }).then(mybooking => {
    res.status(200).json({ mybooking });
    })
    .catch(error => {
    res.status(500).send({
        message: error.message,
        statutcode: 0
    });
    })
}