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
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      if (value === 'save') {
        const response = await updateTeamName(teamName, team.teamId);
        setSnackbarMessage(response.data.message || 'Team name updated successfully!');
        setSnackbarSeverity('success');
        getTeams();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update team name.';
      setSnackbarMessage(message);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleAddMember = async () => {
    try {
      if (selectedEmployeeIds.length) {
        const response = await addMemberToTeamAPI(selectedEmployeeIds, team.teamId);
        const { data } = await getParticularTeam(team.teamId);
        setTeamDetails(data);
        setSelectedEmployeeIds([]);
        setSnackbarMessage(response.data.message || 'Member(s) added successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('No members selected.');
        setSnackbarSeverity('warning');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add member(s).';
      setSnackbarMessage(message);
      setSnackbarSeverity('error');
    } finally {
      setButtonFlag({
        editButtonFlag: !buttonFlag.editButtonFlag,
        addMemberButtonFlag: true,
        removeButtonFlag: !buttonFlag.removeButtonFlag,
        deleteButtonFlag: !buttonFlag.deleteButtonFlag,
      });
      setOpenSnackbar(true);
    }
  };

  const handleRemoveMember = async () => {
    try {
      if (selectedEmployeeIds.length) {
        const response = await removeMemberFromTeamAPI(selectedEmployeeIds, team.teamId);
        const { data } = await getParticularTeam(team.teamId);
        setTeamDetails(data);
        setSelectedEmployeeIds([]);
        setSnackbarMessage(response.data.message || 'Member(s) removed successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('No members selected.');
        setSnackbarSeverity('warning');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove member(s).';
      setSnackbarMessage(message);
      setSnackbarSeverity('error');
    } finally {
      setButtonFlag({
        editButtonFlag: !buttonFlag.editButtonFlag,
        addMemberButtonFlag: !buttonFlag.addMemberButtonFlag,
        removeButtonFlag: true,
        deleteButtonFlag: !buttonFlag.deleteButtonFlag,
      });
      setOpenSnackbar(true);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      const response = await deleteTeamAPI(id);
      setSnackbarMessage(response.data.message || 'Team deleted successfully!');
      setSnackbarSeverity('success');
      getTeams();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete team.';
      setSnackbarMessage(message);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setTeamDetails(team);
    setTeamName(team.teamName);
  }, [team]);

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
                  onClick={() => handleDeleteButton(team.teamId)}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
