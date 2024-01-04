module.exports = (sequelize, Sequelize) => {
    const Bus = sequelize.define("bus", {
        busId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      
    });
      return Bus;
};