import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {Spinner} from './Loaders'

const AuthPage = () => {
  const { login, register, success, Error } = useAuth();
  // console.log(success, Error, Authenticated );

  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [regUser, setRegUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
    contact_no: "",
    address: "",
    city: "",
    zip_code: "",
  });
  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const toggleForm = () => setIsLogin(!isLogin);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoad(true);
    setMessage("");
    setIsError(false);
    // console.log(userData);
    login(userData).then((response) => {
      setIsLoad(false);
      if (response.success) {
        setMessage("Logged in successfully!");
        navigate("/");
      } else {
        setIsError(true);
        setMessage(response.error || "Login failed.");
      }
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoad(true);
    setMessage("");
    setIsError(false);
    // console.log("Register logic here");
    register(regUser)
    .then((response) => {
      setIsLoad(false);
      if (response.success) {
        setMessage("register successfully!");
        setIsLogin(true)
        setUserData({
          email: regUser.email,
    password: regUser.password,
        })
      } else {
        setIsError(true);
        setMessage(response.error || "Registration failed.");
      }
    });
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [message]);
  return (
    <AuthWrapper>
      <FormWrapper>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {message && <Message $isError={isError}>{message}</Message>}
        {isLogin ? (
          <form onSubmit={handleLogin}>
            {isError ? <p>{Error}</p> : <></>}
            <InputField>
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                name="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={userData.password}
                name="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
            </InputField>
            {isLoad ? <Spinner/> : <></>}
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <InputField>
              <label>First Name:</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={regUser.first_name}
                name="first_name"
                onChange={(e) =>
                  setRegUser({ ...regUser, first_name: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={regUser.last_name}
                name="last_name"
                onChange={(e) =>
                  setRegUser({ ...regUser, last_name: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={regUser.username}
                name="username"
                onChange={(e) =>
                  setRegUser({ ...regUser, username: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={regUser.email}
                name="email"
                onChange={(e) =>
                  setRegUser({ ...regUser, email: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Contact:</label>
              <input
                type="text"
                placeholder="Enter your contact number"
                value={regUser.contact_no}
                name="contact_no"
                onChange={(e) =>
                  setRegUser({ ...regUser, contact_no: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={regUser.password}
                name="password"
                onChange={(e) =>
                  setRegUser({ ...regUser, password: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Address:</label>
              <input
                type="text"
                placeholder="Enter your address"
                value={regUser.address}
                name="address"
                onChange={(e) =>
                  setRegUser({ ...regUser, address: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>City:</label>
              <input
                type="text"
                placeholder="Enter your city"
                value={regUser.city}
                name="city"
                onChange={(e) =>
                  setRegUser({ ...regUser, city: e.target.value })
                }
                required
              />
            </InputField>
            <InputField>
              <label>Zip Code:</label>
              <input
                type="text"
                placeholder="Enter your postal code"
                value={regUser.zip_code}
                name="zip_code"
                onChange={(e) =>
                  setRegUser({ ...regUser, zip_code: e.target.value })
                }
                required
              />
            </InputField>
            {isLoad ? <Spinner/> : <></>}
            <SubmitButton type="submit">Register</SubmitButton>
          </form>
        )}
        <ToggleText onClick={toggleForm}>
          {isLogin
            ? "Don't have an account? Register here."
            : "Already have an account? Login here."}
        </ToggleText>
      </FormWrapper>
    </AuthWrapper>
  );
};

const Message = styled.p`
  color: ${(props) => (props.isError ? "red" : "green")};
  text-align: center;
  margin-bottom: 15px;
`;

const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
  height: auto;
  flex-wrap: wrap;
`;

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const InputField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #254336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a6854;
  }
`;

const ToggleText = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default AuthPage;
