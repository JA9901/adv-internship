import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./PlayerLanding.css";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa";
import Skeleton from "../ui/Skeleton/Skeleton";

function PlayerLanding() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const progressRef = useRef();
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playAnimationRef = useRef();
  const [progress, setProgress] = useState(0);
  const progressBarStyle = {
    background: `linear-gradient(
      to right,
      rgb(43, 217, 124) ${progress}%,
      rgb(109, 120, 125) ${progress}%
    )`,
  };

  async function getBookDetails() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );

    setBook(data);
  }

  function togglePlaying() {
    setPlaying((prev) => !prev);
  }

  function progressChange(event) {
    setProgress(parseFloat(event.target.value));
    audioRef.current.currentTime =
      audioRef.current.duration * (progressRef.current.value / 100);
  }

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
    setTime(audioRef.current.currentTime);
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  }

  const repeat = useCallback(() => {
    const currentTime = audioRef?.current?.currentTime || 0;
    setTime(currentTime);
    setProgress((currentTime / audioRef?.current?.duration) * 100 || 0);
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, setTime]);

  function forward10() {
    audioRef.current.currentTime += 10;
  }

  function backward10() {
    audioRef.current.currentTime -= 10;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookDetails();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef?.current?.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [playing, audioRef, repeat]);

  return (
    <>
      {!loading ? (
        <div className="player__wrapper">
          <div className="player__summary">
            <div className="player__summary--title">{book.title}</div>
            <div className="player__summary--text">{book.summary}</div>
          </div>

          <div className="audio__wrapper">
            <audio
              src={book.audioLink}
              ref={audioRef}
              onLoadedMetadata={onLoadedMetadata}
            />
            <div className="audio__track--wrapper">
              <figure className="audio__img--wrapper">
                <img src={book.imageLink} alt="" className="audio__img" />
              </figure>
              <div className="audio__track--details">
                <div className="audio__track--title">{book.title}</div>
                <div className="audio__track--author">{book.author}</div>
              </div>
            </div>

            <div className="audio__controls--wrapper">
              <div className="audio__controls">
                <button className="audio__controls--btn" onClick={backward10}>
                  <TbRewindBackward10 />
                </button>
                <button
                  className="audio__controls--btn audio__controls--play"
                  onClick={togglePlaying}
                >
                  {playing ? <FaPause /> : <FaPlay />}
                </button>
                <button className="audio__controls--btn" onClick={forward10}>
                  <TbRewindForward10 />
                </button>
              </div>
            </div>

            <div className="audio__progress--wrapper">
              <div className="audio__time">{formatTime(time)}</div>
              <input
                type="range"
                className="audio__progress--bar"
                ref={progressRef}
                value={progress}
                onChange={progressChange}
                style={progressBarStyle}
              />
              <div className="audio__time">{formatTime(duration)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="player__landing--loading">
          <Skeleton width="400px" height="40px" />
          <Skeleton width="600px" height="200px" />
          <Skeleton width="400px" height="100px" />
          <Skeleton width="600px" height="200px" />
        </div>
      )}
    </>
  );
}

export default PlayerLanding;