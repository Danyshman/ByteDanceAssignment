import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from '../../../../configs/axiosConfig';
import JobItem from '../../Job/JobItem';
import JobForm from '../../Job/JobForm';
import TeamEditor from '../TeamEditor';
import generateUniqueId from '../../../../utils/helperFunctions';
import Storage from '../../../../storage/Storage';

const TeamItem = function TeamItem({ team, teamEditedHandler }) {
  const generateStorageKey = (key) => `TeamItem-${team.id}-${key}`;
  const [positionInputIds, setPositionInputIds] = useState(
    Storage.get(generateStorageKey('positionInputIds'), [generateUniqueId()])
  );
  const [positions, setPositions] = useState(
    Storage.get(
      generateStorageKey('positions'),
      team.jobs.map((item) => ({
        ...item,
        isSelected: false,
      }))
    )
  );
  const [isCollapsed, setIsCollapsed] = useState(
    Storage.get(generateStorageKey('isCollapsed'), false)
  );
  const [isSelected, setIsSelected] = useState(
    Storage.get(generateStorageKey('isSelected'), false)
  );
  const storage = Storage.getInstance();

  useEffect(() => {
    storage.set(generateStorageKey('positionInputIds'), positionInputIds);
  }, [positionInputIds]);

  useEffect(() => {
    storage.set(generateStorageKey('positions'), positions);
  }, [positions]);

  useEffect(() => {
    storage.set(generateStorageKey('isCollapsed'), isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    storage.set(generateStorageKey('isSelected'), isSelected);
  }, [isSelected]);

  const numberOfHires = useMemo(
    () => positions.reduce((acc, item) => (item.isSelected ? acc + item.count : acc), 0),
    [positions]
  );

  const positionEditedHandler = async (newItem, oldItem) => {
    try {
      const apiUrl = `/api/position/${oldItem.id}`;
      const response = await axios.put(apiUrl, newItem);
      setPositions((state) =>
        state.map((item) => (item.id !== oldItem.id ? item : { ...item, ...response.data }))
      );
      toast.success('Team was successfully updated!');
    } catch (e) {
      toast.error('Team was not updated!');
    }
  };

  const positionCancelHandler = (id) => {
    setPositionInputIds((state) => state.filter((item) => item !== id));
  };

  const positionCreateHandler = async (data, id) => {
    try {
      const apiUrl = '/api/position';
      const response = await axios.post(apiUrl, { ...data, teams: [team.id] });
      setPositions((state) => [...state, { ...response.data, isSelected: false }]);
      positionCancelHandler(id);
      toast.success('Team was successfully created!');
    } catch (e) {
      toast.error('Team was not created!');
    }
  };

  const newPositionHandler = () => {
    setPositionInputIds((state) => [...state, generateUniqueId()]);
  };

  const onCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onTeamSelect = (e) => {
    if (!e.target.checked) {
      setPositions((state) => state.map((item) => ({ ...item, isSelected: false })));
    }
    setIsSelected(e.target.checked);
  };

  const onPositionSelect = (e, position) => {
    setPositions((state) =>
      state.map((item) =>
        item.id === position.id
          ? {
              ...position,
              isSelected: e.target.checked,
            }
          : item
      )
    );

    if (e.target.checked) {
      setIsSelected(true);
    }
  };

  return team ? (
    <div>
      <div className="input-group">
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            checked={isSelected}
            onChange={onTeamSelect}
          />
        </div>
        <h5 className="input-group-text mb-0">{`${team.name} [${numberOfHires}]`}</h5>
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target={`#team-editor-${team.id}`}
        >
          Modify
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCollapse}>
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {!isCollapsed && (
        <ul className="list-group-flush">
          {positions.map((position) => (
            <li className="list-group-item" key={position.id}>
              <JobItem
                onSelect={onPositionSelect}
                position={position}
                positionEditedHandler={positionEditedHandler}
              />
            </li>
          ))}
          {positionInputIds.map((id) => (
            <li className="list-group-item" key={id}>
              <JobForm id={id} onOk={positionCreateHandler} onCancel={positionCancelHandler} />
            </li>
          ))}
          <li className="list-group-item">
            <button type="button" className="btn btn-primary" onClick={newPositionHandler}>
              + New Position
            </button>
          </li>
        </ul>
      )}
      <TeamEditor team={team} onSubmit={teamEditedHandler} />
    </div>
  ) : null;
};

TeamItem.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  teamEditedHandler: PropTypes.func.isRequired,
};

export default TeamItem;
