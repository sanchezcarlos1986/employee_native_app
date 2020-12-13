import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Card} from 'react-native-paper';

const EmployeeCard = props => {
  const {employee, navigation} = props;
  const {id, picture, name, position} = employee;

  return (
    <Card
      key={id}
      onPress={() => navigation.navigate('Profile', {employee})}
      style={styles.card}>
      <View style={styles.cardView}>
        <Image source={{uri: picture}} style={styles.image} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{position}</Text>
        </View>
      </View>
    </Card>
  );
};

const size = 60;

const styles = StyleSheet.create({
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  card: {
    margin: 5,
  },
  text: {
    fontSize: 15,
  },
  image: {
    borderRadius: size / 2,
    height: size,
    width: size,
  },
});

export default EmployeeCard;
