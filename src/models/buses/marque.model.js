module.exports = (sequelize, Sequelize) => {
    const Marque = sequelize.define("marque", {
        marqueId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      marqueName: {
        type: Sequelize.STRING
      }
    }
      );
      return Marque;
};