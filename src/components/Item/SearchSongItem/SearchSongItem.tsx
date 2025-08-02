import React, { useState } from 'react'; // Import useState
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Import icon trái tim
import { Song } from '../../../types/song';
import { useDispatch } from 'react-redux';
import { playNewSong, PlayingSong } from '../../../redux/slices/musicPlayerSlice';

import './SearchSongItem.scss';

interface SearchSongItemProps {
  song: Song;
  index: number;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const SearchSongItem: React.FC<SearchSongItemProps> = ({ song, index }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false); // State để kiểm soát hover

  const handlePlayClick = () => {
    const songToPlay: PlayingSong = {
      id: song.id,
      image: song.images.DEFAULT || song.images.SMALL,
      title: song.name,
      artist: song.artists.map(artist => artist.name).join(' / '),
      song: song.audios[0]?.url || '',
      duration: song.duration.toString(),
    };
    dispatch(playNewSong({
      song: songToPlay,
      playlist: [],
    }));
  };

  return (
    <Box
      className="search-song-item"
      onMouseEnter={() => setIsHovered(true)} // Đặt isHovered thành true khi chuột vào
      onMouseLeave={() => setIsHovered(false)} // Đặt isHovered thành false khi chuột rời đi
    >
      <Box className="item-info-left" onClick={handlePlayClick}> {/* Chỉ click vào phần này để phát nhạc */}
        <div className="item-index-wrapper"> {/* Thêm wrapper để chứa số thứ tự và nút play khi hover */}
          {isHovered ? (
            <IconButton className="play-button-overlay" size="small" onClick={(e) => { e.stopPropagation(); handlePlayClick(); }}>
              <PlayArrowIcon />
            </IconButton>
          ) : (
            <Typography className="item-index">{index + 1}</Typography>
          )}
        </div>
        <div className="item-thumbnail-wrapper">
          <img src={song.images.SMALL || song.images.DEFAULT} alt={song.name} className="item-thumbnail" />
        </div>
        <Box className="item-text-details">
          <Typography className="item-title">{song.name}</Typography>
          <Typography className="item-artists">
            {song.artists.map(artist => artist.name).join(' / ')}
          </Typography>
        </Box>
      </Box>
      <Box className="item-info-right">
        {song.playlists && song.playlists.length > 0 && (
          <Typography className="item-album-playlist">
            {song.playlists[0].name}
          </Typography>
        )}
        <Box className="item-actions"> {/* Container cho thời lượng và các icon */}
          {isHovered ? (
            <>
              <IconButton className="item-action-icon" size="small" onClick={(e) => e.stopPropagation()}>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton className="item-action-icon" size="small" onClick={(e) => e.stopPropagation()}>
                <MoreHorizIcon />
              </IconButton>
            </>
          ) : (
            <Typography className="item-duration">{formatDuration(song.duration)}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchSongItem;