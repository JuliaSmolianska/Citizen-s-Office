import axios from 'axios';

axios.defaults.baseURL = "https://24serpnya.chost.com.ua";

//отримання інформації про всіх кандидатів
export const getAllCandidates = async () => {
  try {
    const response = await axios.get('/elections/get-all-candidates');
    return response;
  } catch (error) {
    throw error;
  }
}

export const giveVoice = async (candidateId, token) => {
  try {
    const response = await axios.post(`/elections/vote?candidateId=${candidateId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new Error('You have already voted');
      }
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
}


// Видалення свого голосу
export const deleteVoice = async (token) => {
  try {
    const response = await axios.delete('/elections/remove-vote', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
