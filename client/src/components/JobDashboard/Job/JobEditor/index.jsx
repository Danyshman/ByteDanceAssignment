import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../storage/Storage';

const JobEditor = function JobEditor({ jobItem, onSubmit }) {
  const generateStorageKey = (key) => `JobEditor-${jobItem.id}-${key}`;
  const [positionName, setPositionName] = useState(
    Storage.get(generateStorageKey('positionName'), jobItem.name)
  );
  const [positionCount, setPositionCount] = useState(
    Storage.get(generateStorageKey('positionCount'), jobItem.count)
  );
  const storage = Storage.getInstance();

  useEffect(() => {
    storage.set(generateStorageKey('positionName'), positionName);
  }, [positionName]);

  useEffect(() => {
    storage.set(generateStorageKey('positionCount'), positionCount);
  }, [positionCount]);

  return (
    <div
      className="modal fade"
      id={`job-editor-${jobItem.id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit {jobItem.name}</h5>
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
              <div className="col">
                <label htmlFor="position-count">
                  Position count
                  <input
                    id="position-count"
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
              onClick={() => onSubmit({ name: positionName, count: positionCount }, jobItem)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

JobEditor.propTypes = {
  jobItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default JobEditor;
