const handleUploadImage = async (image, setLoadingImage) => {
  const formData = new FormData();
  const CLOUD_NAME = 'daqb6phbs';
  const PRESET_NAME = 'hleqk5ei';

  formData.append('file', image);
  formData.append('upload_preset', PRESET_NAME);
  formData.append('cloud_name', CLOUD_NAME);

  setLoadingImage(true);

  const apiBaseURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const data = await fetch(apiBaseURL, {
    method: 'post',
    body: formData,
  })
    .then(res => res.json())
    .then(data => data);

  const imgURL = data?.url;
  return imgURL;
};

export default handleUploadImage;
