// src/pages/Home/Home.tsx

import ListSong from '../../components/ListItem/Song/ListSong';
import ListAlbum from '../../components/ListItem/Album/ListAlbum';
import ListArtist from '../../components/ListItem/Artist/ListArtist';
import ListVideo from '../../components/ListItem/Video/ListVideo';
import './Home.scss';

const Home = () => {
  // Dữ liệu mẫu cho phần "Nghe gì hôm nay" (vẫn giữ nguyên)
  const todaySongs = [
    { id: '1', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1712315608082song1.jpg?alt=media&token=23849498-4f33-4d27-8ba8-8fbd59c4fa4f', title: 'Lost Sky - Where we started', artist: 'NCS', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1712315252039song1.mp3?alt=media&token=b0b37e69-1b53-4a3f-9a0e-5b1c0c737b12', duration: '222' },
    { id: '2', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1712315711276song2.jpg?alt=media&token=81f9b8eb-69ca-4938-933a-b33e85e60182', title: 'Dynasty', artist: 'MIIA', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1712315704146song2.mp3?alt=media&token=fd0f0a32-6795-4199-a498-36523f398b4b', duration: '225' },
    { id: '3', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1712315749591song3.jpg?alt=media&token=3e0826ba-2e5c-4954-99d7-8a1bdc3378e6', title: 'Monody', artist: 'TheFatRat', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1712315757642song3.mp3?alt=media&token=326dbe03-df38-4756-8851-8df271675c67', duration: '290' },
    { id: '4', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719306260739song4.jpeg?alt=media&token=909d4269-f044-4e1f-bef7-dca9cba9c6c1', title: 'Shake it off', artist: 'Taylor Swift', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719306253561shake_it_off.mp3?alt=media&token=f8e38fc6-904c-4681-81aa-c65d53a1c232', duration: '241' },
    { id: '5', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719307495969download.jpeg?alt=media&token=ba17f2f0-5e8d-435e-b93a-fb6993b484ec', title: 'Blank Space', artist: 'Tailor Swift', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719307407263003%20Tailor%20Swift%20-%20Blank%20Space.mp3?alt=media&token=8b3e4ea6-5877-4eb2-ab75-e794fe9f1398', duration: '231' },
    { id: '6', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719307694957download%20(1).jpeg?alt=media&token=9f2a3c73-7143-49e5-8c23-4a42505c733d', title: 'Love Story', artist: 'Taylor Swift', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719307705949006%20Taylor%20Swift%20-%20Love%20Story.mp3?alt=media&token=e24f1f3c-42b7-432c-9e47-1a678e08836d', duration: '233' },
    { id: '7', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719307802919download%20(2).jpeg?alt=media&token=7eb89989-51e6-451d-9aa2-740b735f3794', title: 'Bad Blood', artist: 'Taylor Swift', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719307771997014%20Tailor%20Swift%20-%20Bad%20Blood.mp3?alt=media&token=50a9d1c8-766b-44a6-998e-58f84f7ad756', duration: '211' },
    { id: '8', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719307920228download%20(3).jpeg?alt=media&token=6997e74a-d944-4803-a451-05352576a695', title: 'Titanium', artist: 'David Guetta', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719307915734017%20David%20Guetta%20-%20Titanium%20ft.%20Sia.mp3?alt=media&token=ee7712c5-0b00-4b66-8f02-551a6e7c9f01', duration: '245' },
    { id: '9', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719308016951download%20(4).jpeg?alt=media&token=c7d94335-2b07-434d-ab22-311e99021e6b', title: 'Love Yourself', artist: 'Justin Bieber', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719307981634020%20Justin%20Bieber%20-%20Love%20Yourself.mp3?alt=media&token=034f35dc-e7d6-412b-97f5-46e80c4c1013', duration: '233' },
    { id: '10', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719308217197download%20(5).jpeg?alt=media&token=95775d20-9203-44b9-a387-46bd006dcb41', title: 'What Do You Mean', artist: 'Justin Bieber', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719308224191032%20Justin%20Bieber%20-%20What%20Do%20You%20Mean.mp3?alt=media&token=53b0fbd6-5e4a-4caf-bc49-d141ea11bca3', duration: '210' },
    { id: '11', image: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/images%2F1719308329015download%20(6).jpeg?alt=media&token=16b3ce2c-46fa-4845-b48a-d27ce00cded3', title: "This One-'s For Y", artist: 'David Guetta feat Zara Larsson', song: 'https://firebasestorage.googleapis.com/v0/b/spotify-ecb3f.appspot.com/o/audio%2F1719308285741060%20David%20Guetta%20feat%20Zara%20Larsson%20-%20This%20One-%27s%20For%20Y.mp3?alt=media&token=635271bc-e1d9-4d4f-8ada-6aa2a15861dd', duration: '207' },
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

      {/* Đảm bảo có đủ khoảng trống ở dưới cùng cho thanh phát nhạc */}
      <div style={{ height: '100px' }}></div> {/* Adjust height as needed */}
    </div>

  );
};

export default Home;