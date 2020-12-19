import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {FAB, Title, ActivityIndicator, TextInput} from 'react-native-paper';
import {EmployeeCard, TextInputUI} from '~/components';
import {theme} from '~/constants';
import firebase from '~/database/firebase';

const Home = ({navigation}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.db.collection('employees').onSnapshot(querySnapshot => {
      const users = [];

      querySnapshot.docs.forEach(doc => {
        const {name, ...rest} = doc.data();

        users.push({
          id: doc.id,
          name,
          ...rest,
        });
      });

      setLoading(false);
      setEmployees(users);
    });
  }, []);

  useEffect(() => {
    const results = employees.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    Array.isArray(results) && results.length
      ? setSearchResults(results)
      : setSearchResults(employees);
  }, [searchTerm, employees]);

  return (
    <View style={styles.root}>
      {loading ? (
        <View style={styles.emptyList}>
          <ActivityIndicator
            animating={true}
            color={theme.colors.primary}
            size="large"
          />
        </View>
      ) : Array.isArray(employees) && employees.length ? (
        <View>
          <TextInputUI
            label="Search Doctor"
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            left={<TextInput.Icon name="account-search" />}
          />
          <FlatList
            data={searchResults}
            renderItem={({item}) => (
              <EmployeeCard employee={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <View style={styles.emptyList}>
          <Title>No has ingresado datos todavía</Title>
        </View>
      )}
      <FAB
        color="white"
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('CreateProfile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputStyle: {
    margin: 5,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
