import React,{useEffect, useState} from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistItemAction'
import Colors from '../constant/Colors';
import Currency from '../component/Currency';
import Htext from '../component/Htext';
import AntDesign from "react-native-vector-icons/AntDesign";

 const Items = (props) => { 
  const theme = useTheme();
  const [isfavorite, setIsFavorite] = useState([]);

 
    return (
      <View>
        <TouchableOpacity onPress={props.onPress}> 
          <View style={styles.top}>
            <Image source={{uri:  props.item.url}} resizeMode='stretch' style={{height: "100%", width:'100%'}}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

const styles = StyleSheet.create({
  top: {
   position: 'relative',
   width: Dimensions.get('screen').width / 2 - 20,
   height: 250,
   margin: 10,
   borderWidth:1,
   borderColor:Colors.mainText
  },
  titleStyle:{
    fontFamily:'Roboto',
    textAlign:'center',
    color:'gray',
    fontSize:25,
  },
  cover: {
    flexDirection:"row",
    justifyContent:"center",
  },
});

const mapStateToProps = (state) => ({
  wishlist: state.wishlistItemReducer,
});


const mapDispatchToProps = (dispatch) => ({
  addToWishlist: (wishlistItem) => dispatch(addToWishlist(wishlistItem)),
  removeFromWishlist: (Id) => dispatch(removeFromWishlist(Id)),
});

export default connect(mapStateToProps,mapDispatchToProps) (Items);