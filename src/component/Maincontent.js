import React, {useState, Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Colors from '../constant/Colors';
import BackgroundImage from '../component/BackgroundImage';
import Htext from './Htext';
import Ntext from './Ntext';
import Cbutton from './Cbutton';

const Maincontent = (props) => {
  
    return (
      <BackgroundImage height={380} url='https://static.wixstatic.com/media/913019_4ad1a433891b4dfe827c2b574e39a6f9~mv2_d_7132_4238_s_4_2.jpg/v1/fill/w_640,h_828,al_c,q_85,usm_0.66_1.00_0.01/913019_4ad1a433891b4dfe827c2b574e39a6f9~mv2_d_7132_4238_s_4_2.webp'>
        <React.Fragment>
          <View style={{ alignSelf:'flex-start',marginLeft:15, marginTop:20 }}>
            <Htext color={Colors.mainText} fontsize={27} fontfamily='CHESTER-Basic'>REACH YOUR</Htext>
                
            <View style={{marginRight:33, marginTop:-5}}>
              <Htext color={Colors.mainText} fontsize={27} fontfamily='CHESTER-Basic'>MAXIMUM</Htext>
            </View>
            <View style={{marginRight:34, marginTop:-5}}>
              <Htext color={Colors.mainText} fontsize={27} fontfamily='CHESTER-Basic'>CAPACITY</Htext>
            </View>
          </View>

          <View style={{width:"40%", marginLeft:20, marginTop:25}}>
            <Ntext color={Colors.normaltext} fontsize={15} fontfamily='PTSans-Regular'>Go further than you thought with CapacityX supplements.</Ntext>
          </View>

          <Image resizeMode="contain" style={{height:230, width:250, marginTop:-130, marginRight:-20, alignSelf:'flex-end'}} source={{ uri: 'https://static.wixstatic.com/media/913019_562ad9addc3e4706b470c099e1fdc2d6~mv2_d_2324_2699_s_2.png/v1/fill/w_344,h_400,al_c,q_85,usm_0.66_1.00_0.01/pouch-headera.webp' }}/>
        </React.Fragment> 
        <View style={{ marginTop:15 }}>
          <Cbutton onPress={props.onPress} textcolor={Colors.mainText} bcolor="transparent" bwidth={120} bheight={42} bordercolor={Colors.mainText}>Shop Now</Cbutton>
        </View>  
      </BackgroundImage> 
    );
  }


const styles = StyleSheet.create({
 contenar: {
  flex:1, 
  justifyContent:'center',
   alignItems:'center',
 }
});

export default Maincontent;