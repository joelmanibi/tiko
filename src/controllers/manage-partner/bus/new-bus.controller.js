const db = require("../../../models");
const Bus = db.busPartner;
const Seat = db.seat;
const uploadBus = require("../../../../helpers/partner/bus/uploadPartnerBus");
const util = require("util");

exports.NewBus =  async (req,res) => {
  const uploadFile = util.promisify(uploadBus.single('bus_file'));
    try {
        await uploadFile(req, res);

      const bus = await Bus.create ({
        busPartnerModele : req.body.busModele,
        busPartnerMatricule: req.body.busMatricule,
        busPartnerImage: req.file.filename,
        idPartner:req.body.idPartner,
        busPartnerSeatNumber : req.body.totalSeats,
        idBus : 1,
        seatsPerRow : req.body.seatsPerRow
    });
    
  res.status(200).json({ message: 'Bus créé avec succès.' });

  } catch (error) {
    console.log(error)
}
  }