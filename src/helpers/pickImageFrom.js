import * as ImagePicker from 'expo-image-picker';
import {handleUploadImage, setNewFile} from '~/helpers';

const uploadImageSetting = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: false,
  aspect: [1, 1],
  quality: 0.6,
};

const pickImageFrom = async (pickerType, setPicture, setModal) => {
  if (pickerType !== 'camera' && pickerType !== 'gallery') return false;

  const permissionType =
    pickerType === 'gallery'
      ? 'requestCameraRollPermissionsAsync'
      : 'requestCameraPermissionsAsync';
  const launchType =
    pickerType === 'gallery' ? 'launchImageLibraryAsync' : 'launchCameraAsync';

  const permissionResult = await ImagePicker[permissionType]();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker[launchType](uploadImageSetting);

  const newFile = setNewFile(pickerResult);

  handleUploadImage(newFile, setPicture, setModal);
};

export default pickImageFrom;
