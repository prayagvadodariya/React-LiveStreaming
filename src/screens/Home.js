import React, {useEffect, useState, Component} from 'react';
import { useTheme } from '@ui-kitten/components';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import Maincontent from '../component/Maincontent';
import Colors from '../constant/Colors';
import Htext from '../component/Htext';
import Ntext from '../component/Ntext';
import Addtocart from '../component/Addtocart';
import Cbutton from '../component/Cbutton';
import ShowImage from '../component/ShowImage';
import BackgroundImage from '../component/BackgroundImage';
import * as StaticData from '../constant/StaticData';
import ActionButton from 'react-native-simple-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as services from '../services/api';

const Home = (props) => {
  const theme = useTheme();

  useEffect (() => { 
    services.getMux().then(data => {
    console.log("MoxliveStream",data)
    })
  },[])

    return (
        <View style={{ flex:1,backgroundColor: '#f3f3f3'}}>
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => props.navigation.navigate("StrimeList")}> 
          {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}
        </ActionButton>
      </View>
    );
  }


const styles = StyleSheet.create({
 contenar: {
  flex:1, 
  justifyContent:'center',
  alignItems:'center',
 },
 product: {
  borderColor: Colors.mainText,
  borderWidth:3,
  margin:15,
  height:430
 },
 content: {
  borderColor: Colors.mainText,
  borderWidth:2,
  marginTop:-35,
  marginLeft:20,
  marginRight:35,
  marginBottom:35,
  height:460
},
 sidebutton: {
  marginRight:10,
  width: 50,
  height: 50,
  backgroundColor:'transparent',
  borderColor: Colors.mainText,
  borderRadius:25,
  marginTop:-80,
  borderWidth:1
 },
 fab: {
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0,
},
actionButtonIcon: {
  fontSize: 20,
  height: 22,
  color: 'white',
},
});

export default Home;