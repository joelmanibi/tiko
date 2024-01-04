module.exports = (sequelize, Sequelize) => {
    const Segment = sequelize.define("segment", {
        segmentId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idSubTrip: {
        type: Sequelize.INTEGER
      },
      
      IdTrip:{
        type: Sequelize.INTEGER
      }
    });
      return Segment;
};