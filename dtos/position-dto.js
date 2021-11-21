module.exports = class TeamDto {
  id;

  name;

  count;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.count = model.count;
  }
};
