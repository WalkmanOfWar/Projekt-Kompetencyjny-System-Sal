import './App.css';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import React from "react"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MainContent/>
    </div>
  );
}

export default App;
