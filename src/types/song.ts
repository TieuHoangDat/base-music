// Có thể đặt trong một file riêng như types/song.ts hoặc trên cùng của component liên quan

interface Artist {
    avatar: string;
    id: string;
    images: {
        SMALL: string;
        DEFAULT: string;
    };
    isVerify: boolean;
    name: string;
    stageName: string;
    type: number;
    typeInSong: number;
    urlSlug: string;
}

interface Audio {
    id: string;
    type: number;
    url: string;
}

interface Genre {
    id: string;
    name: string;
    type: number;
    urlSlug: string;
}

interface Playlist {
    id: string;
    images: {
        SMALL: string;
        D_DEFAULT: string; // Có thể bạn muốn đổi tên này thành DEFAULT
    };
    isPublic: boolean;
    name: string;
    type: number;
    urlSlug: string;
}

export interface Song { // Export interface này để dùng được ở các component khác
    artists: Artist[];
    audios: Audio[];
    createdAt: string;
    duration: number; // Thời lượng tính bằng giây
    genres: Genre[];
    id: string;
    images: {
        SMALL: string;
        DEFAULT: string;
    };
    isLiked: boolean;
    keyColor: string;
    lrcLyrics: string;
    name: string;
    playlists: Playlist[];
    totalInteractions: number;
    type: number;
    updatedAt: string;
    urlSlug: string;
}