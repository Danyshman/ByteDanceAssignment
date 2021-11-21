module.exports = class TeamDto {
  id;

  name;

  jobs;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.jobs = Array.from(model.positions).map((position) => ({
      id: position._id,
      name: position.name,
      count: position.count,
    }));
  }
};
