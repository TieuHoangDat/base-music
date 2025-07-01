import React from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss'; // Import the SCSS file

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="header-toolbar">
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuToggle}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* Search Bar */}
        <Box className="search-container">
          <div className="search-wrapper">
            <div className="search-icon-wrapper">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Bạn muốn nghe gì"
              inputProps={{ 'aria-label': 'search' }}
              className="styled-input-base"
            />
          </div>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;