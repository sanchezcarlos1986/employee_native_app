import React, {useState} from 'react';
import {StyleSheet, View, Image, Dimensions, Text} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {TextInputUI, Button} from '~/components';

const exampleImage = require('../../assets/logo.png');

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [user, setUser] = useState('sanchez.carlos.1986@gmail.com');
  const [password, setPassword] = useState('123dg');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (user && password) {
        if (user === 'sanchez.carlos.1986@gmail.com' && password.length >= 5) {
          setLoading(false);
          navigation.navigate('Home');
        } else {
          setLoading(false);
          setWarning('Usuario no encontrado...');
        }
      }
    }, 1300);
  };

  const hideDialog = () => setWarning('');

  return (
    <View style={styles.root}>
      <Image style={styles.logo} source={exampleImage} />
      <View style={styles.form}>
        <Portal>
          <Dialog visible={warning} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text>{warning}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setWarning('')}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <TextInputUI
          label="User"
          placeholder="email@domain.com"
          value={user}
          onChangeText={setUser}
        />
        <TextInputUI
          label="Password"
          placeholder="******"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          disabled={!user || !password}
          loading={loading}
          onPress={handleLogin}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: Dimensions.get('window').width - 50,
    height: 200,
  },
  form: {
    width: Dimensions.get('window').width - 50,
  },
});

export default Login;
