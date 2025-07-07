import React from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
import './SearchDropdown.scss';

interface SearchDropdownProps {
  // Bạn có thể thêm prop onClose nếu bạn muốn có nút đóng trong dropdown,
  // nhưng ClickAwayListener thường là đủ cho trường hợp này.
}

const trendingSuggestions = [
  'Playlist mới',
  'My Song',
  'sơn tùng',
  '11111111',
  'Lao Song',
  'MONO - \'Ôm Em Thật Lâu\'...',
];

const SearchDropdown: React.FC<SearchDropdownProps> = () => {
  const searchHistory: string[] = []; // Dữ liệu thật sẽ được fetch từ state/API

  return (
    <Box className="search-dropdown-container">
      <Typography variant="subtitle1" className="dropdown-section-title">
        Tìm kiếm xu hướng
      </Typography>
      <Box className="trending-tags-container">
        {trendingSuggestions.map((tag, index) => (
          <Button key={index} variant="outlined" className="trending-tag-button">
            {tag}
          </Button>
        ))}
      </Box>

      <Typography variant="subtitle1" className="dropdown-section-title">
        Lịch sử tìm kiếm
      </Typography>
      {searchHistory.length > 0 ? (
        <List className="search-history-list">
          {searchHistory.map((item, index) => (
            <ListItem key={index} className="search-history-item">
              <Typography variant="body2">{item}</Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" className="no-history-text">
          Không có lịch sử tìm kiếm nào.
        </Typography>
      )}
    </Box>
  );
};

export default SearchDropdown;