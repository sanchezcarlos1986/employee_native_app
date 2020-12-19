import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ActivityIndicator, Title} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {theme, defaultAvatar} from '~/constants';
import {TextInputUI, Button} from '~/components';
import {pickImageFrom} from '~/helpers/pickImageFrom';
import firebase from '~/database/firebase';

const CreateProfile = props => {
  const {
    navigation,
    route: {params: employee},
  } = props;

  const [name, setName] = useState(employee?.name || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [position, setPosition] = useState(employee?.position || '');
  const [salary, setSalary] = useState(employee?.salary || '');
  const [picture, setPicture] = useState(employee?.picture || '');
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

  const updateEmployee = async () => {
    const dbRef = await firebase.db.collection('employees').doc(employee.id);
    dbRef.set({
      name,
      phone,
      position,
      email: email.toLowerCase(),
      salary,
      picture,
    });

    navigation.navigate('Home');
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0033ff', '#6bc1ff']}
        style={{
          height: '20%',
        }}
      />
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
        <ScrollView style={styles.form}>
          <TextInputUI
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInputUI
            label="Phone"
            value={phone}
            keyboardType="number-pad"
            onChangeText={text => setPhone(text)}
          />
          <TextInputUI
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInputUI
            label="Position"
            value={position}
            onChangeText={text => setPosition(text)}
          />
          <TextInputUI
            label="Salary"
            value={salary}
            onChangeText={text => setSalary(text)}
          />
          <Button
            icon={!picture ? 'upload' : 'check'}
            onPress={() => setModal(true)}>
            Upload Image
          </Button>
          <Button
            icon="content-save"
            onPress={employee ? updateEmployee : createNewEmployee}>
            {employee ? 'Update profile' : 'Save'}
          </Button>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button icon="camera" onPress={() => uploadImage('camera')}>
                Camera
              </Button>
              <Button icon="image" onPress={() => uploadImage('gallery')}>
                Gallery
              </Button>
            </View>
            <Button icon="close" theme={theme} onPress={() => setModal(false)}>
              Close
            </Button>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const imageSize = 100;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: Dimensions.get('window').width - 50,
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
    marginBottom: 0,
  },
  myImage: {
    height: imageSize,
    width: imageSize,
    marginTop: -imageSize,
    borderRadius: imageSize / 2,
    borderColor: 'white',
    borderWidth: 3,
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

export default CreateProfile;
