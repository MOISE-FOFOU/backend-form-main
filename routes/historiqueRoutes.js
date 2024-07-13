const express=require('express')
const historique=require('../controllers/Controller')
const router=express.Router()
const authenticateToken = require('../controllers/authenticateToken');



router.get('/Gethistorique/:id?',historique.Gethistorique)
router.post('/Posthistorique',authenticateToken, historique.Posthistorique);
router.put('/Updatehistorique/:id',authenticateToken,historique.Updatehistorique)
router.patch('/Activatehistorique/:id',authenticateToken,historique.ActivateHistorique)
router.get('/Historique',authenticateToken, historique.Historique);

module.exports = router;
