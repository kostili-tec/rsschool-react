import React, { FC } from 'react';
import { useGetPhotoByIdQuery } from '../../../../redux/store/api/api';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import classes from './MainModal.module.scss';
import cardClasses from '../MainCard/MainCard.module.scss';
import likeSvg from '../../../../assets/likeBlack.svg';

type ModalProps = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

export const MainModal: FC<ModalProps> = ({ id, setId }) => {
  const { data, isFetching } = useGetPhotoByIdQuery(id);

  const returnDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <>
      {!isFetching ? (
        <div className={classes.myModal} onClick={() => setId('')}>
          <div data-cy="close-modal" className={classes.close}></div>
          <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={classes.headerPhoto}>
              <div className={classes.profileInfo}>
                <a href={data?.user.links.html} target="_blank" rel="noreferrer">
                  <img src={data?.user.profile_image.medium} alt={data?.user.name} />
                  <span>{data?.user.name}</span>
                </a>
              </div>
              <div className={classes.downloadContainer}>
                <img className={classes.likeSvg} src={likeSvg} alt="likes" />
                <span>{data?.likes}</span>
                <a
                  className={classes.downloadLink}
                  target="_blank"
                  href={data?.links.download}
                  rel="noreferrer"
                >
                  <span>Download</span>
                </a>
              </div>
            </div>
            <img
              className={classes.photo}
              src={data?.urls.regular}
              alt={`image-${data?.description}`}
            />
            <div className={classes.footerPhoto}>
              <div>
                <div className={classes.viewsDownloads}>
                  <div>
                    <h3>Views</h3>
                    <p>{data?.views.toLocaleString('en-US')}</p>
                  </div>
                  <div>
                    <h3>Downloads</h3>
                    <p>{data?.downloads.toLocaleString('en-US')}</p>
                  </div>
                </div>
                <p className={classes.paragraphGrey}>{data?.location.name}</p>
              </div>
              <p className={classes.photoDescription}>
                {data?.description || data?.alt_description}
              </p>
              <div className={classes.exifInfo}>
                <p>Created on {data?.created_at && returnDate(data.created_at)}</p>
                {data?.exif.model && (
                  <div>
                    <p className={classes.paragraphGrey}>Camera</p> <p>{data?.exif.model}</p>
                  </div>
                )}
                {data?.exif.iso && (
                  <div>
                    <p className={classes.paragraphGrey}>Lens</p>
                    <p>
                      {data?.exif.focal_length}mm f/{data?.exif.aperture}
                    </p>
                    <p>{data?.exif.exposure_time}s</p>
                    <p>ISO {data?.exif.iso}</p>
                  </div>
                )}
              </div>
            </div>
            {data?.tags && (
              <div className={classes.tagsSection}>
                <p>Related tags</p>
                <div className={cardClasses.tagsContainer}>
                  {data?.tags.length &&
                    data.tags.map((el, ind) => (
                      <span className={cardClasses.tag} key={ind}>
                        {el.title}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MainModal;
