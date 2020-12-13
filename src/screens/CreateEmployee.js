import React, {useState} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {theme} from '~/constants';
import {pickImageFrom} from '~/helpers';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);

  const uploadImage = type => pickImageFrom(type, setPicture, setModal);

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
