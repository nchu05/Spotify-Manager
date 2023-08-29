import React from 'react';
import {Link} from 'react-router-dom';

const SongCard = (props) => {
    return (
        <div className="movie" key={props.album.id}>     
        <Link to={props.album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
        <div>
            <h3>{props.album.artists[0].name}</h3>

            </div>

            <div>
                {props.album.images.length ? <img src={props.album.images[0].url} alt=""/> : <div>No Image</div>}
            </div>

            <div>
            <h3>{props.album.name}</h3>

            </div>
        </Link>
        </div>
    )
}

export default SongCard;