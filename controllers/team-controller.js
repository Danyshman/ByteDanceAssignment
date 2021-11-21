const teamService = require('../service/team-service');

class TeamController {
  static async create(req, res, next) {
    try {
      const team = await teamService.create(req.body);
      return res.json(team);
    } catch (e) {
      return next(e);
    }
  }

  static async retrieve(req, res, next) {
    try {
      const team = await teamService.retrieve(req.params.id);
      return res.json(team);
    } catch (e) {
      return next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const team = await teamService.update(req.params.id, req.body);
      return res.json(team);
    } catch (e) {
      return next(e);
    }
  }

  static async list(req, res, next) {
    try {
      const teams = await teamService.list();
      return res.json(teams);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = TeamController;
