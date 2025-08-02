import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchSongItem from '../../Item/SearchSongItem/SearchSongItem'; // Đảm bảo đường dẫn đúng
import { Song } from '../../../types/song'; // Import kiểu Song
import './SearchSongList.scss';

interface SearchSongListProps {
  songs: Song[];
}

const SearchSongList: React.FC<SearchSongListProps> = ({ songs }) => {
  if (!songs || songs.length === 0) {
    return (
      <Box className="no-songs-found">
        <Typography>Không tìm thấy bài hát nào.</Typography>
      </Box>
    );
  }

  return (
    <Box className="search-song-list">
      {/* Header cho danh sách */}
      {/* <Box className="list-header">
        <Typography className="header-index">#</Typography>
        <Typography className="header-title">Tiêu đề</Typography>
        <Typography className="header-album-playlist">Album / Playlist</Typography>
        <Typography className="header-duration">Thời lượng</Typography>
      </Box> */}
      {songs.map((song, index) => (
        <SearchSongItem key={song.id} song={song} index={index} />
      ))}
    </Box>
  );
};

export default SearchSongList;