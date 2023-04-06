import React, { FC, useState } from 'react';
import { IUnsplashResults } from '../../interfaces';
import classes from './MainCard.module.scss';
import likeSvg from '../../assets/like.svg';

export const MainCard: FC<IUnsplashResults> = ({
  alt_description,
  description,
  likes,
  urls,
  user,
  tags,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={classes.unsplashCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={classes.imageContainer}>
        <img src={urls.small} alt={`image-${description || alt_description}`} />
        <div
          className={
            isHovered ? `${classes.cardInfo} ${classes.cardInfoHovered}` : classes.cardInfo
          }
        >
          <h5 className={classes.title}>{description || alt_description}</h5>
          <div className={classes.likesCointainer}>
            <img className={classes.likeSvg} src={likeSvg} alt="likes" />
            <span>{likes}</span>
          </div>
          <div className={classes.authorInfo}>
            <img src={user.profile_image.medium} alt={user.name} /> <span>{user.name}</span>
          </div>
        </div>
      </div>
      <div className={classes.tagsContainer}>
        {tags.length &&
          tags.map((el, ind) => (
            <span className={classes.tag} key={ind}>
              {el.title}
            </span>
          ))}
      </div>
    </div>
  );
};

export default MainCard;
