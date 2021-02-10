import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl} from "@fortawesome/free-solid-svg-icons"

const Nav = ({albumToggle, setAlbumToggle}) => {
  return ( 
    <nav>
      <h1>KIDS SEE GHOSTS</h1>
      <button onClick={() => setAlbumToggle(!albumToggle)}>
        <FontAwesomeIcon icon={faRecordVinyl}  />
        {"  Album"}
      </button>
    </nav>
   );
}
 
export default Nav;