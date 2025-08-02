// src/components/SongCard/SongCard.tsx
import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Thêm icon menu ba chấm

// Định nghĩa props mà SongCard sẽ nhận
interface SongCardProps {
  id: string;
  image: string; // URL ảnh bìa
  title: string; // Tên bài hát
  artist: string; // Tên nghệ sĩ
  song: string; // URL file nhạc (mp3)
  duration: string; // Thời lượng bài hát (có thể là chuỗi "MM:SS")
  // Bạn có thể thêm các props khác nếu cần, ví dụ: onClick để phát nhạc, onMenuClick cho menu tùy chọn
}

const SongCard: React.FC<SongCardProps> = ({ id, image, title, artist, song, duration }) => {
  // Hàm xử lý khi click vào nút play (ví dụ)
  const handlePlayClick = () => {
    console.log(`Phát bài hát: ${title} - ${artist}`);
    // Tại đây, bạn sẽ gọi một action Redux hoặc context để thêm bài hát vào trình phát nhạc
    // Ví dụ: dispatch(playSong({ id, title, artist, song, image }));
  };

  // Hàm xử lý khi click vào nút menu ba chấm
  const handleMenuClick = () => {
    console.log(`Mở menu cho bài hát: ${title}`);
    // Tại đây, bạn có thể mở một popover hoặc dialog với các tùy chọn (thêm vào playlist, chia sẻ, v.v.)
  };

  return (
    <Card
      sx={{
        backgroundColor: '#1C1C1C', // Màu nền tối hơn cho card
        borderRadius: '8px',
        color: '#fff',
        position: 'relative',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#282828', // Thay đổi màu khi hover
          '.play-button': {
            opacity: 1, // Hiển thị nút play khi hover
            transform: 'translateY(0)',
          },
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Đảm bảo các card có chiều cao bằng nhau trong Grid
      }}
    >
      <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden' }}> {/* Đảm bảo ảnh vuông */}
        <CardMedia
          component="img"
          image={image || '/image/default-song-cover.png'} // Ảnh mặc định nếu không có
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0', // Bo tròn góc trên
          }}
        />
        <IconButton
          className="play-button"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: '#1DB954', // Màu xanh lá đặc trưng của Spotify
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1ED760',
              transform: 'scale(1.05)',
            },
            opacity: 0, // Mặc định ẩn
            transform: 'translateY(10px)', // Bắt đầu từ dưới một chút
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            p: 1.5, // Kích thước nút
          }}
          onClick={handlePlayClick}
          aria-label="play"
        >
          <PlayArrowIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1, pt: 1.5 }}>
        <Typography
          variant="subtitle1"
          component="div"
          noWrap
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '1rem',
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{
            color: '#B3B3B3',
            fontSize: '0.875rem',
            mt: 0.5,
          }}
        >
          {artist}
        </Typography>
      </CardContent>
      {/* Nút menu ba chấm ở góc trên bên phải của card (tùy chọn) */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#B3B3B3',
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          opacity: 0, // Mặc định ẩn
          transition: 'opacity 0.3s ease',
          '.MuiCard-root:hover &': { // Hiển thị khi hover vào card
            opacity: 1,
          },
        }}
        onClick={handleMenuClick}
        aria-label="more options"
      >
        <MoreVertIcon />
      </IconButton>
    </Card>
  );
};

export default SongCard;