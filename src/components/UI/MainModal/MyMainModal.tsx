import React, { FC, useEffect, useState } from 'react';
import { getPhotoById } from '../../../utils/api';
import { IUnsplashGetPhoto } from '../../../interfaces';
import classes from './MyMainModal.module.scss';
import cardClasses from '../../MainCard/MainCard.module.scss';
import likeSvg from '../../../assets/likeBlack.svg';

type ModalProps = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  clientKey: string;
};

export const MyMainModal: FC<ModalProps> = ({ clientKey, id, setId }) => {
  const [photoData, setPhotoData] = useState<IUnsplashGetPhoto>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoData = await getPhotoById(clientKey, id);
        if (photoData) setPhotoData(photoData);
        console.log(photoData);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [clientKey, id]);
  const returnDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  return (
    <>
      {id && (
        <div className={classes.myModal} onClick={() => setId('')}>
          <div className={classes.close}></div>
          <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={classes.headerPhoto}>
              <div className={classes.profileInfo}>
                <a href={photoData?.user.links.html} target="_blank" rel="noreferrer">
                  <img src={photoData?.user.profile_image.medium} alt={photoData?.user.name} />
                  <span>{photoData?.user.name}</span>
                </a>
              </div>
              <div className={classes.downloadContainer}>
                <img className={classes.likeSvg} src={likeSvg} alt="likes" />
                <span>{photoData?.likes}</span>
                <a
                  className={classes.downloadLink}
                  target="_blank"
                  href={photoData?.links.download}
                  rel="noreferrer"
                >
                  <span>Download</span>
                </a>
              </div>
            </div>
            <img
              className={classes.photo}
              src={photoData?.urls.regular}
              alt={`image-${photoData?.description}`}
            />
            <div className={classes.footerPhoto}>
              <div>
                <div className={classes.viewsDownloads}>
                  <div>
                    <h3>Views</h3>
                    <p>{photoData?.views.toLocaleString('en-US')}</p>
                  </div>
                  <div>
                    <h3>Downloads</h3>
                    <p>{photoData?.downloads.toLocaleString('en-US')}</p>
                  </div>
                </div>
                <p className={classes.paragraphGrey}>{photoData?.location.name}</p>
              </div>
              <p className={classes.photoDescription}>
                {photoData?.description || photoData?.alt_description}
              </p>
              <div className={classes.exifInfo}>
                <p>Created on {photoData?.created_at && returnDate(photoData.created_at)}</p>
                {photoData?.exif.model && (
                  <div>
                    <p className={classes.paragraphGrey}>Camera</p> <p>{photoData?.exif.model}</p>
                  </div>
                )}
                {photoData?.exif.iso && (
                  <div>
                    <p className={classes.paragraphGrey}>Lens</p>
                    <p>
                      {photoData?.exif.focal_length}mm f/{photoData?.exif.aperture}
                    </p>
                    <p>{photoData?.exif.exposure_time}s</p>
                    <p>ISO {photoData?.exif.iso}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.tagsSection}>
              <p>Related tags</p>
              <div className={cardClasses.tagsContainer}>
                {photoData?.tags.length &&
                  photoData.tags.map((el, ind) => (
                    <span className={cardClasses.tag} key={ind}>
                      {el.title}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyMainModal;
