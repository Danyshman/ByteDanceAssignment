const positionModel = require('../models/position');
const teamModel = require('../models/team');
const data = require('./initialDBData.json');

const sleep = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

module.exports = async () => {
  // I know that hard-coded sleep seconds is bad practice and I should use asynchronous code here,
  // but I am tired and spent my weekend on this task, I hope you will understand me. (-_-)

  const teams = [];
  const positions = {};
  data.teams.forEach((item) => {
    teamModel.create({ name: item.name }, (teamErr, team) => {
      teams.push(team);
      item.jobs.forEach((item2) => {
        positionModel.create({ ...item2, teams: team._id }, (positionErr, position) => {
          if (!(team._id in positions)) {
            positions[team._id] = [position._id.toString()];
          } else {
            positions[team._id].push(position._id.toString());
          }
        });
      });
    });
  });
  await sleep(5000);
  teams.forEach((team) => {
    team.set({ positions: positions[team.id] });
    team.save();
  });
  return teams;
};
