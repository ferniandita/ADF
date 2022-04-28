/* eslint-disable prettier/prettier */
import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Images from '../../assets';
import { removeValue } from '../../localStorage';

const mapLink = 'https://goo.gl/maps/Zh1kG3b5bV6374qX7';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const mapRedirect = useCallback(async () => {
    const supported = await Linking.canOpenURL(mapLink);

    if (supported) {
      await Linking.openURL(mapLink);
    } else {
      Alert.alert(`Failed to open this URL: ${mapLink}`, '.');
    }
  }, []);

  const logout = () => {
    dispatch({
      type: 'SET_LOGOUT',
    });
    removeValue('user');
    navigation.replace('Login');
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.itemSetting}
          onPress={() => navigation.navigate('AddProduct')}>
          <Text style={styles.itemSettingText}>Add Product</Text>
          <Image source={Images.ICRightArrow} style={styles.rightIcon} />
        </TouchableOpacity>
        <View style={styles.breakLine} />
        <TouchableOpacity style={styles.itemSetting} onPress={mapRedirect}>
          <Text style={styles.itemSettingText}>Store Location</Text>
          <Image source={Images.ICRightArrow} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.btnLogout}
          onPress={() => logout()}>
          <Image source={Images.ICLogout} style={styles.btnLogoutIcon} />
          <Text style={styles.btnLogoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EFEFF6',
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'center',
  },
  container: {
    width: '96%',
    position: 'absolute', //Here is the trick
    top: 0, //Here is the trick
    paddingBottom: 12,
    marginHorizontal: 7,
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
    zIndex: 1,
    borderRadius: 5,
  },
  breakLine: {
    backgroundColor: '#d1d1d1',
    marginTop: 7,
    height: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2E41',
    marginBottom: 32,
  },
  itemSetting: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    paddingTop: 4,
    borderBottomWidthL: 1,
    borderBottomColor: '#F2F2F2',
  },
  rightIcon: {
    height: 16,
    width: 16,
  },
  itemSettingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F2E41',
  },
  btnWrapper: {
    width: '100%',
    padding: 16,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  btnLogout: {
    height: 45,
    width: '100%',
    backgroundColor: '#d79cb9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  btnLogoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnLogoutIcon: {
    marginRight: 10,
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
});
