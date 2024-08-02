import React, { useState, useEffect } from "react";

import { useUser } from "@hooks/useUser";
import { updateUser } from "@APIrest/userRest";

import s from "./UserInfo.module.css";
import pen from "../../icons/edit_pen.svg";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmDelete from "./ConfirmDelete";
import Modal from "@components/Modal/Modal";
import useScreen from "../../hooks/useScreen";

const UserInfo = () => {
  const screenSize = useScreen();
  const { user, setUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [editedData, setEditedData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
  });

  useEffect(() => {
    if (user && !editing) {
      setEditedData({
        lastName: user.lastName,
        firstName: user.firstName,
        middleName: user.middleName,
      });
    }
  }, [user, editing]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const { token, ...userDataWithoutToken } = editedData;
      const updatedUser = await updateUser(userDataWithoutToken, user.token);
      setUser({
        ...updatedUser.result,
        token: user.token,
        email: user.email,
      });
      setEditedData({
        lastName: updatedUser.result.lastName,
        firstName: updatedUser.result.firstName,
        middleName: updatedUser.result.middleName,
      });
      setEditing(false);
    } catch (error) {
      console.error("Помилка під час оновлення користувача:", error);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <div className={`${s.userBlock} ${s.root}`}>
      {screenSize !== "mobile" ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {!editing && (
            <button className={s.editUser} onClick={handleEditClick}>
              Редагувати профіль{" "}
              <Image className={s.icon} src={pen} alt="pen" />
            </button>
          )}
          {!editing && (<button className={s.editUser} onClick={toggleDeleteModal}>
            Видалити профіль <AiOutlineDelete className={s.icon} size={22} />
          </button>)}
        </div>
      ) : (
        <div className={s.editDeleteBlock}>
          {!editing && (
            <button className={s.editUser} onClick={handleEditClick}>
              <Image src={pen} alt="pen" className={s.icon} />
            </button>
          )}
           {!editing && (<button className={s.editUser} onClick={toggleDeleteModal}>
            <AiOutlineDelete className={s.icon} size={22} />
          </button>)}
        </div>
      )}
      <Modal show={showDeleteModal} onClose={toggleDeleteModal}>
        <ConfirmDelete setShowDeleteModal={setShowDeleteModal} />
      </Modal>

      <div className={s.display} style={{ justifyContent: "space-between" }}>
        <div className={s.user_wrapper}>
          <div className={s.userInfo}>
            <p className={s.text}>Ім'я користувача</p>
            <b>
              <>
                {user.lastName} {user.firstName} {user.middleName}
              </>
            </b>
            <p className={s.text} style={{ marginTop: "20px" }}>
              Електронна пошта
            </p>
            <p>{user.email}</p>
          </div>
          {editing && (
            <form className={s.editForm} onSubmit={handleSaveChanges}>
              <div className={s.inputContainer}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleInputChange}
                  className={s.input}
                  placeholder="Прізвище"
                />
              </div>
              <div className={s.inputContainer}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleInputChange}
                  className={s.input}
                  placeholder="Імʼя"
                />
              </div>
              <div className={s.inputContainer}>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={editedData.middleName}
                  onChange={handleInputChange}
                  className={s.input}
                  placeholder="По-батькові"
                />
              </div>
              <button type="submit" className={s.saveBtn}>
                Зберегти зміни
              </button>
              {error && <div className={s.error}>{error}</div>}
            </form>
          )}
        </div>

        <div className={s.verify}>
          <p className={s.verifyTitle}>Верифікація</p>
          <p>в процесі розробки, </p>
          <p>буде доступна незабаром </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
