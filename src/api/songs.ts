// src/api/songs.ts

import { fetcher } from './Fetcher'; // <-- Cập nhật đường dẫn đến file fetcher của bạn

// 1. Định nghĩa Interface cho dữ liệu TRẢ VỀ TỪ API
interface IArtistFromApi {
  id: string;
  name: string;
  // ... các thuộc tính khác của artist nếu cần
}

interface IAudioFromApi {
  id: string;
  url: string;
  // ...
}

interface IImagesFromApi {
  SMALL: string;
  DEFAULT: string;
}

interface ISongFromApi {
  id: string;
  name: string; // Tên bài hát
  artists: IArtistFromApi[];
  audios: IAudioFromApi[];
  images: IImagesFromApi;
  duration: number; // Duration ở đây là number (giây)
  // ... các thuộc tính khác từ API mà bạn không cần ánh xạ
}

// 2. Định nghĩa Interface cho định dạng DỮ LIỆU ĐÍCH (todaySongs)
export interface ITransformedSong {
  id: string;
  image: string;
  title: string;
  artist: string;
  song: string;
  duration: string; // duration ở định dạng đích là string
}

/**
 * Lấy danh sách bài hát đề xuất từ API và chuyển đổi sang định dạng mong muốn.
 * @returns Promise<ITransformedSong[]>
 */
export async function getRecommendedSongs(): Promise<ITransformedSong[]> {
  try {
    // Gọi hàm fetcher, mong đợi một mảng ISongFromApi
    const fetchedSongs: ISongFromApi[] = await fetcher<ISongFromApi[]>({
      url: '/songs/recommended', // Đường dẫn API cụ thể
      method: 'GET',
    });

    // Ánh xạ (Map) dữ liệu từ định dạng API sang định dạng đích
    const transformedSongs: ITransformedSong[] = fetchedSongs.map(song => ({
      id: song.id,
      image: song.images.DEFAULT,
      title: song.name,
      artist: song.artists && song.artists.length > 0 ? song.artists[0].name : 'Unknown Artist',
      song: song.audios && song.audios.length > 0 ? song.audios[0].url : '',
      duration: song.duration.toString(), // Chuyển đổi từ number sang string
    }));

    return transformedSongs; // Trả về dữ liệu đã chuyển đổi

  } catch (error) {
    console.error('Lỗi khi lấy hoặc ánh xạ bài hát đề xuất:', error);
    // Trình bao bọc fetcher đã hiển thị toast, bạn có thể re-throw lỗi nếu muốn component xử lý cụ thể
    throw error; // Ném lại lỗi để component gọi có thể bắt và xử lý trạng thái lỗi
  }
}