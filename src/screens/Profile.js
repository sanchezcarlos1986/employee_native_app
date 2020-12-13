import React from 'react';
import {StyleSheet, View, Image, Text, Linking, Platform} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Button, Card, Title} from 'react-native-paper';
import {MaterialIcons, Entypo} from '@expo/vector-icons';
import {theme} from '~/constants';

const Profile = ({route}) => {
  const {
    params: {employee},
  } = route;

  const {picture, name, position, email, phone, salary} = employee;

  const openDial = tel => {
    const telBase = Platform.OS === 'android' ? 'tel' : 'telprompt';
    Linking.openURL(`${telBase}: ${tel}`);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0033ff', '#6bc1ff']}
        style={{
          height: '20%',
        }}
      />
      <View style={styles.myImageView}>
        <Image style={styles.myImage} source={{uri: picture}} />
      </View>
      <View style={styles.profileText}>
        <Title>{name}</Title>
        <Text>{position}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => Linking.openURL(`mailto:${email}`)}>
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#6bc1ff" />
          <Text style={styles.myText}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.myCard} onPress={() => openDial(phone)}>
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#6bc1ff" />
          <Text style={styles.myText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#6bc1ff" />
          <Text style={styles.myText}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 8,
        }}>
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => setModal(false)}>
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => setModal(false)}>
          Delete
        </Button>
      </View>
    </View>
  );
};

const imageSize = 150;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eee',
  },
  myImageView: {
    alignItems: 'center',
  },
  myImage: {
    height: imageSize,
    width: imageSize,
    marginTop: -(imageSize / 2),
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
});

export default Profile;
