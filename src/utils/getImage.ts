const getImage = (
  imageUrlPrefix: string,
  image: string | null,
  secondImage: string | null
) => {
  if (image) {
    return `${imageUrlPrefix}${image}`;
  } else if (secondImage) {
    return `${imageUrlPrefix}${secondImage}`;
  } else {
    return "https://i0.wp.com/www.dobitaobyte.com.br/wp-content/uploads/2016/02/no_image.png?ssl=1";
  }
};

export default getImage;
