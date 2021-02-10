import cover from "../album/cover.jpg"


const AlbumSong = ({ song, songs, setSongs, setCurrentSong, audioRef, setIsPlaying, isPlaying }) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song)

    const newSongs = songs.map((item) => {
      if(song.id === item.id) {
        return{
          ...item,
          active:true,
        }
      }else{
        return{
          ...item,
          active:false,
        }
      }
    })
    await setSongs(newSongs)
    if (isPlaying) audioRef.current.play();
  }

  return ( 
    <div onClick={songSelectHandler} className={`album-song ${song.active ? 'selected':''}`}>
      <img src={cover} alt="Cover"/>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
    
   );
}
 
export default AlbumSong;