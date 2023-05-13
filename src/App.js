import logo from './logo.svg';
import React, { useState } from "react";
import Albums from "./Albums";

import './App.css';

export default function App(){

  const [showingAlbums, setShowingAlbums] = useState(false)

  const listAlbums = () => {
    setShowingAlbums(prev => !prev)
  }

  return (
    <div>
      <Albums />
      {/* {showingAlbums 
      ?
        <Albums />
      :
        <button>Hide albums</button>
      } */}
    </div>
  );
}
