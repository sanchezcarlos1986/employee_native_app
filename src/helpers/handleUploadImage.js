const handleUploadImage = (image, setPicture, setModal) => {
  const formData = new FormData();
  const CLOUD_NAME = 'daqb6phbs';
  const PRESET_NAME = 'hleqk5ei';

  formData.append('file', image);
  formData.append('upload_preset', PRESET_NAME);
  formData.append('cloud_name', CLOUD_NAME);

  const apiBaseURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  fetch(apiBaseURL, {
    method: 'post',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      console.log('handleUploadImage =====>', {data});
      setPicture(data.url);
      setModal(false);
    });
};

export default handleUploadImage;
