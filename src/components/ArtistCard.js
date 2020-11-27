import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Card} from 'react-native-paper';

const ArtistCard = props => {
  const {artist, navigation} = props;
  const {id, uri, name, position} = artist;

  return (
    <Card
      style={styles.myCard}
      key={id}
      onPress={() => navigation.navigate('Profile', {artist})}>
      <View style={styles.cardView}>
        <Image style={styles.myImage} source={{uri}} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{position}</Text>
        </View>
      </View>
    </Card>
  );
};

const imageSize = 50;

const styles = StyleSheet.create({
  myCard: {
    margin: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  myImage: {
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
  },
  text: {
    fontSize: 15,
  },
});

export default ArtistCard;
