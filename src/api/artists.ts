import { fetcher } from './Fetcher'; // <-- Cập nhật đường dẫn đến file fetcher của bạn

// 1. Định nghĩa Interface cho dữ liệu NGHỆ SĨ TRẢ VỀ TỪ API
interface IArtistImageFromApi {
  SMALL: string;
  DEFAULT: string;
}

interface IArtistFromApi {
  id: string;
  name: string; // Tên nghệ sĩ
  avatar: string; // URL avatar
  images: IArtistImageFromApi; // Có thể chứa cả SMALL và DEFAULT
  totalSongs: number; // Tổng số bài hát
  totalLikes: number; // Tổng số lượt thích
  // ... các thuộc tính khác từ API mà bạn không cần ánh xạ
}

// 2. Định nghĩa Interface cho định dạng DỮ LIỆU ĐÍCH (favoriteArtists)
export interface ITransformedArtist {
  id: string;
  image: string;
  name: string;
  songsCount: number;
  likesCount: number;
}

/**
 * Lấy danh sách nghệ sĩ từ API và chuyển đổi sang định dạng mong muốn.
 * @returns Promise<ITransformedArtist[]>
 */
export async function getFavoriteArtists(): Promise<ITransformedArtist[]> {
  try {
    // Giả sử API endpoint cho artists là '/artists'
    // Bạn có thể cần thêm các tham số như /artists/popular hoặc /artists?limit=...
    const fetchedArtists: IArtistFromApi[] = await fetcher<IArtistFromApi[]>({
      url: '/artists/top-favourite',
      method: 'GET',
    });

    console.log('Dữ liệu Nghệ sĩ API gốc:', fetchedArtists);

    // Ánh xạ (Map) dữ liệu từ định dạng API sang định dạng đích
    const transformedArtists: ITransformedArtist[] = fetchedArtists.map(artist => ({
      id: artist.id,
      // Ưu tiên images.DEFAULT nếu có, nếu không thì dùng avatar
      image: artist.images?.DEFAULT || artist.avatar || '',
      name: artist.name,
      songsCount: artist.totalSongs || 0, // Đảm bảo giá trị mặc định là 0 nếu không có
      likesCount: artist.totalLikes || 0, // Đảm bảo giá trị mặc định là 0 nếu không có
    }));

    return transformedArtists; // Trả về dữ liệu đã chuyển đổi

  } catch (error) {
    console.error('Lỗi khi lấy hoặc ánh xạ Nghệ sĩ yêu thích:', error);
    throw error; // Ném lại lỗi để React Query có thể bắt và quản lý
  }
}