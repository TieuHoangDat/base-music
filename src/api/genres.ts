// src/api/genres.ts

import { fetcher } from './Fetcher';

// 1. Định nghĩa Interface cho dữ liệu GENRE TRẢ VỀ TỪ API
interface IImagesInGenreFromApi {
  SMALL: string;
  DEFAULT: string;
}

interface IPlaylistInGenreFromApi {
  createdAt: string;
  id: string;
  images: IImagesInGenreFromApi;
  isPublic: boolean;
  name: string; // Tên của playlist
  type: number;
  updatedAt: string;
  urlSlug: string;
}

interface IParentGenreDto {
  id: string;
  images: IImagesInGenreFromApi;
  name: string;
  type: number;
  urlSlug: string;
}

export interface IGenreFromApi {
  createdAt: string;
  id: string;
  images: IImagesInGenreFromApi;
  name: string; // Tên của thể loại (genre)
  parentGenreDto: IParentGenreDto;
  playlists: IPlaylistInGenreFromApi[]; // Danh sách các playlist trong thể loại này
  type: number;
  updatedAt: string;
  urlSlug: string;
}

/**
 * Lấy danh sách Top Genres (thể loại) từ API và chuyển đổi 3 playlists đầu tiên của mỗi genre
 * sang định dạng ITransformedAlbum.
 * @returns Promise<IGenreFromApi[]>
 */
export async function getTopGenresPlaylists(): Promise<IGenreFromApi[]> {
  try {
    const fetchedGenres: IGenreFromApi[] = await fetcher<IGenreFromApi[]>({
      url: '/genres/top-genres-playlists', // Đường dẫn API cụ thể cho top genres playlists
      method: 'GET',
    });

    console.log('Dữ liệu Top Genres Playlists API gốc:', fetchedGenres);

    // Không cần ánh xạ playlist ở đây, chỉ trả về dữ liệu genre gốc
    // Việc ánh xạ sẽ được thực hiện ở component Home để linh hoạt hơn
    return fetchedGenres;

  } catch (error) {
    console.error('Lỗi khi lấy Top Genres Playlists:', error);
    throw error; // Ném lại lỗi để React Query có thể bắt và quản lý
  }
}