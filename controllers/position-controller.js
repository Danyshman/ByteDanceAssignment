const positionService = require('../service/position-service');

class PositionController {
  static async create(req, res, next) {
    try {
      const position = await positionService.create(req.body);
      return res.json(position);
    } catch (e) {
      return next(e);
    }
  }

  static async retrieve(req, res, next) {
    try {
      const position = await positionService.retrieve(req.params.id);
      return res.json(position);
    } catch (e) {
      return next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const position = await positionService.update(req.params.id, req.body);
      return res.json(position);
    } catch (e) {
      return next(e);
    }
  }

  static async list(req, res, next) {
    try {
      const positions = await positionService.list();
      return res.json(positions);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = PositionController;
