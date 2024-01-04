module.exports = (sequelize, Sequelize) => {
    const Seat = sequelize.define("seat", {
        seatId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      // numero du siege
      seatNumber: {
        type: Sequelize.INTEGER
      },
      // cle etranger du bus Id du bus
      idBuSeat: {
        type: Sequelize.INTEGER
      },
      // rangée
      IdSeat5Row: {
        type: Sequelize.INTEGER
      },
      // a droite coté fenetre, a droite coté couloir , a gauche coté couloir, a gauche au milieu,a gauche coté fenetre                     
      IdSeatPosition5Row: {
        type: Sequelize.INTEGER
      },
      IdSeat4Row: {
        type: Sequelize.INTEGER
      },
      // a droite coté fenetre, a droite coté couloir , a gauche coté couloir, a gauche au milieu,a gauche coté fenetre                     
      IdSeatPosition4Row: {
        type: Sequelize.INTEGER
      }
    }
      );
      return Seat;
};