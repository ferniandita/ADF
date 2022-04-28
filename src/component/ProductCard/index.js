/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Images from '../../assets';
import {useNavigation} from '@react-navigation/native';

const currencyFormat = number => {
  return `$${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const ProductCard = ({id, title, desc, price, image, deletePress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.contentWrapper}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.desc} numberOfLines={3}>
          {desc}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          {currencyFormat(price)}
        </Text>
        <View style={styles.actionWrapper}>
          <TouchableOpacity onPress={() => deletePress()}>
            <View style={styles.actionButton}>
              <Image style={styles.actionDelete} source={Images.ICDelete} />
              {/* <Text style={styles.actionText}>Delete</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditProduct', {
                id: id,
                title: title,
                desc: desc,
                price: price,
                image: image,
              })
            }>
            <View style={styles.actionButton}>
              <Image style={styles.actionEdit} source={Images.ICEdit} />
              {/* <Text style={styles.actionText}>Edit</Text> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
    zIndex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 12,
    borderWidth: 5,
    borderColor: '#fff',
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 8,
    marginRight: 12,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  desc: {
    fontSize: 13,
    color: '#7a7a7a',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  actionWrapper: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
  actionButton: {
    borderRadius: 2,
    marginHorizontal: 7,
    paddingVertical: 3,
    alignContent: 'flex-end',
    flexDirection: 'row',
  },
  actionEdit: {
    width: 22,
    height: 22,
    tintColor: '#6667AB',
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionDelete: {
    width: 22,
    height: 22,
    tintColor: '#b4497e',
  },
});
