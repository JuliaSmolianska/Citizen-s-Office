"use client";

import { getAllService } from "@APIrest/userRest";
import { useUser } from "@hooks/useUser";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import io from "socket.io-client";
import FreePrivateLand from "@components/FreePrivateLand/FreePrivateLand";
import ProfitFromGas from "@components/ProfitFromGas";
import UkrainianCitizen from "@components/UkrainianCitizen";
import UserInfo from "@components/UserInfo/UserInfo";
import GoAbroad from "@components/GoAbroad";
import Election from "@components/Election/Election";

const Home = () => {
  const { user, setUser, setServiceUser, isUserLoaded } = useUser();
  const [amount, setAmount] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const socket = io("https://24serpnya.chost.com.ua", {
      path: "/socketio",
      reconnection: true,
      transports: ["websocket", "polling"],
      reconnectionAttemps: 5,
    });

    socket.emit("join");

    socket.on("amount", ({ amount }) => {
      setAmount(amount); // Оновлюємо дані
    });

    return () => {
      socket.disconnect();
    };
  }, [scrollPosition]);

  useEffect(() => {
    localStorage.removeItem("serviceUser");
    const fetchService = async () => {
      try {
        const getService = await getAllService(user.token);
        const status = getService.status;
        if (status === 200) {
          const service = getService.data.result[0];
          setServiceUser(service);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            localStorage.removeItem("userCurrent");
            setUser(null);
          } else {
            console.error(
              "Помилка отримання інформації про запити користувача:",
              error
            );
          }
        }
      }
    };

    fetchService();
  }, [isUserLoaded]);

  return (
    <div>
      {user && <UserInfo />}
      <Election />
      <FreePrivateLand
        amount={amount}
        scrollPosition={scrollPosition}
        setScrollPosition={setScrollPosition}
      />
      <ProfitFromGas amount={amount.partIncome} />
      <GoAbroad amount={amount.goAbroad} />
      <UkrainianCitizen amount={amount.withdrawalFromCitizenship} />
    </div>
  );
};

export default Home;
