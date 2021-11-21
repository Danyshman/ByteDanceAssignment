const teamModel = require('../models/team');
const TeamDto = require('../dtos/team-dto');

class TeamService {
  static async create(payload) {
    const team = await teamModel.create(payload);
    return new TeamDto(team);
  }

  static async retrieve(id) {
    const team = await teamModel.findById(id).populate('positions');
    return new TeamDto(team);
  }

  static async update(id, payload) {
    const team = await teamModel.findByIdAndUpdate(id, payload, { new: true });
    return new TeamDto(team);
  }

  static async delete(id) {
    const team = await teamModel.findByIdAndDelete(id);
    return new TeamDto(team);
  }

  static async list() {
    const teams = await teamModel.find().populate('positions');
    return Array.from(teams).map((team) => new TeamDto(team));
  }
}

module.exports = TeamService;
