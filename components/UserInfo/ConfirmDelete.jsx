import { deleteUser } from "@APIrest/userRest";
import { useUser, initialServiceUser } from "@hooks/useUser";
import "../../styles/globals.css";

const ConfirmDelete = ({ setShowDeleteModal }) => {
  const { user, setUser, setServiceUser } = useUser();

  const handleDelete = async () => {
    try {
      await deleteUser(user.token);
      setUser(null);
      setServiceUser(initialServiceUser);
      localStorage.removeItem("userCurrent");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Помилка під час видалення профілю користувача:", error);
    }
  };

  return (
    <div style={{ padding: "30px 20px", textAlign: "center" }}>
      <p style={{ marginBottom: "20px" }}>
        Ви впевнені, що хочете видалити ваш профіль з Кабінета Громадянина
        України?
      </p>

      <button
        className="btnPrimary"
        onClick={handleDelete}
        style={{
          backgroundColor: "rgba(215, 238, 255, 0.5)",
          marginBottom: "20px",
        }}
      >
        Підтвердити
      </button>
      <button className="btnPrimary" onClick={() => setShowDeleteModal(false)}>
        Ні, я випадково
      </button>
    </div>
  );
};

export default ConfirmDelete;
