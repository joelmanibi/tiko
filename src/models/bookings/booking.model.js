module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        bookingId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      bookingCode: {
        type: Sequelize.STRING
      },
      IdSeat: {
        type: Sequelize.INTEGER
      },
      idDeparture: {
        type: Sequelize.INTEGER
      },
      idSegment: {
        type: Sequelize.INTEGER
      },
      departureDate: {
        type: Sequelize.DATE
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      idBookingState: {
        type: Sequelize.INTEGER
      },
      idTicketSeller: {
        type: Sequelize.INTEGER
      },
      idPayment: {
        type:Sequelize.INTEGER
      }
    }
      );
      return Booking;
};