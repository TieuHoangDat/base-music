// src/pages/Home/Home.tsx

import ListSong from '../../components/ListItem/Song/ListSong';
import ListAlbum from '../../components/ListItem/Album/ListAlbum';
import ListArtist from '../../components/ListItem/Artist/ListArtist';
import ListVideo from '../../components/ListItem/Video/ListVideo'; // Import ListVideo mới
import './Home.scss';

const Home = () => {
  // Dữ liệu mẫu cho phần "Nghe gì hôm nay" (vẫn giữ nguyên)
  const todaySongs = [
    { id: '1', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 1', artist: 'Nghệ sĩ A' },
    { id: '2', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 2', artist: 'Nghệ sĩ B' },
    { id: '3', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 3', artist: 'Nghệ sĩ C' },
    { id: '4', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 4', artist: 'Nghệ sĩ D' },
    { id: '5', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 5', artist: 'Nghệ sĩ E' },
    { id: '6', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 6', artist: 'Nghệ sĩ F' },
    { id: '7', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 4', artist: 'Nghệ sĩ D' },
    { id: '8', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 5', artist: 'Nghệ sĩ E' },
    { id: '9', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'Bài hát hôm nay 6', artist: 'Nghệ sĩ F' },
    // Thêm các bài hát khác nếu muốn
  ];

  // Dữ liệu mẫu cho danh sách Album mới
  const newAlbums = [
    { id: 'a1', image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/5/6/0/8/560868f7aa95b9d3118d0c41031c2a07.jpg', title: 'Nhạc Phim', artist: 'Châu Dực Khiêm, Lưu Vũ Ninh /...' },
    { id: 'a2', image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/5/6/0/8/560868f7aa95b9d3118d0c41031c2a07.jpg', title: 'Top100Today', artist: 'Ali Hoàng Dương, SMS, Đậ...' },
    { id: 'a3', image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/5/6/0/8/560868f7aa95b9d3118d0c41031c2a07.jpg', title: 'TOP100TUANMOI', artist: 'Ali Hoàng Dương, SMS, Đậ...' },
    { id: 'a4', image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/7/4/1/1/7411649ce4599dfa9968a358c5f59049.jpg', title: 'TOP100 THANG 4', artist: 'Ali Hoàng Dương, SMS, Đậ...' },
    { id: 'a5', image: 'https://i.ytimg.com/vi/bQzWvY4f2iA/maxresdefault.jpg', title: 'testTop100_01', artist: 'Giang Hồng Ngọc, Ali...' },
    { id: 'a6', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'testTop100', artist: 'Giang Hồng Ngọc, I...' },
    { id: 'a7', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', title: 'testTop100', artist: 'Giang Hồng Ngọc, I...' },
    // Thêm các album khác
  ];
  // Dữ liệu mẫu cho danh sách Nghệ sĩ
  const favoriteArtists = [
    { id: 'ar1', image: 'https://image.plo.vn/w1000/Uploaded/2025/xpckxpiu/2021_02_23/plo-1_qkis.jpg.webp', name: 'Sơn Tùng M-TP', songsCount: 9, likesCount: 18 },
    { id: 'ar2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtguIT5eeE6A2RbxWil2qhzHS-mgkVJz1FNw&s', name: 'Thùy Chi', songsCount: 0, likesCount: 14 },
    { id: 'ar3', image: 'https://images2.thanhnien.vn/528068263637045248/2025/1/2/11-17357948930191586901780.jpg', name: 'Hòa Minzy', songsCount: 0, likesCount: 12 },
    { id: 'ar4', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5vtpuvHQxT11HauGxLrHIpQJCfh4_fRQ8c8cgDXE6JJCk2a2QyXUealj4UG8ULoCVZzqDkRv2ZycCsFZVvSxjg', name: 'Bùi Anh Tuấn', songsCount: 0, likesCount: 9 },
    { id: 'ar5', image: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/7/4/1361547/Bang-Kieu-01.jpeg', name: 'Bằng Kiều', songsCount: 0, likesCount: 8 },
    { id: 'ar6', image: 'https://images2.thanhnien.vn/528068263637045248/2025/1/6/img2302-1-17362059434502028455560.jpg', name: 'Hà Anh Tuấn', songsCount: 0, likesCount: 6 },
    { id: 'ar7', image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/5/b/c/35bcf8e0c24208e8206d281313317765.jpg', name: 'Nghệ sĩ K', songsCount: 0, likesCount: 5 },
  ];

  // Dữ liệu mẫu cho danh sách Video Trending
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

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden hide-scrollbar container"> 
      <ListSong title="Nghe gì hôm nay" songs={todaySongs} />
      <ListAlbum title="Nhạc TOP 100" albums={newAlbums} />
      <ListAlbum title="ຜ່ອນຄາຍ" albums={newAlbums} isBig={true} />
      <ListAlbum title="ເພງແທຣນ / ເພງຮາວສ໌ / ເພງເທັກໂນ" albums={newAlbums} isBig={true} />
      <ListAlbum title="ເພງເດັກນ້ອຍ" albums={newAlbums} isBig={true} />

      {/* THÊM DANH SÁCH VIDEO TRENDING */}
      <ListVideo title="Youtube Trending" videos={youtubeTrendingVideos} />

      <ListArtist title="Nghệ sĩ yêu thích" artists={favoriteArtists} />

    </div>
    
  );
};

export default Home;