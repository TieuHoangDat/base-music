import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResultsPage.scss';
import { CircularProgress, Typography, Box } from '@mui/material';
import SearchSongList from '../../components/ListItem/SearchSongList/SearchSongList';
import { Song } from '../../types/song';
import { searchSongs } from '../../api/search'; // Import hàm API đã hỗ trợ phân trang

const SearchResultsPage: React.FC = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải lần đầu
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false); // Trạng thái đang tải thêm dữ liệu
    const [error, setError] = useState<string | null>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true); // Còn dữ liệu để tải nữa không?

    const observer = useRef<IntersectionObserver>(); // Ref cho IntersectionObserver
    const lastSongElementRef = useCallback((node: HTMLDivElement) => {
        if (isFetchingMore || loading) return; // Không quan tâm nếu đang tải hoặc đang tải lần đầu
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // Nếu phần tử cuối cùng hiển thị và còn dữ liệu, tăng trang và tải thêm
                setCurrentPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isFetchingMore, loading, hasMore]);

    // Effect để lấy từ khóa và reset state khi từ khóa thay đổi
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchKeyword = queryParams.get('keyword');

        if (searchKeyword && searchKeyword !== keyword) { // Kiểm tra nếu từ khóa thực sự thay đổi
            setKeyword(searchKeyword);
            setSearchResults([]); // Xóa kết quả cũ
            setCurrentPage(1); // Reset về trang 1
            setHasMore(true); // Giả định là có nhiều hơn để tải
            setLoading(true); // Bắt đầu tải lần đầu
            setError(null);
        } else if (!searchKeyword) {
            setKeyword('');
            setSearchResults([]);
            setLoading(false);
            setError('Vui lòng nhập từ khóa tìm kiếm.');
        }
    }, [location.search, keyword]); // Thêm keyword vào dependency array để theo dõi sự thay đổi của nó

    // Effect để tìm kiếm bài hát khi keyword hoặc currentPage thay đổi
    useEffect(() => {
        if (!keyword) return; // Không tìm kiếm nếu không có từ khóa

        const fetchSongs = async () => {
            // Nếu là trang 1, dùng setLoading. Nếu không, dùng setIsFetchingMore.
            if (currentPage === 1) {
                setLoading(true);
            } else {
                setIsFetchingMore(true);
            }
            setError(null);

            try {
                // pageSize mặc định là 20
                const newSongs = await searchSongs(keyword, currentPage, 20);

                if (currentPage === 1) {
                    setSearchResults(newSongs);
                } else {
                    setSearchResults(prevSongs => [...prevSongs, ...newSongs]);
                }

                // Kiểm tra nếu số lượng bài hát mới nhỏ hơn pageSize, nghĩa là không còn dữ liệu
                setHasMore(newSongs.length === 20); // Giả sử pageSize là 20
            } catch (e: any) {
                setError(`Không thể tải kết quả tìm kiếm: ${e.message || 'Lỗi không xác định'}`);
                setHasMore(false); // Ngừng tải thêm nếu có lỗi
            } finally {
                setLoading(false);
                setIsFetchingMore(false);
            }
        };

        fetchSongs();
    }, [keyword, currentPage]); // Phụ thuộc vào keyword và currentPage

    return (
        <div className="search-results-page">
            <Typography variant="h4" component="h1" className="search-title">
                Kết quả tìm kiếm cho "{keyword}"
            </Typography>
            {loading && currentPage === 1 ? ( // Chỉ hiển thị loading ban đầu khi tải trang 1
                <Box className="loading-container">
                    <CircularProgress />
                    <Typography>Đang tìm kiếm...</Typography>
                </Box>
            ) : error ? (
                <Typography color="error" className="error-message">
                    {error}
                </Typography>
            ) : (
                <>
                    {searchResults.length > 0 ? (
                        <SearchSongList songs={searchResults} />
                    ) : (
                        !loading && !isFetchingMore && ( // Chỉ hiển thị khi không tải và không có kết quả
                            <Typography className="no-results-message">
                                Không tìm thấy bài hát nào phù hợp.
                            </Typography>
                        )
                    )}

                    {searchResults.length > 0 && hasMore && (
                        <Box className="loading-more-container" ref={lastSongElementRef}>
                            {isFetchingMore ? (
                                <>
                                    <CircularProgress size={24} />
                                    <Typography>Đang tải thêm...</Typography>
                                </>
                            ) : (
                                <Typography>Cuộn xuống để xem thêm.</Typography>
                            )}
                        </Box>
                    )}

                    {searchResults.length > 0 && !hasMore && !isFetchingMore && (
                        <Typography className="end-of-results">
                            Bạn đã xem hết tất cả kết quả.
                        </Typography>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResultsPage;