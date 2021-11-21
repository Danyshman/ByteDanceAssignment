import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../configs/axiosConfig';
import TeamItem from './Team/TeamItem';
import TeamForm from './Team/TeamForm';
import generateUniqueId from '../../utils/helperFunctions';
import Storage, { STORAGE_KEY } from '../../storage/Storage';

const JobDashboard = function JobDashboard() {
  const generateStorageKey = (key) => `JobDashboard-${key}`;
  const [teams, setTeams] = useState(Storage.get(generateStorageKey('teams'), []));
  const [teamInputIds, setTeamInputIds] = useState(
    Storage.get(generateStorageKey('teamInputIds'), [generateUniqueId()])
  );
  const storage = Storage.getInstance();

  useEffect(() => {
    storage.set(generateStorageKey('teams'), teams);
  }, [teams]);

  useEffect(() => {
    storage.set(generateStorageKey('teamInputIds'), teamInputIds);
  }, [teamInputIds]);

  const teamCancelHandler = (id) => {
    setTeamInputIds((state) => state.filter((item) => item !== id));
  };

  const teamCreateHandler = async (data, id) => {
    try {
      const apiUrl = '/api/team';
      const response = await axios.post(apiUrl, { ...data, positions: [] });
      setTeams((state) => [...state, { ...response.data, isSelected: false }]);
      teamCancelHandler(id);
      toast.success('Team was successfully created!');
    } catch (e) {
      toast.error('Team was not created!');
    }
  };

  const teamEditedHandler = async (newItem, oldItem) => {
    try {
      const apiUrl = `/api/team/${oldItem.id}`;
      const response = await axios.put(apiUrl, newItem);
      setTeams((state) =>
        state.map((item) => (item.id !== oldItem.id ? item : { ...item, ...response.data }))
      );
      toast.success('Position was successfully updated!');
    } catch (e) {
      toast.error('Position was not updated!');
    }
  };

  const newTeamHandler = () => {
    setTeamInputIds((state) => [...state, generateUniqueId()]);
  };

  const onSave = () => {
    storage.saveDataInLocalStorage();
  };

  const onReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const apiUrl = '/api/team';
      const response = await axios.get(apiUrl);
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  return (
    <>
      <h2>Opening Jobs</h2>

      <div>
        <ul className="list-group">
          {teams.map((team) => (
            <li className="list-group-item" key={team.id}>
              <TeamItem team={team} teamEditedHandler={teamEditedHandler} />
            </li>
          ))}
          {teamInputIds.map((id) => (
            <li className="list-group-item" key={id}>
              <TeamForm id={id} onOk={teamCreateHandler} onCancel={teamCancelHandler} />
            </li>
          ))}
          <li className="list-group-item">
            <button type="button" className="btn btn-primary" onClick={newTeamHandler}>
              + New Team
            </button>
          </li>
        </ul>
        <div className="btn-group mt-2">
          <button type="button" className="btn btn-primary" onClick={onSave}>
            Save
          </button>
          <button type="button" className="btn btn-outline-danger" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default JobDashboard;
