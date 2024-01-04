module.exports = (sequelize, Sequelize) => {
    const TypeDeparture = sequelize.define("typeDeparture", {
        typeDepartureId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      typeDepartureName: {
        type: Sequelize.STRING
      }
    }
      );
      return TypeDeparture;
};