import React from "react";
import './Profile.css';

const Profile = () => (
    <div className="profile-container">
        <div className="profile-wrapper">
            <div className="profile-content-wrapper">
                <div className="avatar" />
                <div className="column-wrapper">
                    <span className="text header">Szymon</span>
                    <span className="text">Moje konto / Profil</span>
                </div>
            </div>
            <div className="profile-content-wrapper">
                <div className="column-wrapper center">
                    <div className="avatar" />
                    <span className="text">Informacje o koncie</span>
                    <span className="text">Profil</span>
                    <span className="text">Moje rezerwacje</span>
                    <span className="text">Wyloguj się</span>
                </div>
                <div className="divider" />
            </div>
        </div>
    </div>
)

export default Profile;