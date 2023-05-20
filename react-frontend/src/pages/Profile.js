import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";
import ProfileInfo from "../components/ProfileInfo";
import ProfileReservations from "../components/ProfileReservations";
import ControlPanel from "../components/ControlPanel";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeSidebar, setActiveSidebar] = useState("Profil");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    }
    setUserData(storedUser);
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  const [activeComponent, setActiveComponent] = useState("ProfileInfo");

  const handleLogout = () => {
    localStorage.removeItem("user");
    reloadPage();
  };

  const handleClick = (component) => {
    setActiveComponent(component);
    switch (component) {
      case "ProfileInfo":
        setActiveSidebar("Profil");
        break;
      case "ProfileReservations":
        setActiveSidebar("Moje rezerwacje");
        break;
      case "ControlPanel":
        setActiveSidebar("Panel sterowania");
        break;
      default:
        setActiveSidebar("Profil");
        break;
    }
  };

  const generateUserSidebar = () => {
    return (
      <>
        <span
          className={activeComponent === "ProfileInfo" ? "text active" : "text"}
          onClick={() => handleClick("ProfileInfo")}>
          Profil
        </span>
        <span
          className={
            activeComponent === "ProfileReservations" ? "text active" : "text"
          }
          onClick={() => handleClick("ProfileReservations")}>
          Moje rezerwacje
        </span>
        <Link to="/login" className="text" onClick={handleLogout}>
          Wyloguj się
        </Link>
      </>
    );
  };

  const generateOperatorSidebar = () => {
    return (
      <>
        <span
          className={activeComponent === "ProfileInfo" ? "text active" : "text"}
          onClick={() => handleClick("ProfileInfo")}>
          Profil
        </span>
        <span
          className={
            activeComponent === "ControlPanel" ? "text active" : "text"
          }
          onClick={() => handleClick("ControlPanel")}>
          Panel sterowania
        </span>
        <Link to="/" className="text" onClick={handleLogout}>
          Wyloguj się
        </Link>
      </>
    );
  };

  const generateSidebar = () => {
    return userData.is_admin
      ? generateOperatorSidebar()
      : generateUserSidebar();
  };

  const generateProfileContent = () => {
    return activeComponent === "ProfileInfo" ? (
      <ProfileInfo />
    ) : activeComponent === "ProfileReservations" ? (
      <ProfileReservations />
    ) : activeComponent === "ControlPanel" ? (
      <ControlPanel />
    ) : null;
  };

  const renderProfileData = () => {
    return (
      userData && (
        <div className="profile-container">
          <div className="profile-wrapper">
            <div className="profile-content-wrapper">
              <div className="avatar">
                <div className="img" />
              </div>
              <div className="column-wrapper">
                <span className="text__profile header">
                  {userData.is_admin ? "Panel operatora" : userData.first_name}
                </span>
                <span className="text__profile">
                  Moje konto / {activeSidebar}
                </span>
              </div>
            </div>
            <div className="profile-content-wrapper">
              <div className="column-wrapper center">
                <div className="avatar">
                  <div className="img" />
                </div>
                {generateSidebar()}
              </div>
              <div className="divider" />
              {generateProfileContent()}
            </div>
          </div>
        </div>
      )
    );
  };

  return renderProfileData();
}

export default Profile;
