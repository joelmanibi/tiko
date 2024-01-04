module.exports = (sequelize, Sequelize) => {
    const Trip = sequelize.define("trip", {
        tripId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tripOrigine: {
        type: Sequelize.INTEGER
      },
      tripDestination: {
        type: Sequelize.INTEGER
      },
      tripCost: {
        type: Sequelize.INTEGER
      }
    }
      );
      return Trip;
};