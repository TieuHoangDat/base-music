import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import NowPlayingBar from '../../components/NowPlayingBar/NowPlayingBar';
import '../../styles/global.scss';

// Import Redux
import { Provider, useSelector } from 'react-redux';
import { store, persistor, RootState } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const currentSong = useSelector((state: RootState) => state.musicPlayer.currentSong);
  const nowPlayingBarHeight = currentSong ? '90px' : '0px';

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#121212',
            color: '#fff',
            position: 'relative',
            overflowX: 'hidden',
            paddingBottom: nowPlayingBarHeight,
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
              pt: 1, // Để lại pt cho padding trên của toàn bộ main box, sau đó bỏ padding trên của phần cuộn
              ml: { md: 28 },
              width: { xs: '100%', md: `calc(100% - 250px)` },
              position: 'relative',
              zIndex: 2,
              display: 'flex', // VỊ TRÍ SỬA THỨ NHẤT: Thêm display flex
              flexDirection: 'column', // VỊ TRÍ SỬA THỨ HAI: Thêm flexDirection column
              // Loại bỏ overflowY và maxHeight ở đây
            }}
            className="hide-scrollbar"
          >
            {/* VỊ TRÍ SỬA THỨ BA: Header được giữ nguyên ở ngoài phần cuộn */}
            <Header onMenuToggle={handleDrawerToggle} />

            {/* VỊ TRÍ SỬA THỨ TƯ: Thêm một Box mới để chứa nội dung có thể cuộn */}
            <Box
              sx={{
                flexGrow: 1, // Cho phép Box này chiếm hết không gian còn lại
                overflowY: 'auto', // Áp dụng cuộn ở đây
                maxHeight: `calc(100vh - ${nowPlayingBarHeight} - 64px)`, // Giảm chiều cao của Header (giả sử Header cao 64px)
                // Lưu ý: nếu header có chiều cao động, bạn cần tính toán động hơn hoặc đặt chiều cao cố định
                // pt: 1, // Loại bỏ padding top ở đây nếu đã có ở main Box
              }}
              className="hide-scrollbar" // Áp dụng hide-scrollbar cho box này
            >
              <Container maxWidth="xl" sx={{ mt: 2, mb: 10 }}>
                {children}
              </Container>
            </Box>
          </Box>

          <NowPlayingBar />
        </Box>
      </PersistGate>
    </Provider>
  );
};

export default HomeLayout;