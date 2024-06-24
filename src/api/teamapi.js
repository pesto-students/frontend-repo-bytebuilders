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
  try {
    const res = await apiRequest.put(`add-members/${id}`, {
      memberIds: list,
    });

    if (res.status === 200) {
      return { success: true, data: res.data, message: res.data.message };
    } else {
      throw new Error('Failed to add members to team');
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
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
  try {
    const res = await apiRequest.delete(`delete-team/${id}`);

    if (res.status === 200) {
      return { success: true, message: res.data.message };
    } else {
      throw new Error('Failed to delete team');
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};