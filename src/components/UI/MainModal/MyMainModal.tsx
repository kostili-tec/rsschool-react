import React, { FC, useEffect, useState } from 'react';
import { getPhotoById } from '../../../utils/api';
import { IUnsplashResults } from '../../../interfaces';
import classes from './MyMainModal.module.scss';
import likeSvg from '../../../assets/likeBlack.svg';

type ModalProps = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

export const MyMainModal: FC<ModalProps> = ({ id, setId }) => {
  const [photoData, setPhotoData] = useState<IUnsplashResults>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoData = await getPhotoById(id);
        if (photoData) setPhotoData(photoData);
        console.log(photoData);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {id && (
        <div className={classes.myModal} onClick={() => setId('')}>
          <div className={classes.photoInfo}>
            <div className={classes.headerPhoto}>
              <div className={classes.profileInfo}>
                <img src={photoData?.user.profile_image.medium} alt={photoData?.user.name} />
                <span>{photoData?.user.name}</span>
              </div>
              <div className={classes.downloadContainer}>
                <img className={classes.likeSvg} src={likeSvg} alt="likes" />
                <span>{photoData?.likes}</span>
                <button>Download</button>
              </div>
            </div>
            <img src={photoData?.urls.regular} alt={`image-${photoData?.description}`} />
          </div>
          <h2>{photoData?.likes}</h2>
        </div>
      )}
    </>
  );
};

export default MyMainModal;
