// src/api/playlists.ts

import { fetcher } from './Fetcher'; // <-- Cập nhật đường dẫn đến file fetcher của bạn

// 1. Định nghĩa Interface cho dữ liệu PLAYLIST TRẢ VỀ TỪ API
interface IArtistInPlaylistFromApi {
  id: string;
  name: string;
  // ... các thuộc tính khác của artist nếu cần
}

interface IImagesInPlaylistFromApi {
  SMALL: string;
  DEFAULT: string;
}

interface IPlaylistFromApi {
  id: string;
  name: string; // Tên của playlist/album
  images: IImagesInPlaylistFromApi;
  artists: IArtistInPlaylistFromApi[]; // Danh sách các nghệ sĩ liên quan đến playlist
  // ... các thuộc tính khác từ API mà bạn không cần ánh xạ
}

// 2. Định nghĩa Interface cho định dạng DỮ LIỆU ĐÍCH (newAlbums)
export interface ITransformedAlbum {
  id: string;
  image: string;
  title: string;
  artist: string; // Chuỗi các tên nghệ sĩ được ghép lại
}

/**
 * Lấy danh sách Top 100 Playlists/Albums từ API và chuyển đổi sang định dạng mong muốn.
 * @returns Promise<ITransformedAlbum[]>
 */
export async function getTop100Playlists(): Promise<ITransformedAlbum[]> {
  try {
    // Gọi hàm fetcher, mong đợi một mảng IPlaylistFromApi
    const fetchedPlaylists: IPlaylistFromApi[] = await fetcher<IPlaylistFromApi[]>({
      url: '/playlists/top100', // Đường dẫn API cụ thể cho top100 playlists
      method: 'GET',
    });

    console.log('Dữ liệu Top 100 Playlists/Albums API gốc:', fetchedPlaylists);

    // Ánh xạ (Map) dữ liệu từ định dạng API sang định dạng đích
    const transformedAlbums: ITransformedAlbum[] = fetchedPlaylists.map(playlist => ({
      id: playlist.id,
      image: playlist.images.DEFAULT,
      title: playlist.name,
      // Ghép tên các nghệ sĩ lại thành một chuỗi, hoặc "Various Artists" nếu không có nghệ sĩ
      artist: playlist.artists && playlist.artists.length > 0
        ? playlist.artists.map(artist => artist.name).join(', ')
        : 'Various Artists',
    }));

    return transformedAlbums; // Trả về dữ liệu đã chuyển đổi

  } catch (error) {
    console.error('Lỗi khi lấy hoặc ánh xạ Top 100 Playlists:', error);
    throw error; // Ném lại lỗi để React Query có thể bắt và quản lý
  }
}