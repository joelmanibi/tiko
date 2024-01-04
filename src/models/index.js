const config = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users/user.model.js")(sequelize, Sequelize);
db.adminPartner = require("./users/adminPartner.model.js")(sequelize, Sequelize);
db.adminStation = require("./users/adminStation.model.js")(sequelize, Sequelize);
db.country = require("./users/country.model.js")(sequelize, Sequelize);
db.ticketScanner = require("./users/ticketScanner.model.js")(sequelize, Sequelize);
db.ticketSeller = require("./users/ticketSeller.model.js")(sequelize, Sequelize);
db.userRole = require("./users/userRole.model.js")(sequelize, Sequelize);

db.trip = require("./trips/trip.model.js")(sequelize, Sequelize);
db.scale = require("./trips/scale.model.js")(sequelize, Sequelize);
db.city = require("./trips/city.model.js")(sequelize, Sequelize);
db.segment = require("./trips/segment.model.js")(sequelize, Sequelize);

db.subscription = require("./subscriptions/subscription.model.js")(sequelize, Sequelize);
db.subscriptionType = require("./subscriptions/subscriptionType.model.js")(sequelize, Sequelize);

db.station = require("./stations/station.model.js")(sequelize, Sequelize);

db.payment = require("./payments/payment.model.js")(sequelize, Sequelize);
db.paymentStatus = require("./payments/paymentStatus.model.js")(sequelize, Sequelize);
db.paymentType = require("./payments/paymentType.model.js")(sequelize, Sequelize);

db.partner = require("./partners/partner.model.js")(sequelize, Sequelize);

db.departure = require("./departures/departure.model.js")(sequelize, Sequelize);
db.departureDay = require("./departures/departureDay.model.js")(sequelize, Sequelize);
db.departureType = require("./departures/departureType.model.js")(sequelize, Sequelize);


db.bus = require("./buses/bus.model.js")(sequelize, Sequelize);
db.marque = require("./buses/marque.model.js")(sequelize, Sequelize);
db.busPartner = require("./buses/busPartner.model.js")(sequelize, Sequelize);
db.modelCar = require("./buses/modelCar.model.js")(sequelize, Sequelize);
db.seat = require("./buses/seat.model.js")(sequelize, Sequelize);
db.columnSeat = require("./buses/columnSeat.model.js")(sequelize, Sequelize);
db.rowSeat = require("./buses/rowSeat.model.js")(sequelize, Sequelize);

db.booking = require("./bookings/booking.model.js")(sequelize, Sequelize);
db.bookingState = require("./bookings/bookingState.model.js")(sequelize, Sequelize);

/////toutes les realtion many to many
db.user.belongsToMany(db.station, { through: 'ticketSeller' });
db.station.belongsToMany(db.user,{ through: 'ticketSeller'});

db.user.belongsToMany(db.station, { through: 'ticketScanner' });
db.station.belongsToMany(db.user,{ through: 'ticketScanner'});

db.user.belongsToMany(db.station, { through: 'adminStation' });
db.station.belongsToMany(db.user,{ through: 'adminStation'});

db.user.belongsToMany(db.partner, { through: 'adminPartner' });
db.partner.belongsToMany(db.user,{ through: 'adminPartner'});



/////toutes les realtion one to many
db.userRole.hasMany(db.user, { foreignKey: 'IdUserRole' });
db.user.belongsTo(db.userRole,{ foreignKey: 'IdUserRole'});

db.user.hasMany(db.adminPartner, { foreignKey: 'userUserId' });
db.adminPartner.belongsTo(db.user,{ foreignKey: 'userUserId'});

db.partner.hasMany(db.adminPartner, { foreignKey: 'partnerPartnerId' });
db.adminPartner.belongsTo(db.partner,{ foreignKey: 'partnerPartnerId'});

db.country.hasMany(db.user, { foreignKey: 'userCountry' });
db.user.belongsTo(db.country,{ foreignKey: 'userCountry'});

db.station.hasMany(db.trip, { foreignKey: 'tripOrigine' });
db.trip.belongsTo(db.station,{ foreignKey: 'tripOrigine', as: 'gare_from'});

db.station.hasMany(db.trip, { foreignKey: 'tripDestination' });
db.trip.belongsTo(db.station,{ foreignKey: 'tripDestination', as: 'gare_to'});

db.station.hasMany(db.scale, { foreignKey: 'scaleOrigine' });
db.scale.belongsTo(db.station,{ foreignKey: 'scaleOrigine', as: 'gare_fromSacle'});

db.station.hasMany(db.scale, { foreignKey: 'scaleDestination' });
db.scale.belongsTo(db.station,{ foreignKey: 'scaleDestination', as: 'gare_toScale'});

db.trip.hasMany(db.segment, { foreignKey: 'idSubTrip' });
db.segment.belongsTo(db.trip,{ foreignKey: 'idSubTrip', as: 'sub_trip'});

db.trip.hasMany(db.segment, { foreignKey: 'IdTrip' });
db.segment.belongsTo(db.trip,{ foreignKey: 'IdTrip', as: 'main_trip'});

db.trip.hasMany(db.scale, { foreignKey: 'IdTrip' });
db.scale.belongsTo(db.trip,{ foreignKey: 'IdTrip'});

db.partner.hasMany(db.subscription, { foreignKey: 'subscriber' });
db.subscription.belongsTo(db.partner,{ foreignKey: 'subscriber'});

db.subscriptionType.hasMany(db.subscription, { foreignKey: 'IdSubscriptionType' });
db.subscription.belongsTo(db.subscriptionType,{ foreignKey: 'IdSubscriptionType'});

db.partner.hasMany(db.station, { foreignKey: 'idPartner' });
db.station.belongsTo(db.partner,{ foreignKey: 'idPartner'});

db.paymentType.hasMany(db.payment, { foreignKey: 'IdPaymentType' });
db.payment.belongsTo(db.paymentType,{ foreignKey: 'IdPaymentType'});

db.paymentStatus.hasMany(db.payment, { foreignKey: 'IdPaymentStatus' });
db.payment.belongsTo(db.paymentStatus,{ foreignKey: 'IdPaymentStatus'});

db.departureType.hasMany(db.departure, { foreignKey: 'idTypeDeparture' });
db.departure.belongsTo(db.departureType,{ foreignKey: 'idTypeDeparture'});

db.departureDay.hasMany(db.departure, { foreignKey: 'departureDayId' });
db.departure.belongsTo(db.departureDay,{ foreignKey: 'departureDayId'});

db.trip.hasMany(db.departure, { foreignKey: 'idTrip' });
db.departure.belongsTo(db.trip,{ foreignKey: 'idTrip'});

db.bus.hasMany(db.departure, { foreignKey: 'idBus' });
db.departure.belongsTo(db.bus,{ foreignKey: 'idBus'});

db.bus.hasMany(db.seat, { foreignKey: 'idBuSeat' });
db.seat.belongsTo(db.bus,{ foreignKey: 'idBuSeat'});

db.partner.hasMany(db.busPartner, { foreignKey: 'idPartner' });
db.busPartner.belongsTo(db.partner,{ foreignKey: 'idPartner'});

db.bus.hasMany(db.busPartner, { foreignKey: 'idBus' });
db.busPartner.belongsTo(db.bus,{ foreignKey: 'idBus'});

db.modelCar.hasMany(db.busPartner, { foreignKey: 'busPartnerModele' });
db.busPartner.belongsTo(db.modelCar,{ foreignKey: 'busPartnerModele'});

db.marque.hasMany(db.modelCar, { foreignKey: 'IdMarque' });
db.modelCar.belongsTo(db.marque,{ foreignKey: 'IdMarque'});

db.columnSeat.hasMany(db.seat, { foreignKey: 'IdSeatPosition5Row'});
db.seat.belongsTo(db.columnSeat,{ foreignKey: 'IdSeatPosition5Row'});

db.columnSeat.hasMany(db.seat, { foreignKey: 'IdSeatPosition4Row'});
db.seat.belongsTo(db.columnSeat,{ foreignKey: 'IdSeatPosition4Row'});

db.seat.hasMany(db.booking, { foreignKey: 'IdSeat'});
db.booking.belongsTo(db.seat,{ foreignKey: 'IdSeat'});

db.departure.hasMany(db.booking, { foreignKey: 'idDeparture'});
db.booking.belongsTo(db.departure,{ foreignKey: 'idDeparture'});

db.departure.hasMany(db.booking, { foreignKey: 'idDeparture'});
db.booking.belongsTo(db.departure,{ foreignKey: 'idDeparture'});

db.segment.hasMany(db.booking, { foreignKey: 'idSegment'});
db.booking.belongsTo(db.segment,{ foreignKey: 'idSegment'});

db.user.hasMany(db.booking, { foreignKey: 'idUser'});
db.booking.belongsTo(db.user,{ foreignKey: 'idUser', as:'booker'});

db.bookingState.hasMany(db.booking, { foreignKey: 'idBookingState'});
db.booking.belongsTo(db.bookingState,{ foreignKey: 'idBookingState'});

db.user.hasMany(db.booking, { foreignKey: 'idTicketSeller'});
db.booking.belongsTo(db.user,{ foreignKey: 'idTicketSeller', as:'seller'});

db.payment.hasMany(db.booking, { foreignKey: 'idPayment'});
db.booking.belongsTo(db.payment,{ foreignKey: 'idPayment'});

module.exports = db;