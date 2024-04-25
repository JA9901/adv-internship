import React, { useEffect, useRef, useState } from "react";
import "./ForYouLanding.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForYouLanding.css";
import Book from "../ui/Book/Book";
import BookLoading from "../ui/BookLoading/BookLoading";
import Skeleton from "../ui/Skeleton/Skeleton";
import { FaPlay } from "react-icons/fa";

function ForYouLanding() {
  const [selectedBook, setSelectedBook] = useState({});
  const [recommendedBooks, setRecommended] = useState([]);
  const [suggestedBooks, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes} mins ${formatSeconds} seconds`;
    }
    return "00:00";
  }

  function onLoadedMetadata() {
    setDuration(audioRef.current.duration);
  }

  async function getSelectedBook() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );

    const bookData = data[0];
    setSelectedBook(bookData);
  }

  async function getRecommendedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );

    setRecommended(data);
  }

  async function getSuggestedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );

    setSuggested(data);
  }

  useEffect(() => {
    getSelectedBook();
    getRecommendedBooks();
    getSuggestedBooks();
    setLoading(false);
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="foryou__wrapper">
          <div className="foryou__title">Selected just for you</div>

          {!loading && Object.keys(selectedBook).length > 0 ? (
            <Link to={`/book/${selectedBook.id}`} className="selected__book">
              <audio
                src={selectedBook.audioLink}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
              />
              <div className="selected__subtitle">{selectedBook.subTitle}</div>
              <div className="selected__line"></div>
              <div className="selected__content">
                <figure className="book__image--wrapper selected__image--wrapper">
                  <img
                    src={selectedBook.imageLink}
                    alt=""
                    className="book__image"
                  />
                </figure>
                <div className="selected__text">
                  <div className="selected__title">{selectedBook.title}</div>
                  <div className="selected__author">{selectedBook.author}</div>
                  <div className="selected__duration--wrapper">
                    <div className="selected__duration--icon">
                      <FaPlay />
                    </div>
                    <div className="selected__duration">
                      {formatTime(duration)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <>
              <Skeleton width="400px" height="200px" />
            </>
          )}

          <>
            <div className="foryou__title">Recommended for you</div>
            <div className="foryou__subtitle">We think you'll like these</div>
            <div className="books__container">
              {!loading && recommendedBooks.length > 0 ? (
                <>
                  {recommendedBooks.map((book) => (
                    <Book book={book} key={book.id} />
                  ))}
                </>
              ) : (
                <>
                  {new Array(5).fill(0).map((_, index) => (
                    <BookLoading key={index} />
                  ))}
                </>
              )}
            </div>
          </>

          <>
            <div className="foryou__title">Suggested books</div>
            <div className="foryou__subtitle">Browse these books</div>
            <div className="books__container">
              {!loading && suggestedBooks.length > 0 ? (
                <>
                  {suggestedBooks.map((book) => (
                    <Book book={book} key={book.id} />
                  ))}
                </>
              ) : (
                <>
                  {new Array(5).fill(0).map((_, index) => (
                    <BookLoading key={index} />
                  ))}
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default ForYouLanding;