import axios from 'axios';

axios.defaults.baseURL = 'https://24serpnya.chost.com.ua';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
  localStorage.removeItem('token');
};

// Register
// #region
export const checkUserExists = async (email) => {
  try {
    const response = await axios.get(`/citizen/check-user?email=${email}`);
    const users = response.data;
    return users;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 409) {
        throw new Error('This email does already exist in Users collection');
      } else {
        throw new Error('Сталася помилка: ' + error.response.statusText);
      }
    }
  }
};

// Відправка листа
export const sendVerificationEmail = async (userData) => {
  try {
    const response = await axios.post('/citizen/get-secret-code', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Реєстрація
export const register = async (newUser, isCodeProvided) => {
  try {
    // Отримуємо код підтвердження, якщо він не наданий
    if (!isCodeProvided) {
      const verificationData = await sendVerificationEmail(newUser.email);
      const { code } = verificationData; // Отримуємо код з відповіді сервера
      newUser.code = code; // Додаємо код підтвердження до даних користувача
    }

    // Відправляємо дані користувача на сервер для реєстрації
    const response = await axios.post('/citizen/create-new-citizen', newUser);
    const user = response.data.result;
    const token = user.token;
    setAuthHeader(token);
    return user;
  } catch (error) {
    throw error;
  }
};

// #endregion

// Login
// #region
// Відправка коду на електронну адресу
export const sendCodeToEmail = async (email) => {
  try {
    const response = await axios.patch('/citizen/check-citizen', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Логін за допомогою електронної адреси та коду
export const signInWithEmailAndCode = async (email, secretCode) => {
  try {
    const response = await axios.patch('/citizen/citizen-sign-in', {
      email: email,
      secretCode: secretCode,
    });
    const user = response.data.result;
    const token = user.token;
    setAuthHeader(token);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 409) {
        throw new Error('Ця електронна адреса не існує в базі даних');
      } else if (status === 435) {
        throw new Error('Неправильний код');
      } else if (status === 436) {
        throw new Error('Невірний код');
      } else {
        throw new Error('Сталася помилка: ' + error.response.statusText);
      }
    } else if (error.request) {
      throw new Error('Помилка запиту: ' + error.request);
    } else {
      throw new Error('Сталася помилка: ' + error.message);
    }
  }
};

// Зміна даних юзера
export const updateUser = async (newData, token) => {
  try {
    const { email, ...dataToUpdate } = newData;
    const response = await axios.patch(
      '/citizen/citizen-update-date',
      dataToUpdate,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

// Логаут
export const logOut = async (token) => {
  try {
    await axios.get('/citizen/log-out', {
      headers: { Authorization: `Bearer ${token}` },
    });
    clearAuthHeader();
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

// Видалення профілю користувача
export const deleteUser = async (token) => {
  try {
    await axios.delete('/citizen/remove-citizen', {
      headers: { Authorization: `Bearer ${token}` },
    });
    clearAuthHeader();
  } catch (error) {
    throw error;
  }
};

//отримання інформації про фіксацію запитів юзера
export const getAllService = async (token) => {
  try {
    const response = await axios.get('/citizen/get-citizen-application', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}
