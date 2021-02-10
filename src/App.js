import { useState, useRef } from "react";
import './styles/app.scss'
//Components
import Player from "./components/Player";
import Song from "./components/Song";
import Album from "./components/Album";
import Nav from "./components/Nav";

//Util
import data from "./util"

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] =useState(false)
  const [albumToggle, setAlbumToggle] =useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage:0,
  })

  const timeUpdateHandler = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const animationPercentage = Math.round(currentTime / duration *100)
    setSongInfo({...songInfo, currentTime, duration, animationPercentage});
  }
  const songEndHandler = async () => {
    await setCurrentSong(songs[currentSong.id % 7])
    if (isPlaying) audioRef.current.play()
  }
  return (
    <div className={`App ${albumToggle? "album-active":""}`}>
      <Nav albumToggle={albumToggle} setAlbumToggle={setAlbumToggle} />
      <Song currentSong={currentSong} />
      <Player 
        songs={songs}
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef} 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}/>
      <Album 
        albumToggle={albumToggle}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} 
        audioRef={audioRef}
        songs={songs} 
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}/>   
      <audio 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler} 
        onEnded={songEndHandler}
        ref={audioRef} 
        src={currentSong.audio} /> 
    </div>
  );
}

export default App;
