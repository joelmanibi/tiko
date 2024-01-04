module.exports = (sequelize, Sequelize) => {
    const DepartureDay = sequelize.define("departureDay", {
        DayId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      DayName: {
        type: Sequelize.STRING
      },
      DayJs: {
        type: Sequelize.INTEGER
      }
    }
      );
      return DepartureDay;
};