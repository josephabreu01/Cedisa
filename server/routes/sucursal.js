const router = require("express").Router();
const Sucursal = require("../models/sucursal");

router
  .route("/")
  .get((req, res, next) => {
    Sucursal.find({}, (err, sucursales) => {
      if (err) {
        res.json({ success: false, message: "error al buscar las sucrusales" });
        return;
      }

      res.json({
        success: true,
        message: "Sucursales",
        sucursales: sucursales,
      });
    });
  })
  .post((req, res, next) => {
    let sucursal = new Sucursal();
    sucursal.nombre = req.body.nombre;
    sucursal.descripcion = req.body.descripcion;
    sucursal._id = req.body._id;
    console.log(req.body._id);
    if (sucursal._id) {
      Sucursal.findOneAndUpdate(
        { _id: sucursal._id },
        sucursal,
        { upsert: true },
        (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: "Error al insertar sucursal",
            });
          }

          res.json({
            success: true,
            message: "Se actualizo / inserto correctamente",
          });
        }
      );
    } else {
      sucursal.save();
      res.json({
        success: true,
        message: "Se actualizo / inserto correctamente",
      });

      console.log("guardado");
    }
  });

router.delete('/:id', (req, res, next) => {
  console.log(req.params)
  Sucursal.deleteOne({ _id:req.params.id }, (err, ressult) => {
    if (err) {
      res.json({ success: true, message: "Error al Borrar" });
    }

    res.json({
      success: true,
      message: "Se elimino corectamente",
      elemento: ressult,
    });
  });
});

module.exports = router;