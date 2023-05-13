import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';


export default function Albums() {

  const [data, setData] = useState([]);

  // const [showingAlbums, setShowingAlbums] = useState(false)

  const [searchValue, setSearchValue] = useState([""])
  const [searchCriteria, setSearchCriteria] = useState("")
  const [searchResults, setSearchResults] = useState([])

  function getAlbumsList() {
    axios.get("http://localhost:5000/albums", { crossdomain: true }).then(response => {
      console.log(response.data);
      setData(response.data)
      // setShowingAlbums(true)
    });
  }

  function hideAlbums() {
    setData([])
  }

  function handleSearch() {
    axios.get(`http://localhost:5000/${searchCriteria}/${searchValue}`, { crossdomain: true }).then(response => {
      console.log(response.data);
      setSearchResults(response.data)
    });
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value)
  }

  function onValueChange(e) {
    setSearchCriteria(e.target.value)
  }

  return (
    <div>
      <section className="list-section">
        <button onClick={getAlbumsList}>
          List your saved albums
        </button>
        <button onClick={hideAlbums}>Hide your saved albums</button>

        {/*
          Print all entries in data array

        */}
        {data.map(entry => (
          <p>{entry.artist} - {entry.album} ({entry.year.substring(0, 4)})</p>
        ))}
      </section>
      <section className="search-section">
        <form onSubmit={handleSearch}>
          <div className="artist">
            <label>
              <input
                type="radio"
                value="artist"
                checked={searchCriteria === "artist"}
                onChange={onValueChange}
              />
              Artist
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="album"
                checked={searchCriteria === "album"}
                onChange={onValueChange}
              />
              Album
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="genre"
                checked={searchCriteria === "genre"}
                onChange={onValueChange}
              />
              Genre
            </label>
          </div>
          <div>
            <input
              type="text"
              name="search"
              placeholder="search terms"
              value={searchValue}
              onChange={handleSearchChange} />
          </div>
          <button type="button" onClick={handleSearch}>Search</button>
        </form>
        {searchResults.map(entry => (
          <p>{entry.artist} - {entry.album} ({entry.year.substring(0, 4)})</p>
        ))}
      </section>
    </div>
  )

}