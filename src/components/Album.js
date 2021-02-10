import AlbumSong from "./AlbumSong.js";

const Album = ({songs, setSongs, setCurrentSong, audioRef, albumToggle, setIsPlaying, isPlaying}) => {
  return ( 
    <div className={`album ${albumToggle? "active":""}`}>
      <div className="title">
        <h2>Tracks</h2>
      </div>
      
      <div className="album-songs">
        {songs.map(song => (
        <AlbumSong 
          setIsPlaying={setIsPlaying} 
          isPlaying={isPlaying} 
          audioRef={audioRef}
          song={song} 
          songs={songs} 
          setSongs={setSongs}
          setCurrentSong={setCurrentSong} 
          key={song.id}/>
        ))}
      </div>
    </div>
   );
}
 
export default Album;