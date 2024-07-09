export default function filterImages(images) {
  const ids = images.map(({ id }) => id);
  const filteredImages = images.filter(
    ({ id }, index) => !ids.includes(id, index + 1)
  );

  return filteredImages;
}
