// src/components/ListItem/Video/ListVideo.tsx

import React, { useRef, useState, useEffect } from 'react';
import VideoItem from '../../Item/Video/VideoItem'; // Import VideoItem mới
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import clsx from 'clsx';
import './ListVideo.scss'; // Tạo file SCSS mới cho ListVideo (tương tự ListAlbum)

// Định nghĩa kiểu dữ liệu cho một video
interface Video {
  id: string;
  image: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  isOfficial?: boolean;
  channelAvatar: string; // Thêm prop cho ảnh avatar của kênh
}

interface ListVideoProps {
  title: string;
  videos: Video[];
}

const ListVideo: React.FC<ListVideoProps> = ({ title, videos }) => {
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
      // Kích thước cố định của VideoItem (đã định nghĩa trong VideoItem.scss)
      const videoItemWidth = 240; 
      const gapWidth = 20; // Khoảng cách giữa các item (tổng 10px margin trái phải của mỗi item)
      const scrollAmount = videoItemWidth + gapWidth;

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
  }, [videos]);

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
    <div className="list-video-section mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>

      </div>

      <div className="list-video-container relative">
        {/* Mũi tên trái */}
        <button
          onClick={() => scroll('left')}
          className={clsx(
            "list-video-arrow list-video-arrow--left",
            { "opacity-0 pointer-events-none": !showLeftArrow }
          )}
        >
          <ChevronLeft />
        </button>

        {/* Danh sách video có thể cuộn */}
        <div
          ref={scrollContainerRef}
          className="list-video-grid flex overflow-x-auto pb-4" // Removed gap-5 here, handled by margin in VideoItem.scss
        >
          {videos.map((video) => (
            <VideoItem
              key={video.id}
              image={video.image}
              title={video.title}
              channel={video.channel}
              views={video.views}
              duration={video.duration}
              isOfficial={video.isOfficial}
              channelAvatar={video.channelAvatar} // Đảm bảo truyền prop này
            />
          ))}
        </div>

        {/* Mũi tên phải */}
        <button
          onClick={() => scroll('right')}
          className={clsx(
            "list-video-arrow list-video-arrow--right",
            { "opacity-0 pointer-events-none": !showRightArrow }
          )}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListVideo;