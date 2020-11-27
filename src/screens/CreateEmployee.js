import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {theme} from '~/constants';
import * as ImagePicker from 'expo-image-picker';

const setNewFile = pickerResult => {
  const splittedUri = pickerResult.uri.split('.');
  const imgType = splittedUri[splittedUri.length - 1];

  const newFile = {
    uri: pickerResult.uri,
    type: `test/${imgType}`,
    name: `test.${imgType}`,
  };

  return newFile;
};

const uploadImageSetting = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: false,
  aspect: [1, 1],
  quality: 0.6,
};

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);

  const pickFromGallery = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync(
      uploadImageSetting,
    );

    const newFile = setNewFile(pickerResult);

    handleUploadImage(newFile);
  };

  const pickFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync(uploadImageSetting);

    const newFile = setNewFile(pickerResult);

    handleUploadImage(newFile);
  };

  const handleUploadImage = image => {
    const cloudName = 'daqb6phbs';
    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', 'hleqk5ei');
    formData.append('cloud_name', cloudName);

    const apiBaseURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    fetch(apiBaseURL, {
      method: 'post',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        // console.log('handleUpload =====>', {data});
        setPicture(data.url);
        setModal(false);
      });
  };

  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        value={name}
        mode="outlined"
        style={styles.inputStyle}
        theme={theme}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Phone"
        value={phone}
        mode="outlined"
        style={styles.inputStyle}
        keyboardType="number-pad"
        theme={theme}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        style={styles.inputStyle}
        theme={theme}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Salary"
        value={salary}
        mode="outlined"
        style={styles.inputStyle}
        theme={theme}
        onChangeText={text => setName(text)}
      />
      <Button
        style={styles.inputStyle}
        icon={!picture ? 'upload' : 'check'}
        mode="contained"
        theme={theme}
        onPress={() => setModal(true)}>
        Upload Image
      </Button>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={() => console.log('saved')}>
        Save
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={() => pickFromCamera()}>
              Camera
            </Button>
            <Button
              icon="image"
              mode="contained"
              theme={theme}
              onPress={() => pickFromGallery()}>
              Gallery
            </Button>
          </View>
          <Button icon="close" theme={theme} onPress={() => setModal(false)}>
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CreateEmployee;
