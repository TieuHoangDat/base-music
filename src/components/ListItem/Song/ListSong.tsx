import React, { useRef, useState, useEffect } from 'react';
import SongItem from '../../Item/Song/SongItem';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import clsx from 'clsx';
import './ListSong.scss';
import { PlayingSong } from '../../../redux/slices/musicPlayerSlice'; // Import PlayingSong type

interface ListSongProps {
  title: string;
  songs: PlayingSong[]; // Sử dụng PlayingSong từ slice
}

const ListSong: React.FC<ListSongProps> = ({ title, songs }) => {
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
      const songItemWidth = 140;
      const gapWidth = 20; // gap-5 (tailwind default gap-x-5 is 20px)
      const scrollAmount = songItemWidth + gapWidth;

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
  }, [songs]);

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
        <button
          onClick={() => scroll('left')}
          className={clsx(
            "list-song-arrow list-song-arrow--left",
            { "opacity-0 pointer-events-none": !showLeftArrow }
          )}
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollContainerRef}
          className="list-song-grid flex overflow-x-auto pb-4 gap-5"
        >
          {songs.map((song) => (
            <SongItem
              key={song.id}
              id={song.id}
              image={song.image}
              title={song.title}
              artist={song.artist}
              songUrl={song.song}
              duration={song.duration}
              playlist={songs} // <<< TRUYỀN TOÀN BỘ DANH SÁCH BÀI HÁT NHƯ LÀ PLAYLIST
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className={clsx(
            "list-song-arrow list-song-arrow--right",
            { "opacity-0 pointer-events-none": !showRightArrow }
          )}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListSong;