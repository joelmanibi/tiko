module.exports = (sequelize, Sequelize) => {
    const BookingState = sequelize.define("bookingState", {
      bookingStateId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      bookingStateName: {
        type: Sequelize.STRING
      }
    }
      );
      return BookingState;
};