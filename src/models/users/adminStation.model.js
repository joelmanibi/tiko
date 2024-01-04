module.exports = (sequelize, Sequelize) => {
    const AdminStation = sequelize.define("adminStation", {
        adminStationId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      idStation: {
        type: Sequelize.INTEGER
      },
      
    }
      );
      return AdminStation;
};