import React, {useState, useEffect, Component} from 'react';
import { useTheme } from '@ui-kitten/components';
import { ScrollView, View, StyleSheet, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction } from '../actions/recentlyItemAction';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistItemAction';
import { addToCart, editFromCart } from '../actions/cartItemAction';
import ImageView from 'react-native-image-view';
import * as services from '../services/api';
import Loader from '../component/Loader';
import Colors from '../constant/Colors';
import Cbutton from '../component/Cbutton';
import Items from '../component/Items';
import Htext from '../component/Htext';
import Ntext from '../component/Ntext';
import Currency from '../component/Currency';
import CartButton from '../component/CartButton';
import Hairline from '../component/Hairline';
import AntDesign from "react-native-vector-icons/AntDesign";
import ActionButton from '../component/ActionButton';
import ImageSlider from 'react-native-image-slider';

const ProductDetails = (props) => {
  const [isfavorite, setIsFavorite] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const [product, setProduct] = useState();
  const [zoomimage, setZoomImage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme(); 

  useEffect(() => {
    if(props.wishlist.data.length!=0){
      setIsFavorite(props.wishlist.data.map((item) => {return item._id}))
    }else{
      setIsFavorite([])
    }
  }, [props.wishlist]);

  useEffect (() => {
    if(props.recentlyViewItem.length===10){
      if(props.recentlyViewItem.findIndex((em) => em._id===props.route.params.Producthandel._id)!=-1){
      var idchecker = props.recentlyViewItem.findIndex((em) => em._id===props.route.params.Producthandel._id);
      props.removeItemAction(idchecker)
      props.addItemAction(props.route.params.Producthandel)
      }else {
      props.removeItemAction(0)
      props.addItemAction(props.route.params.Producthandel)
      }
    }else {
      if(props.recentlyViewItem.findIndex((em) => em._id===props.route.params.Producthandel._id)!=-1){
      var idchecker = props.recentlyViewItem.findIndex((em) => em._id===props.route.params.Producthandel._id);
      props.removeItemAction(idchecker)
      props.addItemAction(props.route.params.Producthandel) 
      }
      else{
      props.addItemAction(props.route.params.Producthandel)
      }
    }
  },[])

  const reverseArray = () => {
  var newArray = [];
  for (var i = props.recentlyViewItem.length - 1; i >= 0; i--) {
    newArray.push(props.recentlyViewItem[i]);
  }
  return newArray; 
  }
  
  // const Parameter = (id) => {
  //   return  {
  //     "query":{
  //       "filter":`{\"collections.id\": { \"$hasSome\": ["${id}"]} }`,
  //       "paging": { 
  //         "limit": 10, 
  //         "offset": 0
  //       }
  //     }
  //   }
  // }

  useEffect (() => {
    let parameter = {
      q: props.route.params.Producthandel._id
    }
    services.getProductDetails(parameter).then(result => {
    setResult(result) 
    setLoading(false)
    // services.onProductsApi(Parameter(result.product.collectionIds[0])).then(data => {
    //   setProduct(data.products)
          
    //   })  
    })  
  },[props.route.params.Producthandel._id])

  const toggleFunction = () => {
    setIsVisible(!isVisible);
  }; 

  const onImageZoom = (val) => {
    setZoomImage(val)
    setVisible(true) 
  }

  const addWishlistItem = (item) => {
    let id = props.wishlist.data.findIndex((em) => em.id=== item._id);
    if(isfavorite.indexOf(item._id)>-1){    
      props.removeFromWishlist(id);
    }else{
      setIsFavorite([...isfavorite, item._id])
      const wishlistItem = {
        id: item._id,
        Image: "https://static.wixstatic.com/media/" + item.mainMedia.split("/")[3],
        title: item.name,
        currencyCode: item.currency,
        amount: item.price,
       }
      props.addToWishlist(wishlistItem);
    }
   }

  const addCartItem = (item) => {
    let check = props.cartlist.findIndex((em) => em.id=== item._id)

    if(check!=-1){
      var id = check
      var quantityget = props.cartlist[check]
      var count = parseInt(quantityget.quantity) + 1;
      const updateItem = {
        id: item._id,
        Image: "https://static.wixstatic.com/media/" + item.mainMedia.split("/")[3],
        title: item.name,
        currencyCode: item.currency,
        amount: item.price,
        quantity: count.toString()
      }
      props.editFromCart(updateItem,id);
    }
    else{
      const cardItem = {
        id: item._id,
        Image: "https://static.wixstatic.com/media/" + item.mainMedia.split("/")[3],
        title: item.name,
        currencyCode: item.currency,
        amount: item.price,
        quantity: "1"
      }
      props.addToCart(cardItem);
   }
  }

  const renderItem = ({ item,index }) => {
    return(
      <Items onPress={() => onReload(item)} item={item}/>
    )
  }

  const onReload = (item) => {
    props.navigation.push("ProductDetails",{ Producthandel: item })
  }

  if(loading===true && !result){
    return(
      <Loader/>
    )
  }
    return (
      <ScrollView style={{flex:1,backgroundColor: theme['background-basic-color-2']}}>
        <View style={{ alignSelf:'flex-start', margin:15 }}>
          <Htext color={theme['text-custome-color']} fontsize={20}>SKU: {result.items.sku}</Htext>
        </View>

        <View style={styles.imgslider}>
        {result.items.mediaItems.length!=0 ? (
          <ImageSlider
              loopBothSides={false}
              images={result.items.mediaItems}
              customSlide={({ index, item, style, width }) => {
              return(
                <TouchableOpacity onPress={() => onImageZoom("https://static.wixstatic.com/media/" + item.src.split("/")[3])} key={index} style={styles.top}>  
                  <ImageBackground source={{uri: "https://static.wixstatic.com/media/" + item.src.split("/")[3]}} resizeMode='stretch' style={{height: "100%", width:'100%'}}/>    
                </TouchableOpacity>
              )}}
          />
          ):(
            <TouchableOpacity style={styles.top}>  
              <ImageBackground source={require('../assets/images/default_image.png')} resizeMode='stretch' style={{height: "100%", width:'100%'}}/>    
            </TouchableOpacity>
            )}
        </View>  
        
        <ImageView
          glideAlways
          images={[{ source: {uri: zoomimage }}]}
          animationType='none'
          isVisible={visible}
          onClose={() => setVisible(false)}
        />

        <Htext style={{ alignSelf:'flex-start', color:theme['text-basic-color'], fontSize:35, fontFamily:'DustWest', marginLeft:15, marginTop:25, marginBottom:5 }}>{result.items.name}</Htext>  

        <View style={{flexDirection:'row'}}>
          <Currency style={{ flex:1,alignSelf:'flex-start', color:theme['text-custome-color'], fontSize:20, marginLeft:15 }} currencyCode={result.items.currency} amount={result.items.price}/>
          <TouchableOpacity onPress={() => addWishlistItem(result)} style={{ alignSelf:'flex-end', marginRight:15 }}>
            <AntDesign name={isfavorite.indexOf(result.id)>-1  ? 'heart' : 'hearto'} color={theme['text-custome-color']} size={25} />
          </TouchableOpacity>
        </View> 

        <View style={{margin:20}}>
          <CartButton bwidth={"100%"} onPress={() => addCartItem(result)}/>
        </View>

        <View style={{ margin:15 }}>
          <View style={{flexDirection:'row'}}>
            <Htext color={theme['text-custome-color']} fontsize={20}>Product Details :</Htext>
            <TouchableOpacity onPress={toggleFunction} style={{flex:1, marginTop:8, alignItems:"flex-end"}}>
              <AntDesign name={isVisible===false  ? 'down' : 'up'} color={theme['text-custome-color']} size={15}/>
            </TouchableOpacity>
          </View>
        </View>

        {isVisible ? 
          <View style={{ marginLeft:15, marginRight:15}}>
           <Ntext color={Colors.gray} fontsize={18} fontfamily='PTSans-Regular'>{result.items.description}</Ntext>
          </View>
        : null}

        <View style={{flexDirection: 'row', alignItems: 'center',margin:15}}>
          <Hairline/>
          <View style={{marginLeft:10, marginRight:10}}>
            <Htext color={theme['text-basic-color']} fontfamily='PTSans-Regular' fontsize={30}>Share</Htext>
          </View>
          <Hairline/>
        </View>

        <View style={styles.sharing}>
          <View style={styles.shar}><ActionButton icon='whatsapp'/></View>
          <View style={styles.shar}><ActionButton icon='facebook'/></View>
          <View style={styles.shar}><ActionButton icon='twitter'/></View>
          <View style={styles.shar}><ActionButton icon='instagram'/></View>
        </View>

        {/* {product.length!=0 ?
        <>
        <Htext style={{ color:theme['text-basic-color'], fontSize:31, fontFamily:'CHESTER-Basic', marginBottom:10, text:'center', textAlign:'center' }}>MORE IN THIS COLLECTION</Htext>

        <FlatList
          horizontal={true}
          data={product} 
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
        />

        <View style={{flex:1,justifyContent:'flex-end', alignItems:'flex-end', margin:20}}>
          <Cbutton onPress={() => props.navigation.navigate("ProductList",{ Producthandel: {id: result.collectionIds[0]} })} textcolor={Colors.mainText} bcolor="transparent" bwidth={120} bheight={42} bordercolor={Colors.mainText}>SEE ALL</Cbutton>
        </View>
        </>
        :null} */}

        {props.recentlyViewItem.length!=0 ?
        <>
        <Htext style={{ color:theme['text-basic-color'], fontSize:31, fontFamily:'CHESTER-Basic', marginBottom:10, text:'center', textAlign:'center' }}>RECENTLY VIEWED</Htext>
        <FlatList
          horizontal={true}
          data={reverseArray()} 
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
        />
        </>
        :null}
      </ScrollView>
    );
  }


const styles = StyleSheet.create({
 contenar: {
  flex:1, 
  justifyContent:'center',
  alignItems:'center',
 },
 imgslider: {
  marginLeft:15,
  marginRight:15
 },
 top: {
  width: Dimensions.get('screen').width /1 - 30,
  height: 390,
 },
 sharing: {
  justifyContent:'center',
  alignItems:'center',
  flexDirection:"row",
  marginBottom:15
 },
 shar: {
  marginLeft:10,
 }
});

const mapStateToProps = (state) => ({
  recentlyViewItem: state.recentlyItemReducer.data,
  wishlist: state.wishlistItemReducer,
  cartlist: state.cartItemReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  addItemAction: (Item) => dispatch(addItemAction(Item)),
  removeItemAction: (index) => dispatch(removeItemAction(index)),
  addToWishlist: (wishlistItem) => dispatch(addToWishlist(wishlistItem)),
  removeFromWishlist: (Id) => dispatch(removeFromWishlist(Id)),
  addToCart: (cardItem) => dispatch(addToCart(cardItem)),
  editFromCart: (updateItem,id) => dispatch(editFromCart(updateItem,id)),
});

export default connect(mapStateToProps, mapDispatchToProps) (ProductDetails);