import React, { useRef, useState, useEffect } from 'react';
import SongItem from '../../Item/Song/SongItem'; // Import SongItem
import { ChevronRight, ChevronLeft } from '@mui/icons-material'; // Thêm ChevronLeft
import clsx from 'clsx'; // Để dễ dàng quản lý classNames có điều kiện
import './ListSong.scss'; // Tạo file SCSS mới cho ListSong

// Định nghĩa kiểu dữ liệu cho một bài hát
interface Song {
  id: string;
  image: string;
  title: string;
  artist?: string;
}

interface ListSongProps {
  title: string;
  songs: Song[];
}

const ListSong: React.FC<ListSongProps> = ({ title, songs }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Hàm kiểm tra và cập nhật trạng thái hiển thị mũi tên
  const checkScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;

      // Hiển thị mũi tên phải nếu có thể cuộn thêm về bên phải
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1);

      // Hiển thị mũi tên trái nếu đã cuộn qua điểm bắt đầu
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  // Xử lý cuộn khi click vào mũi tên
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Lấy chiều rộng của một item và khoảng cách gap
      // Bạn cần đảm bảo kích thước SongItem.scss tương ứng với 180px
      const songItemWidth = 140; // Kích thước cố định của SongItem (width trong SongItem.scss)
      const gapWidth = 30; // Khoảng cách gap-6 tương đương 24px (1rem = 16px, 1.5rem = 24px)
      const scrollAmount = songItemWidth + gapWidth;

      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Kiểm tra mũi tên khi component mount và khi cửa sổ thay đổi kích thước
  useEffect(() => {
    checkScrollArrows();
    const handleResize = () => {
      checkScrollArrows();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [songs]); // Chạy lại khi danh sách bài hát thay đổi

  // Lắng nghe sự kiện cuộn của container để cập nhật trạng thái mũi tên
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollArrows);
      return () => {
        container.removeEventListener('scroll', checkScrollArrows);
      };
    }
  }, []);

  return (
    <div className="list-song-section mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <div className="list-song-container relative">
        {/* Mũi tên trái */}
        <button
          onClick={() => scroll('left')}
          className={clsx(
            "list-song-arrow list-song-arrow--left",
            { "opacity-0 pointer-events-none": !showLeftArrow } // Ẩn và vô hiệu hóa click khi không cần
          )}
        >
          <ChevronLeft />
        </button>

        {/* Danh sách bài hát có thể cuộn */}
        <div
          ref={scrollContainerRef}
          className="list-song-grid flex overflow-x-auto pb-4 gap-5" // Use flex and overflow-x-auto
        >
          {songs.map((song) => (
            <SongItem
              key={song.id}
              image={song.image}
              title={song.title}
              artist={song.artist}
            />
          ))}
        </div>

        {/* Mũi tên phải */}
        <button
          onClick={() => scroll('right')}
          className={clsx(
            "list-song-arrow list-song-arrow--right",
            { "opacity-0 pointer-events-none": !showRightArrow } // Ẩn và vô hiệu hóa click khi không cần
          )}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListSong;