import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { playNewSong, PlayingSong } from '../../../redux/slices/musicPlayerSlice'; // Import PlayingSong type
import './SongItem.scss';

interface SongItemProps {
  id: string;
  image: string;
  title: string;
  artist?: string;
  songUrl: string;
  duration: string;
  // Thêm prop để nhận toàn bộ playlist
  playlist: PlayingSong[]; // <<< THÊM PROP NÀY
}

const SongItem: React.FC<SongItemProps> = ({ id, image, title, artist, songUrl, duration, playlist }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    // Khi phát một bài, gửi cả bài hát và playlist của nó
    dispatch(playNewSong({
      song: { id, image, title, artist, song: songUrl, duration },
      playlist: playlist // <<< TRUYỀN PLAYLIST VÀO ACTION
    }));
  };

  return (
    <div className="song-item" onClick={handlePlayClick}>
      <div className="song-item__image-wrapper">
        <img src={image} alt={title} className="song-item__image" />
        <div className="song-item__overlay">
          <div className="song-item__play-icon"></div>
        </div>
      </div>
      <div className="song-item__info">
        <h3 className="song-item__title">{title}</h3>
        {artist && <p className="song-item__artist">{artist}</p>}
      </div>
    </div>
  );
};

export default SongItem;