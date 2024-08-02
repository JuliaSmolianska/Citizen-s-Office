"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [serviceUser, setServiceUser] = useState(initialServiceUser);

  useEffect(() => {
    const userData = localStorage.getItem('userCurrent');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsUserLoaded(true);
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('userCurrent', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, serviceUser, setServiceUser, isUserLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export const initialServiceUser = {
  houseConstruction: {
    fixed: false,
    state: "string"
  },
  cottageConstruction: {
    fixed: false,
    state: "string"
  },
  garageConstruction: {
    fixed: false,
    state: "string"
  },
  landForGardening: {
    fixed: false,
    state: "string"
  },
  landForFarming: {
    fixed: false,
    state: "string"
  },
  partIncome: {
    fixed: false
  },
  consularServicesAbroad: {
    fixed: false
  },
  withdrawalFromCitizenship: {
    fixed: false
  },
  goAbroad: {
    fixed: false
  }
}

