import './App.css';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import React from "react"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
