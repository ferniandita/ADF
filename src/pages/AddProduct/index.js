/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Header} from '../../component';
import Images from '../../assets';
import * as ImagePicker from "react-native-image-picker";
import {useSelector} from 'react-redux';
import axios from 'axios';
import QueryString from 'query-string';

const AddProduct = ({navigation}) => {
  const stateGlobal = useSelector(state => state);
  const [image, setImage] = useState();
  const [productName, setProductName] = useState('');
  const [description, setDesription] = useState('');
  const [price, setPrice] = useState('');

  const upload = () => {
    // Open image library;
    //console.log('coba');
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel || response.error) {
          Alert.alert('Choosing photo canceled.');
        } else {
          if (response?.assets[0]?.fileSize < 1000000) {
            setImage(response);
          } else {
            Alert.alert('File size should not be more than 500kb.');
          }
        }
        //console.log('cobaa' + response);
      },
    );
  };

  const save = async () => {
    if (productName === '' || description === '' || price === '') {
      Alert.alert('Data should not be empty.');
      return false;
    }

    const url = 'http://api-test.q.camp404.com/public/api/material';

    const data = QueryString.stringify({
      nama_barang: productName,
      deskripsi: description,
      harga: price,
      gambar: `data:image/jpg;base64,${image.assets[0].base64}`,
    });

    await axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer ${stateGlobal.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then(response => {
        Alert.alert('Success to add data.');
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Failed to add data.');
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Add Product'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.textInput}
          value={productName}
          onChangeText={setProductName}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          numberOfLines={3}
          multiline
          textAlignVertical={'top'}
          value={description}
          onChangeText={setDesription}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.textInput}
          keyboardType={'decimal-pad'}
          value={price}
          onChangeText={setPrice}
        />
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.uploadImage} onPress={() => upload()}>
          {image?.assets ? (
            <Image
              source={{uri: image?.assets[0].uri}}
              resizeMode={'cover'}
              style={styles.previewImage}
            />
          ) : (
            <Image source={Images.ICPlus} style={styles.plusIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSave} onPress={() => save()}>
          <Image source={Images.ICSave} style={styles.btnSaveIcon} />
          <Text style={styles.btnSaveText}>Save</Text>
        </TouchableOpacity>
        <TextInput />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EFEFF6',
  },
  container: {
    flex: 1,
    backgroundColor: '#EFEFF6',
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#d1d1d1',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#d1d1d1',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  uploadImage: {
    width: 100,
    height: 100,
    backgroundColor: '#d1d1d1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  btnSave: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d79cb9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 32,
  },
  btnSaveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnSaveIcon: {
    marginRight: 10,
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
});
