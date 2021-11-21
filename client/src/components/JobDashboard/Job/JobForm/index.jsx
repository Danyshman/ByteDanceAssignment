import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../storage/Storage';

const JobForm = function JobForm({ id, onOk, onCancel }) {
  const generateStorageKey = (key) => `JobForm-${id}-${key}`;
  const [positionName, setPositionName] = useState(
    Storage.get(generateStorageKey('positionName'), '')
  );
  const [positionCount, setPositionCount] = useState(
    Storage.get(generateStorageKey('positionCount'), '')
  );
  const storage = Storage.getInstance();

  useEffect(() => {
    storage.set(generateStorageKey('positionName'), positionName);
  }, [positionName]);

  useEffect(() => {
    storage.set(generateStorageKey('positionCount'), positionCount);
  }, [positionCount]);

  const isDisabled = () => positionCount === '';
  return (
    <div className="input-group">
      <input
        className="form-control"
        placeholder="Position name"
        value={positionName}
        type="text"
        onChange={(e) => setPositionName(e.target.value)}
      />
      <input
        className="form-control"
        placeholder="Position count"
        value={positionCount}
        type="number"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={(e) => setPositionCount(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-outline-success"
        disabled={isDisabled()}
        onClick={() => onOk({ name: positionName, count: positionCount }, id)}
      >
        Ok
      </button>
      <button type="button" className="btn btn-outline-danger" onClick={() => onCancel(id)}>
        Cancel
      </button>
    </div>
  );
};

JobForm.propTypes = {
  id: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default JobForm;
