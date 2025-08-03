// src/components/SearchOverlay/SearchOverlay.tsx
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Box, Button, InputBase, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchOverlay.scss';

interface SearchOverlayProps {
  open: boolean;
  onClose: (keyword?: string) => void; // Thay đổi kiểu dữ liệu để chấp nhận từ khóa
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
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // State để lưu từ khóa tìm kiếm

  if (!open) {
    return null; // Không render gì nếu không mở
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    // Gọi onClose và truyền từ khóa tìm kiếm nếu có
    onClose(searchKeyword);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box className="search-overlay">
      <Box className="search-overlay-header">
        <Box className="search-input-wrapper">
          <SearchIcon 
            className="search-overlay-icon" 
            onClick={handleSearch} // Thêm xử lý click cho icon tìm kiếm
            style={{ cursor: 'pointer' }} // Thêm style để hiển thị con trỏ khi di chuột
          />
          <InputBase
            placeholder="Tìm kiếm"
            inputProps={{ 'aria-label': 'tìm kiếm' }}
            className="search-overlay-input"
            autoFocus // Tự động focus vào input khi mở
            value={searchKeyword} // Liên kết giá trị với state
            onChange={handleInputChange} // Xử lý sự kiện thay đổi input
            onKeyPress={handleKeyPress} // Xử lý sự kiện nhấn phím
          />
        </Box>
        <Button onClick={() => onClose()} className="cancel-button"> {/* Đảm bảo gọi onClose không có tham số khi hủy */}
          Hủy
        </Button>
      </Box>

      <Box className="search-content">
        <Typography variant="h6" className="section-title">
          Tìm kiếm xu hướng
        </Typography>
        <List className="trending-list">
          {trendingSearches.map((item, index) => (
            <ListItem 
              key={index} 
              className="trending-list-item" 
              onClick={() => onClose(item)} // Khi click vào mục xu hướng, thực hiện tìm kiếm
              style={{ cursor: 'pointer' }} // Thêm style để hiển thị con trỏ khi di chuột
            >
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