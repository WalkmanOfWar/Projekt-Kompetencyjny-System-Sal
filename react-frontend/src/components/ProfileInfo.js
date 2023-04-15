import React from "react";
import './ProfileInfo.css';
function  ProfileInfo(){
    return (
        
        <div className="info-wrapper"> 
        <  span className="text2">Profil</span>
            <div className="info-item">
                <  span className="text1">Imię:</span>
                <  span className="text1">Szymon</span>
            </div>  
            <div className="info-item">
                <  span className="text1">Nazwisko:</span>
                <  span className="text1">Owczarek</span>
            </div>  
            <div className="info-item">
                <  span className="text1">Email:</span>
                <  span className="text1">235943@edu.p.lodz.pl</span>
            </div> 
            <div className="info-item">
                <  span className="text1">Hasło:</span>
                <  span className="text1">********</span>
            </div> 
        </div>
      );
}

export default ProfileInfo;