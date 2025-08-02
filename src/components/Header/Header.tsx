import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.scss';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // State cho Mobile Search Overlay
  const [isMobileSearchOverlayOpen, setIsMobileSearchOverlayOpen] = useState(false);
  // State cho Desktop Search Dropdown
  const [isDesktopSearchDropdownOpen, setIsDesktopSearchDropdownOpen] = useState(false);
  
  // State chung để lưu trữ từ khóa tìm kiếm
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleSearch = (keyword: string) => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
      // Đóng dropdown/overlay sau khi tìm kiếm
      setIsDesktopSearchDropdownOpen(false);
      setIsMobileSearchOverlayOpen(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchKeyword);
    }
  };

  const handleOpenMobileSearch = () => {
    setIsMobileSearchOverlayOpen(true);
  };

  const handleCloseMobileSearch = (keywordFromOverlay?: string) => {
    setIsMobileSearchOverlayOpen(false);
    // Nếu có từ khóa từ overlay, thực hiện tìm kiếm
    if (keywordFromOverlay) {
        setSearchKeyword(keywordFromOverlay); // Cập nhật searchKeyword để nó hiển thị trên input nếu cần
        handleSearch(keywordFromOverlay);
    }
  };

  const handleOpenDesktopSearchDropdown = () => {
    setIsDesktopSearchDropdownOpen(true);
  };

  const handleCloseDesktopSearchDropdown = () => {
    setIsDesktopSearchDropdownOpen(false);
  };

  return (
    <>
      <AppBar position="static" className="header-appbar">
        <Toolbar className="header-toolbar">
          {isMobile ? (
            <>
              {/* Mobile View */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onMenuToggle}
                className="menu-button"
              >
                <MenuIcon />
              </IconButton>

              <Box className="mobile-logo-container">
                <img src="/image/logo.png" alt="Lao Music Logo" className="mobile-logo" />
              </Box>

              {/* Thay đổi icon tìm kiếm thành nút thực hiện tìm kiếm */}
              <IconButton
                color="inherit"
                aria-label="search"
                className="mobile-search-icon"
                onClick={handleOpenMobileSearch} // Vẫn mở overlay
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </>
          ) : (
            <>
              {/* Desktop View */}
              <Box className="search-container-desktop"> 
                <ClickAwayListener onClickAway={handleCloseDesktopSearchDropdown}>
                  <div 
                    className={`search-wrapper-desktop ${isDesktopSearchDropdownOpen ? 'dropdown-open' : ''}`}
                  > 
                    <div className="search-icon-wrapper">
                      {/* Nút tìm kiếm cho desktop */}
                      <IconButton 
                        color="inherit" 
                        aria-label="search" 
                        onClick={() => handleSearch(searchKeyword)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </div>
                    <InputBase
                      placeholder="Bạn muốn nghe gì"
                      inputProps={{ 'aria-label': 'search' }}
                      className="styled-input-base"
                      value={searchKeyword} // Bind giá trị từ state
                      onChange={handleInputChange} // Xử lý thay đổi input
                      onFocus={handleOpenDesktopSearchDropdown}
                      onKeyPress={handleInputKeyPress} // Xử lý Enter key
                    />

                    {isDesktopSearchDropdownOpen && <SearchDropdown/>} {/* Truyền searchKeyword vào SearchDropdown nếu cần */}
                  </div>
                </ClickAwayListener>
              </Box>
              
              {/* Right side icons/buttons */}
              <Box className="flex items-center gap-2">
                <IconButton className="icon-circle">
                  <SettingsIcon />
                </IconButton>
                <Box className="divider-vertical" />
                <Button variant="contained" className="login-button">
                  Đăng nhập
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Search Overlay */}
      {/* Truyền callback để nhận từ khóa từ overlay */}
      <SearchOverlay open={isMobileSearchOverlayOpen} onClose={handleCloseMobileSearch} />
    </>
  );
};

export default Header;