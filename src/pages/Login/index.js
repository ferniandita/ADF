/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Images from '../../assets';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {storeData, getData} from '../../localStorage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      dispatch({
        type: 'SET_LOGIN',
        value: res,
      });
      navigation.replace('MainApp');
    });
  });

  const login = () => {
    axios
      .post('http://api-test.q.camp404.com/public/api/login', {
        email: email,
        password: password,
        password_confirmation: password,
      })
      .then(response => {
        let res = response.data;
        dispatch({
          type: 'SET_LOGIN',
          value: {user: res.user, access_token: res.access_token},
        });
        storeData('user', {user: res.user, access_token: res.access_token});
        navigation.replace('MainApp');
      })
      .catch(error => {
        Alert.alert('Login failed.', error.response.data.message);
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Image source={Images.ILLogin} style={styles.image} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.emailInput}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.passwordInput}
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.breakLine} />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#6667AB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 175,
    height: 175,
    marginBottom: 50,
  },
  emailInput: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: '#FFFFFF',
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: '#FFFFFF',
  },
  breakLine: {
    backgroundColor: '#d1d1d1',
    marginVertical: 32,
    marginHorizontal: 16,
    height: 1,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#d79cb9',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
