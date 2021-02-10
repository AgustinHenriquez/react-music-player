import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";


const Player = ({ currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo }) => {
  useEffect(()=>{
    const newSongs = songs.map((song) => {
      if(song.id === currentSong.id) {
        return{
          ...song,
          active:true,
        }
      }else{
        return{
          ...song,
          active:false,
        }
      }
    })
    setSongs(newSongs)
  }, [currentSong])
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }else{
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const dragHandler = (event) => {
    const currentTime = event.target.value;
    audioRef.current.currentTime = currentTime
    setSongInfo({...songInfo, currentTime})
  }

  const holdDownHandler = () => {
    audioRef.current.pause();
  }

  const holdUpHandler = () => {
    if(isPlaying){
      audioRef.current.play();
    }
  }

  const skipTrackHandler = async (direction) => {
    if (direction === "skip-back" && currentSong.id>1) {
      await setCurrentSong(songs[currentSong.id-2])
    }else if(direction === "skip-forward"){
      await setCurrentSong(songs[currentSong.id % 7])
    }
    if (isPlaying) audioRef.current.play()
  };

  const formatTime = (time) => {
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }
  //Add styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }

  return ( 
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div className="track">
          <input 
            onChange={dragHandler} 
            onMouseDown={holdDownHandler}
            onMouseUp={holdUpHandler}
            min={0} 
            max={songInfo.duration} 
            value={songInfo.currentTime || 0} 
            type="range"/>
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        
        <p>{songInfo.duration? formatTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-back" 
          size="2x"
          icon={faAngleLeft} /> 
        <FontAwesomeIcon 
          onClick={playSongHandler} 
          className="play" 
          size="2x"
          icon={ isPlaying ? faPause : faPlay}  />
        <FontAwesomeIcon 
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward" 
          size="2x"
          icon={faAngleRight} /> 
      </div>
    </div>
   );
}
 
export default Player;