module.exports = (sequelize, Sequelize) => {
    const Scale = sequelize.define("scale", {
        scaleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      scaleLieu: {
        type: Sequelize.INTEGER
      },
      IdTrip:{
        type: Sequelize.INTEGER
      }
    }
      );
      return Scale;
};