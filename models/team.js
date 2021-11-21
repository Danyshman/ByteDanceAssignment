const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
  name: { type: String, unique: true, required: true },
  positions: [{ type: Schema.Types.ObjectId, ref: 'Position' }],
});

module.exports = model('Team', TeamSchema);
