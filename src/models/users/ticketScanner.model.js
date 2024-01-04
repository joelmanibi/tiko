module.exports = (sequelize, Sequelize) => {
    const TicketScanner = sequelize.define("ticketScanner", {
      ticketScannerId: {
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
      return TicketScanner;
};