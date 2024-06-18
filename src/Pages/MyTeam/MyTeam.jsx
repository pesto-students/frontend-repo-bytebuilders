import React, { useEffect, useState } from 'react';
import './MyTeam.css';
import EmployeeCard from '../../components/Employee/EmployeeCard/EmployeeCard';
import { createTeamAPI, getMyTeam } from '../../api/teamapi';
import Myteams from '../../components/Team/Myteams/Myteams';
import ListContainer from '../../components/ListContainer/TeamListContainer';
export default function MyTeam() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamFlag, setTeamFlag] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const getTeams = async () => {
    const res = await getMyTeam();
    setTeams(res.teamDetails);
  };
  const handleCLickAdd = async () => {
    if (teamFlag && teamName.length) {
      const res = await createTeamAPI(teamName);

      setTeamFlag(false);
      getTeams();
    } else {
      setTeamFlag(true);
    }
  };
  const handleChange = (e) => {
    setTeamName(e.target.value);
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
            <button onClick={handleCLickAdd}>Add Team</button>
          </div>
        </>
      )}
      <h2>My Team</h2>
      {/* {teams.map((team) => (
        <Myteams team={team} user={user} />
      ))} */}

      {teams.map((team) => (
        <ListContainer
          team={team}
          getTeams={getTeams}
          key={team.teamId}
        />
      ))}
    </div>
  );
}
