import React, { createContext, useState, ReactNode, useCallback } from 'react';

// Định nghĩa kiểu dữ liệu cho một bài hát trong trình phát
export interface PlayingSong {
  id: string;
  image: string;
  title: string;
  artist?: string;
  song: string; // URL của file nhạc
  duration: string; // Thời lượng bài hát
}

// Định nghĩa kiểu dữ liệu cho context value
interface MusicPlayerContextType {
  currentSong: PlayingSong | null;
  isPlaying: boolean;
  playSong: (song: PlayingSong) => void;
  pauseSong: () => void;
  // Bạn có thể thêm các hàm điều khiển khác như nextSong, prevSong, setVolume...
}

// Khởi tạo Context với giá trị mặc định
export const MusicPlayerContext = createContext<MusicPlayerContextType>({
  currentSong: null,
  isPlaying: false,
  playSong: () => {},
  pauseSong: () => {},
});

interface MusicPlayerProviderProps {
  children: ReactNode;
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<PlayingSong | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playSong = useCallback((song: PlayingSong) => {
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const contextValue = {
    currentSong,
    isPlaying,
    playSong,
    pauseSong,
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};