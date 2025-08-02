// src/api/search.ts

// Đảm bảo đường dẫn này đúng với vị trí file fetcher.ts của bạn
import { fetcher, IDataWithMeta } from './Fetcher'; // Giả sử Fetcher.ts ở cùng cấp hoặc cấp trên

import { Song } from '../types/song'; // Import kiểu Song từ file của bạn

// Định nghĩa interface cho dữ liệu mà fetcher trả về cho bạn
// Nếu API của bạn trả về { data: Song[], ... } và bạn dùng fetcher,
// thì T trong fetcher<T> sẽ là Song[], do fetcher đã bóc tách rồi.
// Nếu bạn muốn cả meta data, thì sẽ là IDataWithMeta<Song[]>.
// Trong trường hợp này, API của bạn có vẻ trả về trực tiếp mảng songs trong trường 'data'
// của response tổng thể, nên fetcher sẽ trả về Song[] sau khi bóc tách.

/**
 * Tìm kiếm bài hát theo từ khóa.
 * @param keyword Từ khóa tìm kiếm.
 * @param page Số trang (mặc định 1).
 * @param pageSize Kích thước trang (mặc định 20).
 * @returns Promise<Song[]> Danh sách bài hát.
 */
export async function searchSongs(
  keyword: string,
  page: number = 1,
  pageSize: number = 20
): Promise<Song[]> { // <-- Kiểu trả về là Song[] vì fetcher sẽ bóc tách data
  try {
    const responseData = await fetcher<Song[]>({ // fetcher<Song[]> vì API trả về data là mảng Song
      url: `/search/songs?keyword=${encodeURIComponent(keyword)}&page=${page}&pageSize=${pageSize}`,
      method: 'GET',
    });
    // fetcher đã xử lý lỗi và bóc tách data.
    // Nếu API trả về { success: true, data: [...], ... },
    // thì responseData chính là mảng Song[].
    return responseData;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm bài hát thông qua fetcher:', error);
    // fetcher đã hiển thị toast, bạn có thể ném lại lỗi nếu muốn component xử lý thêm
    throw error;
  }
}

// Nếu API của bạn có meta data và bạn muốn sử dụng IDataWithMeta<Song[]>
// thì bạn có thể làm như sau:
/**
 * Tìm kiếm bài hát theo từ khóa và trả về cả metadata.
 * @param keyword Từ khóa tìm kiếm.
 * @param page Số trang (mặc định 1).
 * @param pageSize Kích thước trang (mặc định 20).
 * @returns Promise<IDataWithMeta<Song[]>> Danh sách bài hát và metadata.
 */
/*
export async function searchSongsWithMeta(
  keyword: string,
  page: number = 1,
  pageSize: number = 20
): Promise<IDataWithMeta<Song[]>> {
  try {
    const responseData = await fetcherWithMetadata<Song[]>({
      url: `/search/songs?keyword=${encodeURIComponent(keyword)}&page=${page}&pageSize=${pageSize}`,
      method: 'GET',
    });
    return responseData;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm bài hát (có metadata) thông qua fetcher:', error);
    throw error;
  }
}
*/