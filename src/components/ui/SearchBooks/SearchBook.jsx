import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
import "./SearchBook.css";
import { AiOutlineClockCircle } from "react-icons/ai";

function SearchBook({ book }) {
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  }

  function onLoadedMetadata() {
    setDuration(audioRef.current.duration);
  }
  return (
    // not sure why link doesnt work properly
    // <Link to={`/book/${book.id}`} className="search__book--anchor">
    <a href={`/book/${book.id}`} className="search__book--anchor">
      <audio
        src={book.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <figure className="search__img--wrapper">
        <img src={book.imageLink} alt="" className="search__book--img" />
      </figure>
      <div className="search__book--wrapper">
        <div className="search__book--title">{book.title}</div>
        <div className="search__book--author">{book.author}</div>
        <div className="book__details--wrapper">
          <div className="book__details">
            <div className="book__details--icon">
              <AiOutlineClockCircle />
            </div>
            <div className="book__details--text">{formatTime(duration)}</div>
          </div>
        </div>
      </div>
    </a>
    // </Link>
  );
}

export default SearchBook;