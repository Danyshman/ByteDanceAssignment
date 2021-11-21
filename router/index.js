const { Router } = require('express');
const teamController = require('../controllers/team-controller');
const positionController = require('../controllers/position-controller');

const router = new Router();

router.post('/', teamController.create);
router.post('/team', teamController.create);
router.get('/team/:id', teamController.retrieve);
router.put('/team/:id', teamController.update);
router.get('/team', teamController.list);

router.post('/position', positionController.create);
router.get('/position/:id', positionController.retrieve);
router.put('/position/:id', positionController.update);
router.get('/position', positionController.list);

module.exports = router;
