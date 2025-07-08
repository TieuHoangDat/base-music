// src/components/SearchOverlay/SearchOverlay.tsx
import React from 'react';
import { Box, Button, InputBase, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchOverlay.scss';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const trendingSearches = [
  'Playlist mới',
  'My Song',
  'sơn tùng',
  '11111111',
  'Lao Song',
  'MONO - \'Ôm Em Thật Lâu\' (...',
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  if (!open) {
    return null; // Không render gì nếu không mở
  }

  return (
    <Box className="search-overlay">
      <Box className="search-overlay-header">
        <Box className="search-input-wrapper">
          <SearchIcon className="search-overlay-icon" />
          <InputBase
            placeholder="Tìm kiếm"
            inputProps={{ 'aria-label': 'tìm kiếm' }}
            className="search-overlay-input"
            autoFocus // Tự động focus vào input khi mở
          />
        </Box>
        <Button onClick={onClose} className="cancel-button">
          Hủy
        </Button>
      </Box>

      <Box className="search-content">
        <Typography variant="h6" className="section-title">
          Tìm kiếm xu hướng
        </Typography>
        <List className="trending-list">
          {trendingSearches.map((item, index) => (
            <ListItem key={index} className="trending-list-item">
              <Typography variant="body1" className="trending-item-number">{index + 1}</Typography>
              <ListItemText primary={item} className="trending-item-text" />
            </ListItem>
          ))}
        </List>

        <Divider className="search-divider" />

        <Typography variant="h6" className="section-title">
          Lịch sử tìm kiếm
        </Typography>
        <Typography variant="body2" className="no-history-text">
          Không có lịch sử tìm kiếm nào.
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchOverlay;