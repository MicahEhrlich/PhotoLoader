import React from 'react';
const IMG_URL = 'https://picsum.photos/id';

const Image = props => {
  const { image, author, grayscale } = props;

  return (
    <div>
      {grayscale ? (
        <img alt='' src={`${IMG_URL}/${image}/300/300?grayscale`}></img>
      ) : (
        <img alt='' src={`${IMG_URL}/${image}/300/300`}></img>
      )}
      <h5>{author}</h5>
    </div>
  );
};
export default Image;
