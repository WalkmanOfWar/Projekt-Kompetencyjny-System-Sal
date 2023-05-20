import React from "react";
import { useEffect, useState } from "react";
import "./ProfileInfo.css";
import { useNavigate } from "react-router-dom";
function ProfileInfo() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/");
    }
    setUserData(storedUser);
  }, []);

  const renderProfileInfo = () => {
    return (
      userData && (
        <div className="info-wrapper">
          <span className="text2">Profil</span>
          <div className="info-item">
            <span className="text1">Imię:</span>
            <span className="text1">{userData.first_name}</span>
          </div>
          <div className="info-item">
            <span className="text1">Nazwisko:</span>
            <span className="text1">{userData.last_name}</span>
          </div>
          <div className="info-item">
            <span className="text1">Email:</span>
            <span className="text1">{userData.email}</span>
          </div>
          <div className="info-item">
            <span className="text1">Hasło:</span>
            <span className="text1">{userData.password}</span>
          </div>
        </div>
      )
    );
  };

  return renderProfileInfo();
}

export default ProfileInfo;
