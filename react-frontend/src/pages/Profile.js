import React, { useState } from "react";
import './Profile.css';
// import '../components/ProfileInfo'
// import '../components/ProfileReservations'
import ProfileInfo from "../components/ProfileInfo";
import ProfileReservations from "../components/ProfileReservations";
function Profile  () {

    const [activeComponent, setActiveComponent] = useState('ProfileInfo');

  const handleClick = (component) => {
    setActiveComponent(component);
  };

    return(
    <div className="profile-container">
        <div className="profile-wrapper">
            <div className="profile-content-wrapper">
                <div className="avatar">
                    <div className="img"/>
                </div>
                <div className="column-wrapper">
                    <span className="text header">Szymon</span>
                    <span className="text">Moje konto / Profil</span>
                </div>
            </div>
            <div className="profile-content-wrapper">
                <div className="column-wrapper center">
                    <div className="avatar" >
                        <div className="img"/>
                    </div>
                    {/* <span className="text">Informacje o koncie</span> */}
                    <span className="text" onClick={() => handleClick('ProfileInfo')}>Profil</span>
                    <span className="text" onClick={() => handleClick('ProfileReservations')}>Moje rezerwacje</span>

        
                    <span className="text"> Wyloguj się</span>
                    
                </div>
                <div className="divider" />
                {
  activeComponent === 'ProfileInfo' ? <ProfileInfo /> :
  activeComponent === 'ProfileReservations' ? <ProfileReservations /> :
  null // lub inny komponent, który ma być wyrenderowany, jeśli żaden z powyższych warunków nie zostanie spełniony
}
                

              
            </div>
        </div>
    </div>
    )
}

export default Profile;