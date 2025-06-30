import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AppsIcon from '@mui/icons-material/Apps';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const sidebarItems = [
  { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
  { text: 'Bảng xếp hạng', icon: <BarChartIcon />, path: '/ranking' },
  { text: 'Chủ đề và thể loại', icon: <AppsIcon />, path: '/genres' },
  { text: 'Thư viện', icon: <LibraryMusicIcon />, path: '/library' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();

  // The main content of the sidebar
  const drawerContent = (
    <Box
      className="sidebar-drawer-content flex flex-col h-full"
      sx={{
        // Make this container the positioning context for the overlay
        position: 'relative',
      }}
    >
      {/* === START: Sidebar Gradient Overlay === */}
      {/* This Box will be a full-height, full-width overlay */}
      <Box
        className="sidebar-gradient-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0, // Place it behind the content
          pointerEvents: 'none', // Allow clicks to pass through
        }}
      />
      {/* === END: Sidebar Gradient Overlay === */}

      {/* Sidebar Content Wrapper with a higher z-index */}
      <Box sx={{ position: 'relative', zIndex: 1, p: 2 }}>
        {/* Logo */}
        <Box className="sidebar-logo-container flex items-center gap-2 p-4 mb-4">
          <img src="/path/to/laomusic-logo.svg" alt="Lao Music Logo" className="w-10 h-10" />
          <Typography variant="h5" component="div" className="sidebar-logo-text">
            Laomusic
          </Typography>
        </Box>

        {/* Menu Items */}
        <List component="nav">
          {sidebarItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              className={clsx('sidebar-list-item', {
                'sidebar-list-item--active': location.pathname === item.path,
              })}
            >
              <ListItemIcon className="sidebar-icon">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        {/* Placeholder for future sections, like playlists, etc. */}
        <Box className="flex-grow" />
        
        {/* Example of another section */}
        <Box className="sidebar-footer">
          <Typography variant="body2" className="sidebar-footer-text">
            © 2024 Laomusic
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      className="sidebar-drawer-mobile"
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      open
      className="sidebar-drawer-desktop"
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;