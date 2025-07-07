import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  ClickAwayListener, // Vẫn giữ ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State cho Mobile Search Overlay
  const [isMobileSearchOverlayOpen, setIsMobileSearchOverlayOpen] = useState(false);

  // State cho Desktop Search Dropdown
  const [isDesktopSearchDropdownOpen, setIsDesktopSearchDropdownOpen] = useState(false);
  // Không cần searchInputRef nếu không dùng Popper để neo

  const handleOpenMobileSearch = () => {
    setIsMobileSearchOverlayOpen(true);
  };

  const handleCloseMobileSearch = () => {
    setIsMobileSearchOverlayOpen(false);
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

              <IconButton
                color="inherit"
                aria-label="search"
                className="mobile-search-icon"
                onClick={handleOpenMobileSearch}
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </>
          ) : (
            <>
              {/* Desktop View */}
              {/* Box này sẽ là container relative cho dropdown */}
              <Box className="search-container-desktop"> 
                <ClickAwayListener onClickAway={handleCloseDesktopSearchDropdown}>
                  <div 
                    className={`search-wrapper-desktop ${isDesktopSearchDropdownOpen ? 'dropdown-open' : ''}`}
                  > 
                    <div className="search-icon-wrapper">
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Bạn muốn nghe gì"
                      inputProps={{ 'aria-label': 'search' }}
                      className="styled-input-base"
                      onFocus={handleOpenDesktopSearchDropdown}
                    />

                    {isDesktopSearchDropdownOpen && <SearchDropdown />}
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
      <SearchOverlay open={isMobileSearchOverlayOpen} onClose={handleCloseMobileSearch} />
    </>
  );
};

export default Header;