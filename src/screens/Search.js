import React, {useState, useEffect, Component} from 'react';
import { useTheme } from '@ui-kitten/components';
import { View, StyleSheet, Text } from 'react-native';
import {  NodePlayerView, NodeCameraView } from 'react-native-nodemediaclient';

const config = {
  cameraConfig: {
    cameraId: 1,
    cameraFrontMirror: false
  },
  videoConfig: {
    preset: 4,
    bitrate: 2000000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
  audioConfig: {
    bitrate: 128000,
    profile: 1,
    samplerate: 44100,
  }
};

const Search = () => {
  const theme = useTheme();
  const cameraViewRef = React.useRef(null);
  const streamKey = '5b2a4a75-86c2-177c-72a2-45ab2b5e2583';
  const url = `rtmps://global-live.mux.com:443/app/${streamKey}`;

    return (
      <View style={{flex:1, backgroundColor: theme['background-basic-color-2'] }}>
        <NodeCameraView
          style={{width:"100%", height:"100%"}}
          ref={cameraViewRef}
          outputUrl={url}
          camera={config.cameraConfig}
          audio={config.audioConfig}
          video={config.videoConfig}
          autopreview={true}
        /> 
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


export default Search;