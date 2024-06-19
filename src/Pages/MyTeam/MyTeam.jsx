import React, { useEffect, useState } from 'react';
import './MyTeam.css';
import EmployeeCard from '../../components/Employee/EmployeeCard/EmployeeCard';
import { createTeamAPI, getMyTeam } from '../../api/teamapi';
import Myteams from '../../components/Team/Myteams/Myteams';
import ListContainer from '../../components/ListContainer/TeamListContainer';
import { useSelector } from 'react-redux';
export default function MyTeam() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamFlag, setTeamFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const getTeams = async () => {
    try {
      const res = await getMyTeam();
      setTeams(res.teamDetails);
    } catch (error) {}
  };
  const handleCLickAdd = async () => {
    try {
      if (teamFlag && teamName.length) {
        const res = await createTeamAPI(teamName);

        setTeamFlag(false);
        getTeams();
      } else {
        setTeamFlag(true);
      }
    } catch (error) {}
  };
  const handleChange = (e) => {
    setTeamName(e.target.value);
  };
  useEffect(() => {
    if (!teams.length) {
      getTeams();
    }
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
          Lets wait to alloacate to team...
        </span>
      )}
    </div>
  );
}
