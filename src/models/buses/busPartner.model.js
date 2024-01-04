module.exports = (sequelize, Sequelize) => {
    const BusPartner = sequelize.define("busPartner", {
        busPartnerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      busPartnerModele: {
        type: Sequelize.INTEGER
      },
      busPartnerMatricule: {
        type: Sequelize.STRING
      },
      busPartnerImage: {
        type: Sequelize.STRING
      },
      idPartner: {
        type: Sequelize.INTEGER
      },
      busPartnerSeatNumber: {
        type: Sequelize.INTEGER
      },
      idBus: {
        type: Sequelize.INTEGER
      }
    });
      return BusPartner;
};
