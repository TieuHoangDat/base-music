import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import '../../styles/global.scss'; // Import global styles

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    // Main container with `position: relative` to be the anchor for the absolute overlay
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        position: 'relative', // *** Keep this relative positioning ***
        overflowX: 'hidden',
      }}
    >
      <CssBaseline />
      
      {/* === START: Orange Gradient Overlay ===
        Place this Box as a direct sibling to the sidebar and main content.
      */}
      <Box
        className="orange-gradient-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          zIndex: 1, // A layer between the background and content
          pointerEvents: 'none', // Critical for click-through
        }}
      />
      {/* === END: Orange Gradient Overlay === */}
      
      {/* Sidebar and Main Content Area should have a higher z-index than the overlay.
        Let's explicitly set a z-index for them and their containers.
      */}
      
      {/* Sidebar - z-index 2 */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleDrawerToggle}
          isMobile={isMobile}
        />
      </Box>

      {/* Main Content Area - z-index 2 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 1,
          ml: { md: 28 },
          width: { xs: '100%', md: `calc(100% - 280px)` },
          position: 'relative', // Add relative positioning to this Box too, just in case
          zIndex: 2, // Explicitly set a higher z-index
        }}
        className="overflow-y-auto"
      >
        {/* Header/Navbar */}
        <Header onMenuToggle={handleDrawerToggle} />

        {/* The content from the router (e.g., Home page) */}
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default HomeLayout;