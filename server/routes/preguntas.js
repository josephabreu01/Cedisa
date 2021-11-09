const router = require('express').Router();
const Preguntas = require('../models/preguntas');


router.route('/')
    .get((req, res, next) => {

        Preguntas.find({} ,null, {sort: {orden: 1}},(err, result) => {
            if (err) return err;

            res.json({
                success: true,
                message: "Excitoso",
                preguntas: result
            })
        })

        
    })

    .post((req, res, next) => {
        let pregunta = new Preguntas()
        let id = { _id: req.body._id }

        pregunta.pregunta = req.body.pregunta;
        pregunta.orden = req.body.orden;
        pregunta.si = req.body.si;
        pregunta.no = req.body.no;
        pregunta.respuesta = req.body.respuesta;
        pregunta.orden = req.body.orden;
        
        console.log(id)
        if (id._id) {
            // for (let index = 0; index < pregunta.length; index++) {
            //     console.log(pregunta[index])
            //     debugger;
                Preguntas.findOneAndUpdate(id, {
                    pregunta: pregunta.pregunta,
                    
                }, { upsert: true },
                    (err, result) => {
                        if (result) {
                            console.log(result)
                            res.json({
                                success: true,
                                message: "Excitoso"
                                
                            })
    
                        }
                    })
            //}
                
        } else {
            try {
                Preguntas.create(pregunta, (err, result) =>{
                    if(err){
                        console.log(err);
                    }else{
                        res.json({
                            success: true,
                            message: "Excitoso"
                        })
                    }
                })

                

            } catch (error) {
                console.log(error)
            }

        }
    })

    router.delete('/:id',(req, res, next) =>{
        console.log(req.params)
        Preguntas.deleteOne({_id: req.params.id},(err, result)=>{
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