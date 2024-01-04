module.exports = (sequelize, Sequelize) => {
    const RowSeat = sequelize.define("rowSeat", {
        rowSeatId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rowSeatName: {
        type: Sequelize.STRING
      }
    }
      );
      return RowSeat;
};