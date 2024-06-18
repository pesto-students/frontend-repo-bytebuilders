import apiRequest from './apiRequest';

export const getMyTeam = async () => {
  const res = await apiRequest.get(`fetch-your-own-team`);
  return res.data;
};

export const getParticularTeam = async (id) => {
  const res = await apiRequest.get(`get-team-details/${id}`);
  return res;
};

export const updateTeamName = async (teamName, id) => {
  const res = await apiRequest.put(`update-team/${id}`, { teamName });
  return res;
};

export const addMemberToTeamAPI = async (list, id) => {
  const res = await apiRequest.put(`add-members/${id}`, {
    memberIds: list,
  });
  return res;
};

export const removeMemberFromTeamAPI = async (list, id) => {
  const res = await apiRequest.put(`remove-members/${id}`, {
    memberIds: list,
  });
  return res;
};

export const createTeamAPI = async (teamName) => {
  const res = await apiRequest.post(`create-team`, {
    name: teamName,
  });
  return res;
};

export const deleteTeamAPI = async (id) => {
  const res = await apiRequest.delete(`delete-team/${id}`);
  return res;
};
