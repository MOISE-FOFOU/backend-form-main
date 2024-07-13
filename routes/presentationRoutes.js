const express=require('express')
const presentation=require('../controllers/Controller')
const router=express.Router()
const authenticateToken = require('../controllers/authenticateToken');



router.get('/Getpresentation/:id?',presentation.Getpresentation)
router.post('/Postpresentation',authenticateToken, presentation.Postpresentation);
router.put('/Updatepresentation/:id',authenticateToken,presentation.Updatepresentation)
router.patch('/Activatepresentation/:id',authenticateToken,presentation.ActivatePresentation)
router.get('/Presentation',authenticateToken, presentation.Presentation);

module.exports = router;
