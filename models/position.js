const { Schema, model } = require('mongoose');

const PositionSchema = new Schema({
  name: { type: String, unique: true, required: true },
  count: { type: Number, min: 0, default: 0 },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

module.exports = model('Position', PositionSchema);
