const router = require('express').Router();
const Anuncio = require('../models/anuncio');

router.route('/')
    .get((req, res, next) => {
        Anuncio.find({}, (err, anuncios) => {
            res.json({
                success: true,
                message: "Excitoso",
                anuncios: anuncios
            })
        })
    })
    .post((req, res, next) => {
        let anuncio = new Anuncio();
        let id = { _id: req.body._id }
        anuncio.titulo = req.body.titulo;
        anuncio.descripcion = req.body.descripcion;
        anuncio.habilitado = req.body.habilitado;
        console.log(id)
        if (id._id) {
            Anuncio.findOneAndUpdate(id, {
                habilitado: anuncio.habilitado,
                titulo: anuncio.titulo,
                descripcion: anuncio.descripcion }
                , { upsert: true },
                (err, result) => {
                    if (result) {
                        res.json({
                            success: true,
                            message: "Excitoso"

                        })

                    }
                })
        } else {
            try {

                anuncio.save();

                res.json({
                    success: true,
                    message: "Excitoso"
                })
            } catch (error) {
                console.log(error)
            }
        }
    })

    router.delete('/:id',(req, res, next) =>{
        
        Anuncio.deleteOne({_id: req.params.id},(err, result)=>{
            if(err){
                res.json({
                    success: false,
                    message: "Error"
                })

                return;
            }else{

            res.json({
                success: true,
                message: "Borrado"
            })
            }

        })
    })

module.exports = router;