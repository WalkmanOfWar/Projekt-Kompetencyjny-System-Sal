import React from "react"
import "./Footer.css"

export default function Footer() {
    return (
        <div className="container-fluid footer-background footer-text p-5">
            <div className="row pt-5">
                <div className="col-12">
                    <div className="d-flex flex-row justify-content-center">
                        <div className="col-2">
                            <a className="nav-link" href="http://localhost:3000/">Strona Główna</a>
                        </div>
                        <div className="col-2">
                            <a className="nav-link" href="http://localhost:3000/">FAQ</a>
                        </div>
                        <div className="col-2">
                            <a className="nav-link" href="http://localhost:3000/">O nas</a>
                        </div>
                        <div className="col-2">
                            <a className="nav-link" href="http://localhost:3000/">Kontakt</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-5 ">
                <h1 className="text-center">@2023 Time Tacticians</h1>
                <h2 className="text-center">Made by:</h2>
                <h2 className="text-center"> 
                    <ul>
                        <li>Piotr Pabich</li>
                        <li>Maciej Sierzputowski</li>
                        <li>Szymon Owczarek</li>
                        <li>Wiktor Koprowski</li>
                    </ul>
                </h2>
            </div>                    
        </div>
    )
}