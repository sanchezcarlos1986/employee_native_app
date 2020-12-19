import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import {DataTable, Title, FAB} from 'react-native-paper';
import firebase from '~/database/firebase';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {Button} from '~/components';
import {theme, defaultAvatar} from '~/constants';

const Profile = ({route, navigation}) => {
  const {
    params: {employee},
  } = route;

  const {id, picture, name, position, email, phone, salary} = employee;

  const openDial = tel => {
    const telBase = Platform.OS === 'android' ? 'tel' : 'telprompt';
    Linking.openURL(`${telBase}: +${tel}`);
  };

  const deleteUser = async id => {
    const dbRef = await firebase.db.collection('employees').doc(id);
    dbRef.delete();
    navigation.navigate('Home');
  };

  const openConfirmationAlert = () => {
    Alert.alert('Remove User', 'Are you sure?', [
      {text: 'Yes', onPress: () => deleteUser(id)},
      {text: 'No', onPress: () => console.log(id), style: 'cancel'},
    ]);
  };

  const shareProfile = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('this device can not share :(');
    }

    const html = `<div>
    <img width="${
      Dimensions.get('window').width
    }" src="${picture}" alt="${name}" />
      <h1>${name}</h1>
      <h4>${position}</h4>
      <p>Email: ${email}</p>
      <p>Phone: +${phone}</p>
    </div>`;

    const pdfOptions = {
      html,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };

    const {uri} = await Print.printToFileAsync(pdfOptions);

    await Sharing.shareAsync(uri);
  };

  return (
    <View style={styles.root}>
      <View style={styles.myImageView}>
        <Image
          style={styles.myImage}
          source={{uri: picture || defaultAvatar}}
        />
      </View>
      <View style={styles.profileText}>
        <Title>{name}</Title>
        <Text>{position}</Text>
      </View>

      <DataTable.Row>
        <DataTable.Cell>Email</DataTable.Cell>
        <DataTable.Cell onPress={() => Linking.openURL(`mailto:${email}`)}>
          {email}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Phone</DataTable.Cell>
        <DataTable.Cell onPress={() => openDial(phone)}>{phone}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Position</DataTable.Cell>
        <DataTable.Cell>{position}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Salary</DataTable.Cell>
        <DataTable.Cell>{`$${salary}`}</DataTable.Cell>
      </DataTable.Row>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 8,
        }}>
        <Button
          icon="account-edit"
          onPress={() => navigation.navigate('CreatePatient', employee)}>
          Edit
        </Button>
        <Button
          icon="delete"
          theme={{colors: {primary: '#c0392b'}}}
          onPress={() => openConfirmationAlert(id)}>
          Delete
        </Button>
      </View>
      <FAB
        color="white"
        style={styles.fab}
        small
        icon="share-variant"
        onPress={shareProfile}
      />
    </View>
  );
};

const imageSize = 150;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  myImageView: {
    alignItems: 'center',
  },
  myImage: {
    height: imageSize,
    width: imageSize,
    marginTop: imageSize / 3,
    marginBottom: 20,
    borderRadius: imageSize / 2,
  },
  profileText: {
    alignItems: 'center',
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  myCard: {
    margin: 5,
  },
  myText: {
    marginLeft: 5,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Profile;
