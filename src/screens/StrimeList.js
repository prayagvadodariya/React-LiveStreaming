import React, {useState, useEffect, Component} from 'react';
import { useTheme, Input } from '@ui-kitten/components';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Avatar ,ListItem, Button} from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import Entypo from "react-native-vector-icons/Entypo";
import * as StaticData from '../constant/StaticData';
import { useToast } from 'react-native-fast-toast'
import Items from '../component/Items';
import Hairline from '../component/Hairline';
import Colors from '../constant/Colors';
import Video from "react-native-video";

const StrimeList = (props) => {
  const theme = useTheme();
  const toast = useToast();
  const [value, setValue] = React.useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [visible, setVisible] = useState(false);

  const onCart = (items) => {
    setVisible(false);
    props.navigation.navigate("Cart",{ item: items })
  }
  
  const onAddCart = () => {
    toast.show('Cart Add Successfully', { type: "success", icon: <AntDesign name="check" color='#fff' size={20} />  });
    setVisible(false);
  }

  const renderItem = ({ item,index }) => {
    return(
      <Items item={item}/>
    )
  }

  const renderProductListItem = ({item,index}) =>{
    return(
        <ListItem>
          <Avatar
           rounded
           size={35}
           resizeMode='stretch'
           source={{ uri: item.url}}
          />
          <ListItem.Content>
            <ListItem.Title style={{color:'#000', fontWeight:'bold', width:300}}>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{item.subname}</ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity onPress={() => onCart(item)}>
            <AntDesign name="shoppingcart" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAddCart()}>
            <Entypo name="shareable" size={25} />
          </TouchableOpacity>
        </ListItem>
    )
  }

    return (
      <View style={{flex:1,backgroundColor: theme['background-basic-color-2']}}>
        <Video
          source={{uri:'http://techslides.com/demos/sample-videos/small.mp4'}}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
          />
        <ListItem containerStyle={{backgroundColor:'transparent', position:'absolute'}}>
          <Avatar
            rounded
            size={35}
            resizeMode='stretch'
            source={{ uri: 'https://reqres.in/img/faces/8-image.jpg'}}
          />
          <ListItem.Content>
            <ListItem.Title style={{color:'#000', fontWeight:'bold', width:300}}>Michael Lawson</ListItem.Title>
          </ListItem.Content>
          <AntDesign name="down" size={18} style={{marginRight:-5}}/>
          <View style={{backgroundColor:'#C13584', width:40, height:25, borderRadius:2, marginRight:-2}}>
            <Text style={{color:'#f1f1f1', fontSize:14,margin:2, justifyContent:'center', alignSelf:'center'}}>LIVE</Text>
          </View>
          <View style={{flexDirection:'row', marginRight:28}}>
            <Entypo name="eye" size={18}/>
            <Text>12k</Text>
          </View>
        </ListItem>


        <View style={{height:"18%", justifyContent:'flex-end', flex:1}}>
        <ListItem containerStyle={{backgroundColor:'transparent'}}>
          <ScrollView style={{height:40}}>
            
            <View style={{flexDirection:'row'}}>
              <Avatar
              rounded
              size={35}
              resizeMode='stretch'
              source={{ uri: 'https://reqres.in/img/faces/8-image.jpg'}}
            />
            <ListItem.Content>
              <ListItem.Title style={{color:'#000', fontWeight:'bold', width:300, marginLeft:10, marginRight:10}}>Michael Lawson</ListItem.Title>
              <ListItem.Subtitle style={{marginRight:10, marginLeft:10}}>we have to do this again guyssss!</ListItem.Subtitle>
            </ListItem.Content>
            <AntDesign style={{alignSelf:'center'}} name="hearto" size={18} />
            </View>
            <View style={{flexDirection:'row'}}>
              <Avatar
              rounded
              size={35}
              resizeMode='stretch'
              source={{ uri: 'https://reqres.in/img/faces/8-image.jpg'}}
            />
            <ListItem.Content>
              <ListItem.Title style={{color:'#000', fontWeight:'bold', width:300, marginLeft:10, marginRight:10}}>Michael Lawson</ListItem.Title>
              <ListItem.Subtitle style={{marginRight:10, marginLeft:10}}>we have to do this again guyssss!</ListItem.Subtitle>
            </ListItem.Content>
            <AntDesign style={{alignSelf:'center'}} name="hearto" size={18} />
            </View>
          </ScrollView>
  
        </ListItem>  
        <View style={{height:1.5}}>
        <Hairline height={0.5} mleftright={15} bcolor={Colors.gray}/>
        </View>
        <View style={{flexDirection:'row'}}>
        <Input
          style={{margin:10, borderRadius:20, width:"55%"}}
          placeholder='Add a Comment....'
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
        />
        <AntDesign name="sharealt" size={20} style={{alignSelf:'center',marginRight:20, marginLeft:20}} />
        <TouchableOpacity onPress={showModal} style={{alignSelf:'center',marginRight:15, marginLeft:15}}>
        <Entypo name="layers" size={20}  />
        </TouchableOpacity>
        </View>
       </View>

       <Dialog
          height="40%"
          width='100%'
          containerStyle={{flex:1,justifyContent:'flex-end', alignItems:'flex-end', marginBottom:-10}}
          dialogStyle={{borderTopLeftRadius:5, borderTopRightRadius:5, backgroundColor: theme['background-basic-color-2']}}
          onTouchOutside={() => {
          setVisible(false)
          }}
          visible={visible} onPress={hideModal}
          dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',})}>
          <DialogContent>
            <ScrollView>
              <View style={{ marginTop:15, alignSelf:'center'}}>
                <Hairline style={{height:5, width:40, backgroundColor:Colors.gray, borderRadius:30,alignItems:'center'}} />
              </View>
              <FlatList  
                numColumns={1}
                data={StaticData.Liveprodut} 
                keyExtractor={(item, index) => String(index)}
                renderItem={renderProductListItem}
              />   
            </ScrollView>
          </DialogContent>
        </Dialog>
      </View>
    );
  }

const styles = StyleSheet.create({
 textcontent:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.3)'
},
backgroundVideo: {
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  alignItems: "stretch",
  bottom: 0,
  right: 0
}
});


export default StrimeList;