import React, { useState } from "react";
import './Operator.css';
import { Link } from "react-router-dom"; // Import Link z react-router-dom

import ProfileInfo from "../components/ProfileInfo";
import ProfileReservations from "../components/ProfileReservations";
import ControlPanel from "../components/ControlPanel";

function Operator() {
    const [activeComponent, setActiveComponent] = useState('ProfileInfo');

    const handleClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="profile-container">
            <div className="profile-wrapper">
                <div className="profile-content-wrapper">s
                    <div className="avatar">
                        <div className="img" />
                    </div>
                    <div className="column-wrapper">
                        <span className="text header">Operator</span>
                        <span className="text">Moje konto / Profil</span>
                    </div>
                </div>
                <div className="profile-content-wrapper">
                    <div className="column-wrapper center">
                        <div className="avatar" >
                            <div className="img" />
                        </div>
                        <span className="text" onClick={() => handleClick('ProfileInfo')}>Profil</span>
                        <span className="text" onClick={() => handleClick('ProfileReservations')}>Moje rezerwacje</span>
                        <span className="text"  onClick={() => handleClick('ControlPanel')}> Panel sterowania</span>
                        <Link to="/login" className="text">Wyloguj się</Link> 
                    </div>
                    <div className="divider" />

                    {activeComponent === 'ProfileInfo' ? <ProfileInfo /> : activeComponent === 'ProfileReservations' ? <ProfileReservations /> : <ControlPanel />}






                </div>
            </div>
        </div>
    )
}

export default Operator;
