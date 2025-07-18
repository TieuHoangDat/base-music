import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import NowPlayingBar from '../../components/NowPlayingBar/NowPlayingBar';
import '../../styles/global.scss';

// Import Redux
import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

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
    <Provider store={store}> {/* Bọc toàn bộ ứng dụng trong Redux Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Bọc bằng PersistGate */}
        <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#121212',
            color: '#fff',
            position: 'relative',
            overflowX: 'hidden',
            paddingBottom: '90px', // Thêm padding dưới cùng để tạo không gian cho thanh phát nhạc
          }}
        >
          <CssBaseline />

          <Box
            className="orange-gradient-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '300px',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Sidebar
              isOpen={sidebarOpen}
              onClose={handleDrawerToggle}
              isMobile={isMobile}
            />
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              pt: 1,
              ml: { md: 28 },
              width: { xs: '100%', md: `calc(100% - 250px)` },
              position: 'relative',
              zIndex: 2,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 90px)',
            }}
            className="hide-scrollbar"
          >
            <Header onMenuToggle={handleDrawerToggle} />

            <Container maxWidth="xl" sx={{ mt: 2, mb: 10 }}>
              {children}
            </Container>
          </Box>

          <NowPlayingBar />
        </Box>
      </PersistGate>
    </Provider>
  );
};

export default HomeLayout;