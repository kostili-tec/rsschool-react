import React, { FC, useState } from 'react';
import { IUnsplashResults } from '../../../../interfaces';
import classes from './MainCard.module.scss';
import likeSvg from '../../../../assets/like.svg';

type MainCardProps = {
  photoData: IUnsplashResults;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};

export const MainCard: FC<MainCardProps> = ({ photoData, setCurrentId }) => {
  const { description, alt_description, likes, urls, user, id } = photoData;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={classes.unsplashCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setCurrentId(id);
      }}
      role="main-card"
    >
      <div className={classes.imageContainer}>
        <img src={urls.small} alt={`image-${description || alt_description}`} />
        <div
          className={
            isHovered ? `${classes.cardInfo} ${classes.cardInfoHovered}` : classes.cardInfo
          }
          role="card-info"
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
      {photoData.tags && (
        <div className={classes.tagsContainer}>
          {photoData.tags.length &&
            photoData.tags.map((el, ind) => (
              <span className={classes.tag} key={ind}>
                {el.title}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default MainCard;
