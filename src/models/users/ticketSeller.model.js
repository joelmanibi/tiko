module.exports = (sequelize, Sequelize) => {
    const TicketSeller = sequelize.define("ticketSeller", {
      ticketSellerId: {
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
      return TicketSeller;
};