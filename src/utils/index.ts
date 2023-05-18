export const createFormData = (files: FileList) => {
  const formData = new FormData();

  [...files].forEach((file) => {
    formData.append('images', file);
  });

  return formData;
};

export const getRandomNum = (max: number): number => {
  return Math.floor(Math.random() * max);
};
