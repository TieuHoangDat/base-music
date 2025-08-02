// src/pages/Home/Home.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ListSong from '../../components/ListItem/Song/ListSong';
import ListAlbum from '../../components/ListItem/Album/ListAlbum';
import ListArtist from '../../components/ListItem/Artist/ListArtist';
import ListVideo from '../../components/ListItem/Video/ListVideo';
import './Home.scss';

// Import các hàm API và interfaces
import { getRecommendedSongs, ITransformedSong } from '../../api/songs';
import { getTop100Playlists, ITransformedAlbum } from '../../api/playlists';
import { getFavoriteArtists, ITransformedArtist } from '../../api/artists';
import { getTopGenresPlaylists, IGenreFromApi } from '../../api/genres'; // <-- Import mới này

const Home = () => {
  // Query cho Recommended Songs
  const {
    data: todaySongs,
    isLoading: loadingSongs,
    isError: isErrorSongs,
    error: errorSongs,
  } = useQuery<ITransformedSong[], Error>({
    queryKey: ['recommendedSongs'],
    queryFn: getRecommendedSongs,
  });

  // Query cho Top 100 Playlists/Albums
  const {
    data: newAlbums,
    isLoading: loadingAlbums,
    isError: isErrorAlbums,
    error: errorAlbums,
  } = useQuery<ITransformedAlbum[], Error>({
    queryKey: ['top100Playlists'],
    queryFn: getTop100Playlists,
  });

  // Query cho Favorite Artists
  const {
    data: favoriteArtists,
    isLoading: loadingArtists,
    isError: isErrorArtists,
    error: errorArtists,
  } = useQuery<ITransformedArtist[], Error>({
    queryKey: ['favoriteArtists'],
    queryFn: getFavoriteArtists,
  });

  // --- Query MỚI cho Top Genres Playlists ---
  const {
    data: topGenres, // Dữ liệu sẽ là một mảng các thể loại (genre)
    isLoading: loadingGenres,
    isError: isErrorGenres,
    error: errorGenres,
  } = useQuery<IGenreFromApi[], Error>({
    queryKey: ['topGenresPlaylists'],
    queryFn: getTopGenresPlaylists,
  });
  // --- Kết thúc phần mới ---

  // Dữ liệu mẫu cho danh sách Video Trending (giữ nguyên)
  const youtubeTrendingVideos = [
    {
      id: 'v1',
      image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/5/6/0/8/560868f7aa95b9d3118d0c41031c2a07.jpg',
      title: 'คำถามที่อยู่ข้างหลัง - เบิ้ล ปทุมราช Feat. มีนตรา อินทิรา [Official MV]',
      channel: 'GRAMMY GOLD OFFICIAL',
      views: '2,000,000',
      duration: '5:27',
      isOfficial: true,
      channelAvatar: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/5/6/0/8/560868f7aa95b9d3118d0c41031c2a07.jpg', // Thay bằng URL avatar thật
    },
    {
      id: 'v2',
      image: 'https://media.baoquangninh.vn/dataimages/201707/original/images956394_wiz_khalifa_see_you_again_vid_billboard_1548.jpg',
      title: 'ตัวร้ายไหนที่ว่าแน่ - LALA',
      channel: '19.Official',
      views: '3,370,000',
      duration: '3:37',
      channelAvatar: 'https://cly.1cdn.vn/2015/06/20/congly-vn_seeyouagain28129jpg1434779663.jpg', // Thay bằng URL avatar thật
    },
    {
      id: 'v3',
      image: 'https://media.baoquangninh.vn/dataimages/201707/original/images956394_wiz_khalifa_see_you_again_vid_billboard_1548.jpg',
      title: 'โลกทั้งใบ - เด็ก รั้ว',
      channel: 'Genierock',
      views: '5,000,000',
      duration: '4:18',
      channelAvatar: 'https://cly.1cdn.vn/2015/06/20/congly-vn_seeyouagain28129jpg1434779663.jpg', // Thay bằng URL avatar thật
    },
    {
      id: 'v4',
      image: 'https://media.baoquangninh.vn/dataimages/201707/original/images956394_wiz_khalifa_see_you_again_vid_billboard_1548.jpg',
      title: 'อ้ายชายจากเมืองมุลลัน',
      channel: 'DOKJAN STUDIO',
      views: '1,500,000',
      duration: '5:45',
      channelAvatar: 'https://cly.1cdn.vn/2015/06/20/congly-vn_seeyouagain28129jpg1434779663.jpg', // Thay bằng URL avatar thật
    },
    {
      id: 'v5',
      image: 'https://media.baoquangninh.vn/dataimages/201707/original/images956394_wiz_khalifa_see_you_again_vid_billboard_1548.jpg',
      title: 'ลืมบ่าว (เพิ่มไฟความจุ) - Youd Salavan',
      channel: 'Youd Salavan',
      views: '4,000,000',
      duration: '4:59',
      isOfficial: true,
      channelAvatar: 'https://cly.1cdn.vn/2015/06/20/congly-vn_seeyouagain28129jpg1434779663.jpg', // Thay bằng URL avatar thật
    },
    {
      id: 'v6',
      image: 'https://media.baoquangninh.vn/dataimages/201707/original/images956394_wiz_khalifa_see_you_again_vid_billboard_1548.jpg',
      title: 'Video Hot 6',
      channel: 'Kênh Hot',
      views: '800,000',
      duration: '3:00',
      channelAvatar: 'https://cly.1cdn.vn/2015/06/20/congly-vn_seeyouagain28129jpg1434779663.jpg', // Thay bằng URL avatar thật
    },
  ];

  // Xử lý trạng thái loading và error cho TẤT CẢ các API
  if (loadingSongs || loadingAlbums || loadingArtists || loadingGenres) { // Cập nhật điều kiện loading
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (isErrorSongs || isErrorAlbums || isErrorArtists || isErrorGenres) { // Cập nhật điều kiện error
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        <p>Lỗi khi tải dữ liệu: {errorSongs?.message || errorAlbums?.message || errorArtists?.message || errorGenres?.message || "Không thể tải dữ liệu."}</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden hide-scrollbar container">
      <ListSong title="Nghe gì hôm nay" songs={todaySongs || []} />
      <ListAlbum title="Nhạc TOP 100" albums={newAlbums || []} />

      {/* Hiển thị 3 ListAlbum dựa trên dữ liệu từ Top Genres Playlists */}
      {topGenres && topGenres.slice(0, 3).map((genre) => (
        <ListAlbum
          key={genre.id}
          title={genre.name} // Sử dụng tên thể loại làm tiêu đề
          albums={
            // Ánh xạ các playlists của genre này sang định dạng ITransformedAlbum
            // Chỉ lấy 8 playlists đầu tiên của mỗi genre để tránh quá dài
            (genre.playlists || []).slice(0, 8).map(playlist => ({
              id: playlist.id,
              image: playlist.images.DEFAULT,
              title: playlist.name,
              // Tên nghệ sĩ không có trong playlist này, có thể để trống hoặc thêm placeholder
              artist: '',
            }))
          }
          isBig={true}
        />
      ))}

      {/* THÊM DANH SÁCH VIDEO TRENDING */}
      <ListVideo title="Youtube Trending" videos={youtubeTrendingVideos} />

      {/* Truyền dữ liệu favoriteArtists đã được tải từ API */}
      <ListArtist title="Nghệ sĩ yêu thích" artists={favoriteArtists || []} />

      {/* Đảm bảo có đủ khoảng trống ở dưới cùng cho thanh phát nhạc */}
      <div style={{ height: '100px' }}></div>
    </div>
  );
};

export default Home;