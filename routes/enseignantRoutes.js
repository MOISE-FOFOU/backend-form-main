const express=require('express')
const Enseignant=require('../controllers/Controller')
const router=express.Router()
const authenticateToken = require('../controllers/authenticateToken');



router.get('/Getenseignant/:id?',Enseignant.Getenseignant)
router.post('/Postenseignant',authenticateToken, Enseignant.Postenseignant);
router.put('/Updateenseignant/:id',authenticateToken,Enseignant.Updateenseignant)
router.patch('/ActivateEnseignant/:id',authenticateToken,Enseignant.ActivateEnseignant)
router.get('/Enseignant',authenticateToken, Enseignant.Enseignant);

module.exports = router;
