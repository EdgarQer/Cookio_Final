import React from 'react';
import './ArticleTile.css';
import { Link } from 'react-router-dom';
import HeartIcon from '../assets/heart-icon.svg';
import StarIcon from '../assets/star-icon.svg';
import ClockIcon from '../assets/clock-icon.svg';
// eslint-disable-next-line react/prop-types
const ArticleTile = ({ id, image, title, description }) => {
	return (
		<div className="article-tile">
			<Link to={`/article/${id}`} className="article-tile__image-link">
				<img src={image} alt={title} className="article-tile__image" />
			</Link>
			<div className="article-tile__content">
				
				<div className="article-tile__header">
					<h3 className="article-tile__title">{title}</h3>
					<img src={HeartIcon} alt="Favorite Icon" className="article-tile__favorite-icon" />
				</div>

				<p className="article-tile__description">{description}</p>

				<div className="article-tile__footer">
					<div className="article-tile__time">
						<img src={ClockIcon} alt="Clock Icon" className="article-tile__clock-icon" />
						<span>5 min</span>
					</div>
					<div className="article-tile__stars">
						{Array(5).fill(0).map((_, index) => (
							<img key={index} src={StarIcon} alt="Star Icon" className="article-tile__star-icon" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleTile;