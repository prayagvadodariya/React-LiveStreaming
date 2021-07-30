import React, {useState, useEffect, Component} from 'react';
import { useTheme } from '@ui-kitten/components';
import { View, StyleSheet, Text } from 'react-native';

const Wishlist = () => {
  const theme = useTheme();

    return (
      <View style={{flex:1,backgroundColor: theme['background-basic-color-2'], justifyContent:'center', alignItems:'center'}}>
        <Text>Wishlist</Text>
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
});


export default Wishlist;