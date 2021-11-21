import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../storage/Storage';

const TeamEditor = function TeamEditor({ team, onSubmit }) {
  const generateStorageKey = (key) => `TeamEditor-${team.id}-${key}`;
  const [positionName, setPositionName] = useState(
    Storage.get(generateStorageKey('positionName'), team.name)
  );
  const storage = Storage.getInstance();

  useEffect(() => {
    storage.set(generateStorageKey('positionName'), positionName);
  }, [positionName]);

  return (
    <div
      className="modal fade"
      id={`team-editor-${team.id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit {team.name}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close icon"
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                <label htmlFor="position-name">
                  Position name
                  <input
                    id="position-name"
                    className="form-control"
                    placeholder="Position name"
                    value={positionName}
                    type="text"
                    onChange={(e) => setPositionName(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => onSubmit({ name: positionName }, team)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TeamEditor.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TeamEditor;
