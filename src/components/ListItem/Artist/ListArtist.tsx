import React, { useRef, useState, useEffect } from 'react';
import ArtistItem from '../../Item/Artist/ArtistItem'; // Import ArtistItem
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import clsx from 'clsx';
import './ListArtist.scss'; // Tạo file SCSS mới cho ListArtist

// Định nghĩa kiểu dữ liệu cho một nghệ sĩ
interface Artist {
  id: string;
  image: string;
  name: string;
  songsCount: number;
  likesCount: number;
}

interface ListArtistProps {
  title: string;
  artists: Artist[];
}

const ListArtist: React.FC<ListArtistProps> = ({ title, artists }) => {
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
      // Kích thước cố định của ArtistItem (width trong ArtistItem.scss)
      const artistItemWidth = 180; 
      const gapWidth = 20; // Tương ứng với gap-5
      const scrollAmount = artistItemWidth + gapWidth;

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
  }, [artists]); 

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
    <div className="list-artist-section mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {/* Có thể thêm nút Xem Thêm nếu cần */}
      </div>

      <div className="list-artist-container relative">
        {/* Mũi tên trái */}
        <button
          onClick={() => scroll('left')}
          className={clsx(
            "list-artist-arrow list-artist-arrow--left",
            { "opacity-0 pointer-events-none": !showLeftArrow }
          )}
        >
          <ChevronLeft />
        </button>

        {/* Danh sách nghệ sĩ có thể cuộn */}
        <div
          ref={scrollContainerRef}
          className="list-artist-grid flex overflow-x-auto pb-4 gap-5" // gap-5 (20px)
        >
          {artists.map((artist) => (
            <ArtistItem
              key={artist.id}
              image={artist.image}
              name={artist.name}
              songsCount={artist.songsCount}
              likesCount={artist.likesCount}
            />
          ))}
        </div>

        {/* Mũi tên phải */}
        <button
          onClick={() => scroll('right')}
          className={clsx(
            "list-artist-arrow list-artist-arrow--right",
            { "opacity-0 pointer-events-none": !showRightArrow }
          )}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListArtist;