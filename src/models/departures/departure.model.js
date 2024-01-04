module.exports = (sequelize, Sequelize) => {
    const Departure = sequelize.define("departure", {
        departureId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      departureDayId: {
        type: Sequelize.INTEGER
      },
      departureHour: {
        type: Sequelize.TIME
      },
      idBus: {
        type: Sequelize.INTEGER
      },
      idTrip: {
        type: Sequelize.INTEGER
      },
      idTypeDeparture: {
        type: Sequelize.INTEGER
      },
    }
      );
      return Departure;
};