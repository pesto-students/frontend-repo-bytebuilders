import React, { useEffect, useState } from 'react';
import './TeamListContainer.css';
import EmployeeCard from '../Employee/EmployeeCard/EmployeeCard';
import {
  addMemberToTeamAPI,
  deleteTeamAPI,
  getParticularTeam,
  removeMemberFromTeamAPI,
  updateTeamName,
} from '../../api/teamapi';

import EmployeeListContainer from '../Employee/EmployeeListContainer/EmployeeListContainer';
import { employeeListAPI } from '../../api/userAPI';
import { useSelector } from 'react-redux';
export default function ListContainer({ team, getTeams }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const [buttonFlag, setButtonFlag] = useState({
    editButtonFlag: true,
    addMemberButtonFlag: true,
    removeButtonFlag: true,
    deleteButtonFlag: true,
  });
  const user = useSelector((state) => state.user);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [teamDetails, setTeamDetails] = useState({});

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = async (e) => {
    const { value } = e.target;
    setEditEnable(!editEnable);
    setButtonFlag({
      editButtonFlag: true,
      addMemberButtonFlag: !buttonFlag.addMemberButtonFlag,
      removeButtonFlag: !buttonFlag.removeButtonFlag,
      deleteButtonFlag: !buttonFlag.deleteButtonFlag,
    });
    try {
      if (value == 'save') {
        await updateTeamName(teamName, team.teamId);

        getTeams();
      }
    } catch (error) {}
  };
  const handleAddMember = async () => {
    try {
      if (selectedEmployeeIds.length) {
        await addMemberToTeamAPI(selectedEmployeeIds, team.teamId);
        const { data } = await getParticularTeam(team.teamId);

        setTeamDetails(data);
        setSelectedEmployeeIds([]);
      }

      setButtonFlag({
        editButtonFlag: !buttonFlag.editButtonFlag,
        addMemberButtonFlag: true,
        removeButtonFlag: !buttonFlag.removeButtonFlag,
        deleteButtonFlag: !buttonFlag.deleteButtonFlag,
      });
    } catch (error) {}
  };

  const handleRemoveMember = async () => {
    try {
      if (selectedEmployeeIds.length) {
        await removeMemberFromTeamAPI(
          selectedEmployeeIds,
          team.teamId
        );

        const { data } = await getParticularTeam(team.teamId);
        console.log(data);
        setTeamDetails(data);
        setSelectedEmployeeIds([]);
      } else {
        teamDetails.teamMembers.map((member) =>
          console.log('meid', member._id)
        );
        const teamMembersList = teamDetails.teamMembers.filter(
          (member) =>
            member._id !== teamDetails.teamReportingManager._id
        );
        setMembers(teamMembersList);
      }
      setButtonFlag({
        editButtonFlag: !buttonFlag.editButtonFlag,
        addMemberButtonFlag: !buttonFlag.addMemberButtonFlag,
        removeButtonFlag: true,
        deleteButtonFlag: !buttonFlag.deleteButtonFlag,
      });
    } catch (error) {}
  };
  const handleDeleteButtom = async (id) => {
    try {
      await deleteTeamAPI(id);
      getTeams();
    } catch (error) {}
  };
  const handleChange = (e) => {
    setTeamName(e.target.value);
  };
  useEffect(() => {
    setTeamDetails(team);
    setTeamName(team.teamName);
  }, []);
  return (
    <div className="listcontainer">
      <div className="listtitle">
        <input
          type="text"
          value={teamName}
          onChange={(e) => handleChange(e)}
        />
        <span onClick={handleToggle}>{isExpanded ? '▼' : '►'}</span>
      </div>
      {isExpanded && (
        <div className="teamdetails">
          {(user.isAdmin || user.isReportingManager) && (
            <div className="teambuttonconatiner">
              {buttonFlag.editButtonFlag && (
                <button
                  onClick={(e) => handleEditClick(e)}
                  value={editEnable ? 'save' : 'edit'}
                  style={{
                    background: '#2EC9FE40',
                    color: '#2EC9FE',
                  }}
                >
                  {editEnable ? 'Save' : 'Edit Name'}
                </button>
              )}
              {buttonFlag.addMemberButtonFlag && (
                <button
                  onClick={handleAddMember}
                  style={{
                    background: '#2EC9FE40',
                    color: '#2EC9FE',
                  }}
                >
                  Add Member
                </button>
              )}
              {buttonFlag.removeButtonFlag && (
                <button
                  onClick={handleRemoveMember}
                  style={{
                    background: '#EE404C40',
                    color: '#EE404C',
                  }}
                >
                  Remove Member
                </button>
              )}
              {buttonFlag.deleteButtonFlag && (
                <button
                  onClick={() => handleDeleteButtom(team.teamId)}
                  style={{
                    background: '#EE404C40',
                    color: '#EE404C',
                  }}
                >
                  Delete Team
                </button>
              )}
            </div>
          )}
          {buttonFlag.addMemberButtonFlag &&
          buttonFlag.deleteButtonFlag ? (
            <>
              <div className="managercontainer">
                <b>Manager</b>
                <EmployeeCard
                  Employee={team.teamReportingManager}
                  key={team.teamName}
                />
              </div>
              <div className="line"></div>
              <div className="teammembercontainer">
                {teamDetails.teamMembers.map(
                  (member) =>
                    member._id !==
                      teamDetails.teamReportingManager._id && (
                      <EmployeeCard
                        Employee={member}
                        key={member._id}
                      />
                    )
                )}
              </div>
            </>
          ) : (
            <EmployeeListContainer
              list={members}
              addFlag={buttonFlag.addMemberButtonFlag}
              selectedEmployeeIds={selectedEmployeeIds}
              setSelectedEmployeeIds={setSelectedEmployeeIds}
            />
          )}
        </div>
      )}
    </div>
  );
}
