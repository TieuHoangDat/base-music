// src/components/Item/Video/VideoItem.tsx

import React from 'react';
import clsx from 'clsx';
import { PlayArrow, MoreVert, FavoriteBorder } from '@mui/icons-material';
import './VideoItem.scss';

interface VideoItemProps {
  image: string;
  title: string;
  channel: string;
  views: string; // Số lượt xem (ví dụ: "2,000,000")
  duration: string; // Thời lượng video (ví dụ: "5:27")
  isOfficial?: boolean; // Nếu là Official MV
  channelAvatar: string; // Thêm prop cho ảnh avatar của kênh
}

const VideoItem: React.FC<VideoItemProps> = ({ image, title, channel, views, duration, isOfficial, channelAvatar }) => {
  return (
    <div className="video-item cursor-pointer">
      <div className="video-item__thumbnail-wrapper">
        <img src={image} alt={title} className="video-item__thumbnail" />
        {isOfficial && <span className="video-item__badge">OFFICIAL MV</span>}
        <span className="video-item__duration">{duration}</span>
        <div className="video-item__overlay">
          <div className="video-item__play-button">
            <PlayArrow className="video-item__play-icon" />
          </div>
        </div>
        {/* Icon trái tim được đặt trực tiếp trong thumbnail-wrapper để luôn hiển thị */}
        <FavoriteBorder className="video-item__heart-icon" />
      </div>
      <div className="video-item__details">
        <div className="video-item__channel-avatar">
          <img src={channelAvatar} alt={channel} />
        </div>
        <div className="video-item__info">
          <h3 className="video-item__title">{title}</h3>
          <p className="video-item__channel">{channel}</p>
        </div>
        {/* Nút menu button được đặt ở đây và sẽ luôn hiển thị */}
        <div className="video-item__menu-button">
          <MoreVert />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;