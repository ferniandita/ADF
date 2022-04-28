/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  // RefreshControl,
  Alert,
} from 'react-native';
import {ProductCard} from '../../component';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Home = () => {
  // const dummy = [
  //   {
  //     id: 1,
  //     title: 'Product Name',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
  //     price: '50000',
  //     image: 'https://source.unsplash.com/1600x900?shoes',
  //   },
  //   {
  //     id: 2,
  //     title: 'Product Name',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
  //     price: '50000',
  //     image: 'https://source.unsplash.com/1600x900?shoes',
  //   },
  //   {
  //     id: 3,
  //     title: 'Product Name',
  //     desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting',
  //     price: '50000',
  //     image: 'https://source.unsplash.com/1600x900?shoes',
  //   },
  // ];

  const stateGlobal = useSelector(state => state);
  const [data, setData] = useState();
  // const [refreshing, setRefreshing] = useState(false);
  // console.log('state global: ',  stateGlobal);

  const renderItem = ({item}) => (
    <ProductCard
      id={item.id}
      title={item.nama_barang}
      desc={item.deskripsi}
      price={item.harga}
      image={item.gambar}
      deletePress={() => deleteProduct(item.id)}
    />
  );

  useEffect(() => {
    // onRefresh();
    // return onRefresh();
    axios
      .get('http://api-test.q.camp404.com/public/api/material', {
        headers: {Authorization: `Bearer ${stateGlobal.access_token}`},
      })
      .then(response => {
        let res = response.data;
        setData(res.materials);
      })
      .catch(error => {
        console.log(error);
      });
  });

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setData();

  //   axios
  //     .get('http://api-test.q.camp404.com/public/api/material', {
  //       headers: {Authorization: `Bearer ${stateGlobal.access_token}`},
  //     })
  //     .then(response => {
  //       let res = response.data;
  //       setData(res.materials);
  //       setRefreshing(false);
  //     })
  //     .catch(error => {
  //       setRefreshing(false);
  //       Alert.alert('Failed to load data.');
  //     });
  // });

  const deleteProduct = async id => {
    try {
      const DeleteProduct = await axios({
        method: 'delete',
        url: `http://api-test.q.camp404.com/public/api/material/${id}`,
        headers: {
          Authorization: `Bearer ${stateGlobal.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (DeleteProduct.status === 200) {
        Alert.alert('Success to delete data.');
      }
    } catch (error) {
      Alert.alert('Failed to delete data.');
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={<View style={styles.footer} />}
        // style={styles.container}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EFEFF6',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2E41',
    marginBottom: 16,
  },
  footer: {
    height: 30,
  },
});
