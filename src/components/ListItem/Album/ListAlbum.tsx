// ListAlbum.tsx

import React, { useRef, useState, useEffect } from 'react';
import AlbumItem from '../../Item/Album/AlbumItem'; // Import AlbumItem
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import clsx from 'clsx';
import './ListAlbum.scss'; // Tạo file SCSS mới cho ListAlbum

// Định nghĩa kiểu dữ liệu cho một album
interface Album {
  id: string;
  image: string;
  title: string;
  artist?: string;
}

interface ListAlbumProps {
  title: string;
  albums: Album[];
  isBig?: boolean; // Thêm prop isBig (optional)
}

const ListAlbum: React.FC<ListAlbumProps> = ({ title, albums, isBig }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1);
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Kích thước cố định của AlbumItem
      // Điều chỉnh scrollAmount dựa trên isBig
      const albumItemWidth = isBig ? 250 : 180; 
      const gapWidth = 20; // Tương ứng với gap-5 (20px)
      const scrollAmount = albumItemWidth + gapWidth;

      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    checkScrollArrows();
    const handleResize = () => {
      checkScrollArrows();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [albums, isBig]); // Thêm isBig vào dependency array

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
    <div className="list-album-section mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {/* Nút Xem Thêm */}
        <a href="#" className="flex items-center text-[#ff5500] hover:text-white transition-colors duration-200">
          Xem Thêm <ChevronRight className="ml-1 text-base" />
        </a>
      </div>

      <div className="list-album-container relative">
        {/* Mũi tên trái */}
        <button
          onClick={() => scroll('left')}
          className={clsx(
            "list-album-arrow list-album-arrow--left",
            { "opacity-0 pointer-events-none": !showLeftArrow }
          )}
        >
          <ChevronLeft />
        </button>

        {/* Danh sách album có thể cuộn */}
        <div
          ref={scrollContainerRef}
          className="list-album-grid flex overflow-x-auto pb-4 gap-5" // gap-5 (20px)
        >
          {albums.map((album) => (
            <AlbumItem
              key={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
              isBig={isBig} // Truyền prop isBig xuống AlbumItem
            />
          ))}
        </div>

        {/* Mũi tên phải */}
        <button
          onClick={() => scroll('right')}
          className={clsx(
            "list-album-arrow list-album-arrow--right",
            { "opacity-0 pointer-events-none": !showRightArrow }
          )}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListAlbum;