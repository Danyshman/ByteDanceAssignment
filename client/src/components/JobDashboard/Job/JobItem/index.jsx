import React from 'react';
import PropTypes from 'prop-types';
import JobEditor from '../JobEditor';

const JobItem = function JobItem({ position, onSelect, positionEditedHandler }) {
  return position ? (
    <div className="input-group">
      <div className="input-group-text">
        <input
          checked={position.isSelected}
          type="checkbox"
          onChange={(e) => onSelect(e, position)}
        />
      </div>
      <span className="input-group-text mb-0">{`${position.name} [${position.count}]`}</span>
      <button
        type="button"
        className="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#job-editor-${position.id}`}
      >
        Modify
      </button>
      <JobEditor jobItem={position} onSubmit={positionEditedHandler} />
    </div>
  ) : null;
};

JobItem.propTypes = {
  position: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  positionEditedHandler: PropTypes.func.isRequired,
};

export default JobItem;
