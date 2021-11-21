import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../storage/Storage';

const TeamForm = function TeamForm({ id, onOk, onCancel }) {
  const generateStorageKey = (key) => `TeamForm-${id}-${key}`;
  const [teamName, setTeamName] = useState(Storage.get(generateStorageKey('teamName'), ''));
  const storage = Storage.getInstance();

  useEffect(() => {
    storage.set(generateStorageKey('teamName'), teamName);
  }, [teamName]);

  return (
    <div className="input-group">
      <input
        className="form-control"
        placeholder="Team name"
        value={teamName}
        type="text"
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={() => onOk({ name: teamName }, id)}
      >
        Ok
      </button>
      <button type="button" className="btn btn-outline-danger" onClick={() => onCancel(id)}>
        Cancel
      </button>
    </div>
  );
};

TeamForm.propTypes = {
  id: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TeamForm;
