import React, { useEffect, useState } from 'react';
import './MyTeam.css';
import { createTeamAPI, getMyTeam } from '../../api/teamapi';
import ListContainer from '../../components/ListContainer/TeamListContainer';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MyTeam() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamFlag, setTeamFlag] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const user = useSelector((state) => state.user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); // Default type is success
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getTeams = async () => {
    try {
      const res = await getMyTeam();
      setTeams(res.teamDetails);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to fetch teams');
      handleSnackbar('error', 'Failed to fetch teams');
    }
  };

  const handleClickAdd = async () => {
    try {
      if (teamFlag && teamName.length > 0) {
        const res = await createTeamAPI(teamName);
        setTeamName('');
        setTeamFlag(false);
        getTeams();
        handleSnackbar('success', res.data.message);
      } else {
        setTeamFlag(true);
      }
      setError('');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(errorMessage);
      handleSnackbar('error', errorMessage);
    }
  };

  const handleChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    // Automatically close the Snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="myteamContainer">
      {user.isAdmin && (
        <>
          <h2>Teams</h2>
          <div className="addteambutton">
            {teamFlag && (
              <input
                type="text"
                name="name"
                value={teamName}
                onChange={(e) => handleChange(e)}
                placeholder="Team Name"
              />
            )}
            <button onClick={handleClickAdd}>Add Team</button>
          </div>
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarType}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <h2>My Team</h2>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      {teams.length ? (
        teams.map((team) => (
          <ListContainer
            team={team}
            getTeams={getTeams}
            key={team.teamId}
          />
        ))
      ) : (
        <span style={{ color: '#FF3F3F' }}>
          Let's wait to allocate to team...
        </span>
      )}
    </div>
  );
}