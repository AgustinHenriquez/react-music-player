import cover from "../album/cover.jpg"

const Song = ({currentSong}) => {
  return ( 
    <div className="song-container">
      <img src={cover} alt="Cover"/>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
    
   );
}
 
export default Song;