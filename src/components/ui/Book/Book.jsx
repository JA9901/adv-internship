import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Book.css";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";

function Book({ book }) {
  const [premium, setPremium] = useState(false);
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

  useEffect(() => {
    if (book.subscriptionRequired === true) {
      setPremium(true);
    }
  }, [book.subscriptionRequired]);

  return (
    <Link to={`/book/${book.id}`} className="book__anchor">
      <audio
        src={book.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      {premium && (
        <div className="premium__wrapper">
          <div className="premium__text">Premium</div>
        </div>
      )}

      <figure className="book__image--wrapper">
        <img src={book.imageLink} alt="" className="book__image" />
      </figure>
      <div className="book__title">{book.title}</div>
      <div className="book__author">{book.author}</div>
      <div className="book__subtitle">{book.subTitle}</div>
      <div className="book__details--wrapper">
        <div className="book__details">
          <div className="book__details--icon">
            <AiOutlineClockCircle />
          </div>
          <div className="book__details--text">{formatTime(duration)}</div>
        </div>
        <div className="book__details">
          <div className="book__details--icon">
            <AiOutlineStar />
          </div>
          <div className="book__details--text">{book.averageRating}</div>
        </div>
      </div>
    </Link>
  );
}

export default Book;