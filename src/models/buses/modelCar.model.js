module.exports = (sequelize, Sequelize) => {
    const ModelCar = sequelize.define("modelCar", {
      modelCarId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      modelCarName: {
        type: Sequelize.STRING
      },
      IdMarque: {
        type: Sequelize.INTEGER
      },
      
    }
      );
      return ModelCar;
};