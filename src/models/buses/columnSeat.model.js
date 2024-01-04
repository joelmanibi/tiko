module.exports = (sequelize, Sequelize) => {
    const ColumnSeat = sequelize.define("columnSeat", {
        columnSeatId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      columnSeatName: {
        type: Sequelize.STRING
      }
    }
      );
      return ColumnSeat;
};