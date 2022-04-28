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

const EditProduct = ({navigation, route}) => {
  const stateGlobal = useSelector(state => state);
  const [productName, setProductName] = useState(route?.params?.title);
  const [desc, setDesc] = useState(route?.params?.desc);
  const [price, setPrice] = useState(route?.params?.price);
  const [img, setImg] = useState(route?.params?.image);
  const [image, setImage] = useState();
  const upload = () => {
    //Open Image Library;
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
          // setImage(response);
          // setImg(response.assets[0].urionse);
          if (response?.assets[0]?.fileSize < 1000000) {
            setImage(response);
          } else {
            Alert.alert('File size should not be more than 500kb.');
          }
        }
      }, //,
    );
  };

  const update = async () => {
    if (
      (productName === '' || productName === route?.params?.title) &&
      (desc === '' || desc === route?.params?.desc) &&
      (price === '' || price === route?.params?.price) &&
      image === undefined
    ) {
      Alert.alert('Data should not be empty.');
      return false;
    }
    const url = `http://api-test.q.camp404.com/public/api/material/${route?.params?.id}`;

    const data = QueryString.stringify({
      nama_barang: productName,
      deskripsi: desc,
      harga: price,
      gambar: image ? `data:image/jpg;base64,${image?.assets[0]?.base64}` : img,
    });

    await axios({
      method: 'PATCH',
      url: url,
      headers: {
        Authorization: `Bearer ${stateGlobal.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then(response => {
        Alert.alert('Success to update data.');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error.response.data);
        Alert.alert('Failed to update data.');
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Edit Product'} />
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
          value={desc}
          onChangeText={setDesc}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.textInput}
          value={price.toString()}
          onChangeText={setPrice}
        />
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.uploadImage} onPress={() => upload()}>
          {img || image ? (
            <Image
              source={{uri: image?.assets[0]?.uri || img}}
              resizeMode={'cover'}
              style={styles.previewImage}
            />
          ) : (
            <Image source={Images.ICPlus} style={styles.plusIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUpdate} onPress={() => update()}>
          <Image source={Images.ICSave} style={styles.btnUpdateIcon} />
          <Text style={styles.btnUpdateText}>Save Changes</Text>
        </TouchableOpacity>
        <TextInput />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;

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
  btnUpdate: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#d79cb9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 32,
  },
  btnUpdateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnUpdateIcon: {
    marginRight: 10,
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
});
