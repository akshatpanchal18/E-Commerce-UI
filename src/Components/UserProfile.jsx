import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import OrderHistory from "./OrderHistory";

const UserProfile = () => {
  const { logout, Currentuser } = useAuth();
  const [isuser, setUser] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  useEffect(() => {
    Currentuser().then((res) => {
      if (res.success) {
        setUser(res.data);
        // console.log(isuser);
      }
    });
  }, []);
  const navigate = useNavigate();
  const handleOrderHistory = () => {
    console.log("Redirect to order history");
    setShowOrder(true);
  };
  const handleClose = () => {
    setShowOrder(false);
  };
  const handleEditProfile = () => {
    console.log("Redirect to edit profile");
    // Add navigation logic here for editing the profile
  };
  if (!isuser) {
    // Handle loading state or empty user data
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    logout().then((response) => {
      if (response.success) {
        navigate("/");
      }
    });
  };
  return (
    <>
      {showOrder ? (
        <>
          <OrderHistory onClose={handleClose} />
        </>
      ) : (
        <>
          <ProfileWrapper>
            <ProfileHeader>
              <h2>User Profile</h2>
              <IoIosLogOut onClick={handleLogout} className="logout" />
            </ProfileHeader>
            <ProfileImageContainer>
              <ButtonWrapper>
                <ActionButton onClick={handleEditProfile}>
                  Edit Profile
                </ActionButton>
                <ActionButton onClick={handleOrderHistory}>
                  View Order History
                </ActionButton>
              </ButtonWrapper>
            </ProfileImageContainer>
            <ProfileContent>
              <ProfileField>
                <strong>Name:</strong> {isuser.userInfo?.first_name}{" "}
                {isuser.userInfo?.last_name}
              </ProfileField>
              <ProfileField>
                <strong>Email:</strong> {isuser.userInfo?.email}
              </ProfileField>
              <ProfileField>
                <strong>Contact:</strong> {isuser.userInfo?.contact_no}
              </ProfileField>
              <ProfileField>
                <strong>Address:</strong> {isuser.user_address?.address},{" "}
                {isuser.user_address?.city}
              </ProfileField>
              <ProfileField>
                <strong>Postal Code:</strong> {isuser.user_address?.zip_code}
              </ProfileField>
            </ProfileContent>
          </ProfileWrapper>
        </>
      )}
    </>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 2rem auto;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  h2 {
    margin: 0;
    text-align: center;
    font-size: 24px;
    color: #333;
  }
  .logout {
    font-size: 2rem;
    cursor: pointer;
  }
`;

const ProfileContent = styled.div`
  width: 100%;
`;

const ProfileField = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;

  strong {
    font-weight: bold;
    color: #007bff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px; /* Spacing between buttons */
  justify-content: center; /* Center the buttons */
  margin-top: 10px; /* Optional: spacing above buttons */
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default UserProfile;
