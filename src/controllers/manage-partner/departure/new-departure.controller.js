const db = require("../../../models");
const Departure = db.departure;

exports.NewDeparture =  (req,res) => {

  const departureDayIds = req.body.departureDayId;
  const idTrip = req.body.idTrip;
  const idTypeDeparture = req.body.idTypeDeparture;
  const departureHour = req.body.departureHour;
  const arrivalTime = req.body.arrivalTime;

  // Vérifiez si departureDayIds est un tableau
  if (Array.isArray(departureDayIds)) {
    //z Boucle à travers chaque élément du tableau
    departureDayIds.forEach((dayId) => {
      // Créez un objet pour chaque jour et exécutez la fonction Departure.create
      Departure.create({
        departureDayId: dayId,
        idTrip: idTrip,
        idTypeDeparture: idTypeDeparture,
        departureHour: departureHour,
        arrivalTime:arrivalTime,
        idBus : 1
      }).then((result) => {
          console.log(`Départ enregistré pour le jour ${dayId}.`);
        })
        .catch((error) => {
          console.error(`Erreur lors de l'enregistrement du départ pour le jour ${dayId}: ${error.message}`);
        });
    });

    res.status(200).send({message:"Enregistrement des départs terminé"});
  } else {
    res.status(400).send({message:"Le champ departureDayId doit être un tableau."});
  }
}