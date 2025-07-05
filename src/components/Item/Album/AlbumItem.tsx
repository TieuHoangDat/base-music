// AlbumItem.tsx

import React from 'react';
import clsx from 'clsx'; // Để dễ dàng quản lý classNames có điều kiện
import './AlbumItem.scss'; // Import SCSS file
import { PlayArrow } from '@mui/icons-material'; // Import icon PlayArrow từ Material-UI

interface AlbumItemProps {
  image: string;
  title: string;
  artist?: string; // Tên nghệ sĩ hoặc nhiều nghệ sĩ
  isBig?: boolean; // Thêm prop isBig (optional)
}

const AlbumItem: React.FC<AlbumItemProps> = ({ image, title, artist, isBig }) => {
    return (
      <div className={clsx("album-item cursor-pointer", {
        "album-item--big": isBig // Thêm class album-item--big nếu isBig là true
      })}>
        <div className="album-item__image-wrapper">
          <img src={image} alt={title} className="album-item__image" />
          {/* Overlay và nút Play */}
          <div className="album-item__overlay">
            <div className="album-item__play-button">
              <PlayArrow className="album-item__play-icon" />
            </div>
          </div>
        </div>
        <div className="album-item__info">
          <h3 className="album-item__title">{title}</h3>
          {artist && !isBig && <p className="album-item__artist">{artist}</p>}
        </div>
      </div>
    );
  };

export default AlbumItem;