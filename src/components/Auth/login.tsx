import { Modal } from "antd";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC<{ isModalOpen: boolean; setIsModalOpen: any }> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setemailError] = useState("");

  const { loginUser } = useAuth();

  // function to handle login of the user
  const handleLogin = () => {
    //validation on user name and email values
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userName.trim() === "") {
      setUserNameError("Please enter a value.");
    } else if (email.trim() === "") {
      setemailError("Please enter a value.");
    } else if (!emailRegex.test(email)) {
      setemailError("Please enter a valid email address.");
    } else {
      loginUser(email, userName);
      // to clear input fields
      setUserName("");
      setEmail("");
      setUserNameError("");
      setemailError("");
      setIsModalOpen(false);
    }
  };

  // function to close and cancel login box
  const cancelModal = () => {
    setIsModalOpen(false);
    setUserName("");
    setEmail("");
    setUserNameError("");
    setemailError("");
  };

  return (
    <>
      <Modal
        className="modal-container"
        title="Login Form"
        open={isModalOpen}
        onOk={handleLogin}
        onCancel={cancelModal}
      >
        <br />
        <label>Name: &nbsp;&nbsp;</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          maxLength={25}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        &nbsp;
        {userNameError && <span className="error-msg">{userNameError}</span>}
        <br /> <br />
        <label>Email:&nbsp;&nbsp;&nbsp;</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        &nbsp;{emailError && <span className="error-msg">{emailError}</span>}
      </Modal>
    </>
  );
};

export default Login;
