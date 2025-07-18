import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayingSong {
  id: string;
  image: string;
  title: string;
  artist?: string;
  song: string;
  duration: string;
}

// Định nghĩa trạng thái của trình phát nhạc
interface MusicPlayerState {
  currentSong: PlayingSong | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  playlist: PlayingSong[]; // Thêm playlist vào state
}

const initialState: MusicPlayerState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.5,
  isMuted: false,
  playlist: [], // Khởi tạo playlist rỗng
};

const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    // Action để đặt bài hát và bắt đầu phát, có thể kèm theo playlist
    playNewSong: (state, action: PayloadAction<{ song: PlayingSong; playlist?: PlayingSong[] }>) => {
      const { song, playlist } = action.payload;
      // Nếu là bài hát mới, đặt lại thời gian
      if (state.currentSong?.id !== song.id) {
        state.currentSong = song;
        state.currentTime = 0;
      }
      state.isPlaying = true;
      if (playlist) {
        state.playlist = playlist; // Cập nhật playlist nếu được cung cấp
      }
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    updateCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      if (action.payload > 0) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    songEnded: (state) => {
      state.isPlaying = false;
      state.currentTime = 0;
      // Tự động chuyển bài khi kết thúc nếu đang phát và có bài tiếp theo
      const currentIndex = state.playlist.findIndex(s => s.id === state.currentSong?.id);
      if (currentIndex !== -1 && currentIndex < state.playlist.length - 1) {
        state.currentSong = state.playlist[currentIndex + 1];
        state.isPlaying = true; // Bắt đầu phát bài tiếp theo
        state.currentTime = 0; // Bắt đầu từ đầu bài tiếp theo
      } else {
        // Nếu không có bài tiếp theo, dừng phát
        state.currentSong = state.playlist.length > 0 ? state.playlist[0] : null; // Quay về bài đầu tiên hoặc null
        state.isPlaying = false;
        state.currentTime = 0;
      }
    },
    seekSong: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    // Actions mới cho next/previous
    playNextSong: (state) => {
      if (!state.currentSong || state.playlist.length === 0) return;

      const currentIndex = state.playlist.findIndex(s => s.id === state.currentSong?.id);
      if (currentIndex !== -1 && currentIndex < state.playlist.length - 1) {
        state.currentSong = state.playlist[currentIndex + 1];
        state.isPlaying = true;
        state.currentTime = 0; // Luôn bắt đầu bài mới từ đầu
      } else if (state.playlist.length > 0) {
        // Về bài đầu tiên nếu đang ở cuối playlist
        state.currentSong = state.playlist[0];
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    playPreviousSong: (state) => {
      if (!state.currentSong || state.playlist.length === 0) return;

      const currentIndex = state.playlist.findIndex(s => s.id === state.currentSong?.id);
      // Nếu đang ở đầu bài hát (dưới 3 giây) hoặc không phải bài đầu tiên, quay lại bài trước
      if (currentIndex > 0 && state.currentTime < 3) { // Hoặc bất kỳ ngưỡng nào bạn muốn
        state.currentSong = state.playlist[currentIndex - 1];
        state.isPlaying = true;
        state.currentTime = 0; // Bắt đầu bài trước từ đầu
      } else if (state.currentSong) {
        // Nếu không, hoặc đang ở đầu bài hát (trên 3 giây), phát lại bài hiện tại từ đầu
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
  },
});

export const {
  playNewSong,
  pauseSong,
  updateCurrentTime,
  setVolume,
  toggleMute,
  songEnded,
  seekSong,
  playNextSong, // Export actions mới
  playPreviousSong, // Export actions mới
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;