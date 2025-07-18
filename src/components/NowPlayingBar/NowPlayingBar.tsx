import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  playNewSong,
  pauseSong,
  updateCurrentTime,
  setVolume,
  toggleMute,
  songEnded,
  seekSong,
  playNextSong,
  playPreviousSong,
} from '../../redux/slices/musicPlayerSlice';
import { PlayArrow, Pause, SkipNext, SkipPrevious, VolumeUp, VolumeMute } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import './NowPlayingBar.scss'; // Import SCSS file

const NowPlayingBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentSong, isPlaying, currentTime, volume, isMuted, playlist } = useSelector(
    (state: RootState) => state.musicPlayer
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const [localVolume, setLocalVolume] = useState(volume);

  useEffect(() => {
    setLocalVolume(volume);
    if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (currentSong) {
      if (audioRef.current.src !== currentSong.song || Math.abs(audioRef.current.currentTime - currentTime) > 0.5) {
        audioRef.current.src = currentSong.song;
        audioRef.current.load();
        audioRef.current.currentTime = currentTime;
      }

      if (isPlaying) {
        audioRef.current.play().catch(e => {
          if (e.name !== "AbortError") {
            console.error("Error playing audio:", e);
          }
        });
      } else {
        audioRef.current.pause();
      }
    } else {
      audioRef.current.pause();
      audioRef.current.src = '';
      dispatch(updateCurrentTime(0));
    }
  }, [currentSong, isPlaying, currentTime, dispatch]);

  const onTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      dispatch(updateCurrentTime(audioRef.current.currentTime));
    }
  }, [dispatch]);

  const onEnded = useCallback(() => {
    dispatch(songEnded());
  }, [dispatch]);

  const handleProgressChange = useCallback((_event: Event, newValue: number | number[]) => {
    if (audioRef.current && currentSong) {
      const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
      audioRef.current.currentTime = newTime;
      dispatch(seekSong(newTime));
    }
  }, [dispatch, currentSong]);

  const handleVolumeChange = useCallback((_event: Event, newValue: number | number[]) => {
    const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
    setLocalVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      dispatch(setVolume(newVolume));
    }
  }, [dispatch]);

  const handleToggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      dispatch(toggleMute());
      setLocalVolume(audioRef.current.muted ? 0 : volume);
    }
  }, [dispatch, volume]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!currentSong) {
    return null;
  }

  const duration = parseInt(currentSong.duration, 10);

  const canPlayNext = playlist.length > 0 && playlist.findIndex(s => s.id === currentSong?.id) < playlist.length - 1;
  const canPlayPrevious = playlist.length > 0 && playlist.findIndex(s => s.id === currentSong?.id) > 0;

  return (
    <div className="now-playing-bar fixed bottom-0 left-0 w-full bg-[#282828] text-white flex items-center p-4 z-50">
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onPlay={() => { if (!isPlaying && currentSong) dispatch(playNewSong({song: currentSong})); }}
        onPause={() => { if (isPlaying) dispatch(pauseSong()); }}
      ></audio>

      {/* Song Info - Luôn hiển thị */}
      <div className="song-info flex items-center flex-grow-0 md:flex-grow"> {/* md:flex-grow để mở rộng trên desktop */}
        <img src={currentSong.image} alt={currentSong.title} className="w-14 h-14 rounded mr-3" />
        <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[120px] md:max-w-[150px]"> {/* Giới hạn chiều rộng cho mobile */}
          <p className="font-bold">{currentSong.title}</p>
          <p className="text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="playback-controls flex-grow flex-col items-center justify-center mx-2 md:mx-4"> {/* Giảm mx trên mobile */}
        <div className="buttons flex items-center mb-1 md:mb-2"> {/* Giảm mb trên mobile */}
          <SkipPrevious
            className={`control-button mx-1 md:mx-2 ${canPlayPrevious ? 'text-gray-400 hover:text-white cursor-pointer' : 'text-gray-600 cursor-not-allowed'}`}
            onClick={() => { if (canPlayPrevious) dispatch(playPreviousSong()); }}
          />
          {isPlaying ? (
            <Pause className="control-button text-white text-3xl md:text-4xl cursor-pointer mx-1 md:mx-2" onClick={() => dispatch(pauseSong())} /> 
          ) : (
            <PlayArrow className="control-button text-white text-3xl md:text-4xl cursor-pointer mx-1 md:mx-2" onClick={() => dispatch(playNewSong({song: currentSong}))} />
          )}
          <SkipNext
            className={`control-button mx-1 md:mx-2 ${canPlayNext ? 'text-gray-400 hover:text-white cursor-pointer' : 'text-gray-600 cursor-not-allowed'}`}
            onClick={() => { if (canPlayNext) dispatch(playNextSong()); }}
          />
        </div>
        <div className="progress-bar flex items-center w-full max-w-sm md:max-w-md"> {/* Giảm max-w trên mobile */}
          <span className="text-xs text-gray-400 mr-1 md:mr-2">{formatTime(currentTime)}</span>
          <Slider
            value={currentTime}
            min={0}
            max={duration || 0}
            onChange={handleProgressChange}
            aria-labelledby="track-slider"
            sx={{
              color: '#FF5500',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 10, // Kích thước nhỏ hơn trên mobile
                height: 10,
                backgroundColor: '#fff',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: 'inherit',
                },
              },
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-rail': {
                opacity: 0.2,
                backgroundColor: '#bfbfbf',
              },
              // Media queries cho Material-UI Slider
              '@media (min-width:600px)': { // Tương đương md breakpoint
                '& .MuiSlider-thumb': {
                  width: 12, // Về kích thước ban đầu trên desktop
                  height: 12,
                },
              },
            }}
          />
          <span className="text-xs text-gray-400 ml-1 md:ml-2">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Controls - Ẩn trên mobile, hiển thị trên desktop */}
      <div className="volume-controls hidden md:flex items-center ml-auto"> {/* Ẩn trên mobile, flex trên md */}
        {isMuted || localVolume === 0 ? (
          <VolumeMute className="control-button text-gray-400 hover:text-white cursor-pointer" onClick={handleToggleMute} />
        ) : (
          <VolumeUp className="control-button text-gray-400 hover:text-white cursor-pointer" onClick={handleToggleMute} />
        )}
        <Slider
          value={isMuted ? 0 : localVolume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          aria-labelledby="continuous-slider"
          sx={{
            width: 80, // Giảm chiều rộng cho mobile (nếu có hiện)
            ml: 2,
            color: '#FF5500',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              backgroundColor: '#fff',
              '&:focus, &:hover, &.Mui-active': {
                boxShadow: 'inherit',
              },
            },
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-rail': {
              opacity: 0.2,
              backgroundColor: '#bfbfbf',
            },
            // Media queries cho Material-UI Slider
            '@media (min-width:600px)': { // Tương đương md breakpoint
              width: 100, // Về kích thước ban đầu trên desktop
            },
          }}
        />
      </div>
    </div>
  );
};

export default NowPlayingBar;