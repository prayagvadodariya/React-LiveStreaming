import React, {useState, Component} from 'react';
import { useTheme } from '@ui-kitten/components';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { editFromCart, removeFromCart } from '../actions/cartItemAction';
import Card from '../component/Card';
import Htext from '../component/Htext';
import Ntext from '../component/Ntext';
import Currency from '../component/Currency';
import Colors from '../constant/Colors';
import Cbutton from '../component/Cbutton';
import Empty_Show from '../component/Empty_Show';
import BackgroundImage from '../component/BackgroundImage';
import Hairline from '../component/Hairline';
import AntDesign from "react-native-vector-icons/AntDesign";
import * as StaticData from '../constant/StaticData';

const Cart = (props) => {
  const theme = useTheme();
  console.log('data', props.route.params.item);
    return (
      <View style={{flex:1,backgroundColor: theme['background-basic-color-2']}}>
         <>
        <View style={styles.layout}>
          <Card cardwidth={95} cardheight={100}>
          {
          <BackgroundImage url={props.route.params.item.url} bradius={10}/>
          }
          </Card>
          <View style={{ flex:1,marginTop:15,marginRight:5 }}>
            <Ntext color={theme['text-custome-color']} lineheight={18} fontsize={18} fontfamily='PTSans-Regular'>{props.route.params.item.title}</Ntext>
            <Ntext color={Colors.gray} lineheight={18} fontsize={15} fontfamily='PTSans-Regular'>{props.route.params.item.subname}</Ntext>
              <Currency color={Colors.gray} fontsize={15} amount={props.route.params.item.amount}/>
            </View>
          </View>        
          <View style={{height:1.5}}>
           <Hairline height={0.5} mleftright={15} bcolor={Colors.gray}/>
          </View>
          </>      
       
          <View style={{ flexDirection:'row',margin:15 }}>
          <Htext color={theme['text-custome-color']} fontfamily='PTSans-Regular' fontsize={18}>Sub Total :</Htext> 
            <Currency  style={{flex:1, textAlign:'right', fontSize:18, color:theme['text-custome-color']}} currencyCode='INR' fontsize={18} amount={props.route.params.item.amount}/>
          </View>

          <Htext color={theme['text-custome-color']} fontfamily='PTSans-Regular' fontsize={18}>Shipping, textes, and discounts will be calculated at checkout.</Htext>
          
          <View style={{margin:18}}>
            <Cbutton textcolor={Colors.mainText} bcolor="transparent" bwidth='100%' bheight={42} bordercolor={Colors.mainText}>CHECKOUT</Cbutton> 
          </View>
    
      </View>
    );
  }

const styles = StyleSheet.create({
 layout: {
  flexDirection:"row",
  margin:5,
  marginTop: 10,
  backgroundColor: 'transparent',
 },
 icon:{
  flex:1,
  alignItems:"flex-end",
  marginRight:17,
  marginTop:10
},
});

const mapStateToProps = (state) => ({
  cartlist: state.cartItemReducer,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (Id) => dispatch(removeFromCart(Id)),
  editFromCart: (updateItem, index) => dispatch(editFromCart(updateItem, index)),
});

export default connect(mapStateToProps,mapDispatchToProps) (Cart);