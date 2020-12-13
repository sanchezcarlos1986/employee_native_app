import React, {useState} from 'react';
import {StyleSheet, View, Modal, Image} from 'react-native';
import {TextInput, Button, ActivityIndicator, Colors} from 'react-native-paper';
import {theme} from '~/constants';
import {pickImageFrom} from '~/helpers/pickImageFrom';

const defaultAvatar =
  'https://kctherapy.com/wp-content/uploads/2019/09/default-user-avatar-300x293.png';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const uploadImage = async type => {
    setLoading(true);
    const imgURL = await pickImageFrom(type);

    if (imgURL) {
      setPicture(imgURL);
      setModal(false);
      setLoading(false);
    }
  };

  const createNewEmployee = () => {
    const data = {
      name,
      phone,
      email,
      salary,
      picture,
    };

    console.log('data:', {data});
  };

  return (
    <View style={styles.root}>
      <View style={styles.myImageView}>
        <Image
          style={styles.myImage}
          source={{uri: picture || defaultAvatar}}
        />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator animating={true} color={Colors.red800} />
        </View>
      ) : null}
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
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        style={styles.inputStyle}
        theme={theme}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Salary"
        value={salary}
        mode="outlined"
        style={styles.inputStyle}
        theme={theme}
        onChangeText={text => setSalary(text)}
      />
      <Button
        style={styles.inputStyle}
        icon={!picture ? 'upload' : 'check'}
        mode="contained"
        theme={theme}
        disabled={picture !== ''}
        onPress={() => setModal(true)}>
        Upload Image
      </Button>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={createNewEmployee}>
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
              onPress={() => uploadImage('camera')}>
              Camera
            </Button>
            <Button
              icon="image"
              mode="contained"
              theme={theme}
              onPress={() => uploadImage('gallery')}>
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

const imageSize = 140;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    paddingTop: 100,
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
  myImageView: {
    alignItems: 'center',
    marginBottom: 30,
  },
  myImage: {
    height: imageSize,
    width: imageSize,
    marginTop: -(imageSize / 2),
    borderRadius: imageSize / 2,
  },
});

export default CreateEmployee;
