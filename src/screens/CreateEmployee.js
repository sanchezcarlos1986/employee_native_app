import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TextInput, Button, ActivityIndicator, Title} from 'react-native-paper';
import {theme, defaultAvatar} from '~/constants';
import Constants from 'expo-constants';
import {pickImageFrom} from '~/helpers/pickImageFrom';
import firebase from '~/database/firebase';

const CreateEmployee = ({navigation}) => {
  const [name, setName] = useState('Carlos');
  const [phone, setPhone] = useState('9999');
  const [email, setEmail] = useState('carlos@gmail.com');
  const [position, setPosition] = useState('Front End Developer');
  const [salary, setSalary] = useState('999999');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const uploadImage = async type => {
    const imgURL = await pickImageFrom(type, setLoadingImage);

    if (imgURL) {
      setPicture(imgURL);
      setModal(false);
      setLoadingImage(false);
    }
  };

  const createNewEmployee = async () => {
    if (name && email) {
      setCreatingUser(true);

      const newEmployee = {
        name,
        phone,
        position,
        email: email.toLowerCase(),
        salary,
        picture: picture || defaultAvatar,
      };

      const response = await firebase.db
        .collection('employees')
        .add(newEmployee);

      response && navigation.navigate('Home');
    } else {
      alert('Must enter a name and an email');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.myImageView}>
            <Image
              style={styles.myImage}
              source={{uri: picture || defaultAvatar}}
            />
          </View>
          <Modal animationType="slide" visible={creatingUser || loadingImage}>
            <View style={styles.modalUser}>
              <Title style={styles.modalUserTitle}>
                {creatingUser ? 'Creating User' : 'Uploading Image'}
              </Title>
              <ActivityIndicator
                animating={true}
                color={theme.colors.primary}
                size="large"
              />
            </View>
          </Modal>
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
            label="Position"
            value={position}
            mode="outlined"
            style={styles.inputStyle}
            theme={theme}
            onChangeText={text => setPosition(text)}
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
              <Button
                icon="close"
                theme={theme}
                onPress={() => setModal(false)}>
                Close
              </Button>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const imageSize = 140;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    paddingTop: Constants.statusBarHeight,
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
    marginTop: Constants.statusBarHeight / 2,
  },
  modalUser: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalUserTitle: {
    marginBottom: 16,
  },
});

export default CreateEmployee;
