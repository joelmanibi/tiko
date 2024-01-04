module.exports = (sequelize, Sequelize) => {
    const Station = sequelize.define("station", {
      stationId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      stationName: {
        type: Sequelize.STRING
      },
      idPartner: {
        type: Sequelize.INTEGER
      },
      stationCity: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
    }
      );
      return Station;
};