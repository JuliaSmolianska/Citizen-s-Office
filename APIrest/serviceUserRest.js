import axios from 'axios';

axios.defaults.baseURL = "https://24serpnya.chost.com.ua";

//отримання інформації про фіксацію запитів юзера
export const partIncome = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-part-income', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};

export const withdrawalFromCitizenship = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-withdrawal-from-citizenship', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};

export const goAbroad = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-go-abroad', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};

export const houseConstruction = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-house-construction', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cottageConstruction = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-cottage-construction', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};

export const garageConstruction = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-garage-construction', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};

export const landForGardening = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-land-for-gardening', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};

export const landForFarming = async (fixed, token) => {
  try {
    const response = await axios.post('/application/application-for-land-for-farming', fixed, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('userCurrent');
        window.location.reload();
      }
      throw error;
    } else {
      throw error;
    }
  }
};
