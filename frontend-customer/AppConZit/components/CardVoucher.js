import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

//import StarRating from './StarRating';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardVoucher = ({itemData, onPress, onPress2}) => {
  return (
    //<TouchableOpacity onPress={onPress}>
    <View>
        <View style={styles.card}>
            <TouchableOpacity style = {{flexDirection: 'row',flex: 9,}}
            onPress = {onPress2}>
                <View style={styles.cardImgWrapper}>
                    <Image
                        source={require('../assets/banners/VoucherCover.jpg')}
                        resizeMode="cover"
                        style={styles.cardImg}
                    />
                </View>
                <View style={styles.cardInfo}>
                    <Text numberOfLines={3} style={styles.cardTitle}>{itemData.mota}</Text>
                    {/* <Text style={styles.cardDetails}>Số lượng: {itemData.quantity}</Text>
                    <Text style={styles.cardDetails}>Giá: {itemData.foodCost * itemData.quantity}</Text> */}
                </View>
            </TouchableOpacity>

            {/* <Icon.Button
            name="remove"
            size={25}
            color={'#5d5d5d'}
            backgroundColor={'#f5f5f5'}
            onPress={() => {onPress}}
            /> */}
            <View style={styles.select}>
                <TouchableOpacity style={{alignSelf: 'center', marginLeft: 5}}
                onPress={onPress}>
                {/* <Icon
                    name="remove"
                    size={25}
                    color={'#5d5d5d'}
                    backgroundColor={'#f5f5f5'}  
                /> */}
                
                    <Text style = {{fontWeight: 'bold',fontSize: 18, alignSelf: 'center', }}>Chọn</Text>
                
                </TouchableOpacity>
            </View>
        </View>
    </View>
    //</TouchableOpacity>
  );
};

export default CardVoucher;

const styles = StyleSheet.create({
  card: {
    height: 80,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 3,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 6,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  select: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    //borderLeftWidth: 1,
    borderRadius: 8,
    //borderTopRightRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  cardTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
