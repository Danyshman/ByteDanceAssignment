const positionModel = require('../models/position');
const PositionDto = require('../dtos/position-dto');
const teamModel = require('../models/team');

class PositionService {
  static async create(payload) {
    const position = await positionModel.create(payload);
    if ('teams' in payload) {
      payload.teams.forEach((teamId) => {
        teamModel.findById(teamId, (err, team) => {
          team.positions.push(position);
          team.save();
        });
      });
    }
    return new PositionDto(position);
  }

  static async retrieve(id) {
    const position = await positionModel.findById(id);
    return new PositionDto(position);
  }

  static async update(id, payload) {
    const position = await positionModel.findByIdAndUpdate(id, payload, { new: true });
    return new PositionDto(position);
  }

  static async delete(id) {
    const position = await positionModel.findByIdAndDelete(id);
    return new PositionDto(position);
  }

  static async list() {
    const positions = await positionModel.find();
    return Array.from(positions).map((position) => new PositionDto(position));
  }
}

module.exports = PositionService;
