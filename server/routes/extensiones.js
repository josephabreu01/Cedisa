const router = require("express").Router();
const Extensiones = require("../models/extensiones");

router
  .route("/")
  .get((req, res, next) => {
    Extensiones.find({}, (err, result) => {
      res.json({
        success: true,
        extensiones: result,
        message: "extensiones",
      });
    });
  })

  .post((req, res, next) => {
    let extension = new Extensiones();
    extension.extension = req.body.extension;
    extension.personal = req.body.personal;
    extension._id = req.body._id;
    console.log(req.body._id);
    if (extension._id) {
      Extensiones.findOneAndUpdate(
        { _id: extension._id },
        extension,
        { upsert: true },
        (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: "Error al insertar extension",
            });
          }

          res.json({
            success: true,
            message: "Se actualizo / inserto correctamente",
          });
        }
      );
    } else {
      extension.save();
      res.json({
        success: true,
        message: "Se actualizo / inserto correctamente",
      });
      console.log("guardado");
    }
  });

router.delete("/:id", (req, res, next) => {
  console.log(req.params);
  Extensiones.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: "No Borrado",
      });
    } else {
      res.json({
        success: true,
        message: "Borrado",
      });
    }
  });
});

router.route("/excel").post((req, res, next) => {
  Extensiones.insertMany(req.body, (err, result) => {
    if (err) throw err;
    console.log(req.body);
    res.json({
      success: true,
      message: "Se insertaron las extension",
      resultado: result,
    });
  });
});

module.exports = router;
