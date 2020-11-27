import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {FAB} from 'react-native-paper';
import {artists} from '~/data/artists.json';
import ArtistCard from '~/components/ArtistCard';
import {theme} from '~/constants';

const Home = ({navigation}) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={artists}
        renderItem={({item}) => (
          <ArtistCard artist={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
      <FAB
        color="white"
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('CreateEmployee')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
