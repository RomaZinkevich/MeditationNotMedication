import React, {useState, useRef, useEffect} from "react";
import {PauseIcon, PlayIcon, SeekIcon} from "../components/logos";

const AudioPlayer = ({src}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioElement.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("durationchange", handleDurationChange);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("durationchange", handleDurationChange);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleSeekForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleSeekBehind = () => {
    const newTime = Math.min(currentTime - 10, duration);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeSliderChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  return (
    <div>
      <audio ref={audioRef}>
        <source src={src}/>
      </audio>
      <div className="player-ui">
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleTimeSliderChange}
        />
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        <div className="controls">
          <button onClick={handleSeekBehind}>{<SeekIcon flag={true}/>}</button>
          <button onClick={togglePlay}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
          <button onClick={handleSeekForward}>{<SeekIcon />}</button>
        </div>
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default AudioPlayer;
