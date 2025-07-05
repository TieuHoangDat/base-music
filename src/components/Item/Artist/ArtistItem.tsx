import React, { useState } from 'react';
import clsx from 'clsx';
import { Add, Favorite } from '@mui/icons-material'; // Import icon Add và Favorite
import './ArtistItem.scss'; // Import SCSS file

interface ArtistItemProps {
  image: string;
  name: string;
  songsCount: number;
  likesCount: number;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ image, name, songsCount, likesCount }) => {
  const [isLiked, setIsLiked] = useState(false); // State để quản lý trạng thái yêu thích

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra phần tử cha
    setIsLiked(!isLiked); // Đảo ngược trạng thái yêu thích
    // Ở đây bạn có thể gọi API để cập nhật trạng thái yêu thích trên server
  };

  return (
    <div className="artist-item cursor-pointer">
      <div className="artist-item__image-wrapper">
        <img src={image} alt={name} className="artist-item__image" />
        {/* Có thể thêm overlay hoặc hiệu ứng khác khi hover vào ảnh nếu cần */}
      </div>
      <div className="artist-item__info">
        <h3 className="artist-item__name">{name}</h3>
        <p className="artist-item__stats">{songsCount} Bài hát</p>
        <p className="artist-item__stats">{likesCount + (isLiked ? 1 : 0)} Yêu thích</p> {/* Cập nhật số lượt thích tạm thời */}
      </div>
      <button
        onClick={handleLikeClick}
        className={clsx(
          "artist-item__like-button",
          { "artist-item__like-button--liked": isLiked }
        )}
      >
        {isLiked ? (
          <>
            <Favorite className="artist-item__like-icon" /> Yêu thích
          </>
        ) : (
          <>
            <Add className="artist-item__like-icon" /> Yêu thích
          </>
        )}
      </button>
    </div>
  );
};

export default ArtistItem;