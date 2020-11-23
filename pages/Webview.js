import React, {useState, useRef} from 'react';
import {StyleSheet, SafeAreaView, View, Platform} from 'react-native';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen(props) {
  const webview = useRef(null);
  const [canGoBack, SetCanGoBack] = useState(false);
  const urlIndex = props.route.params.webUriIndex;

 switch (urlIndex) {
      case 1:
          var url = 'http://m.naver.com'
          break;
      case 2:
          var url = 'http://play-block.com/'
          break;
      case 3:
          var url = 'https://www.coupang.com/'
          break;
      case 4:
          var url = 'https://www.youtube.com/'
          break;
  
      default:
          break;
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (webview.current && canGoBack) {
          webview.current.goBack();
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [canGoBack]),
  );
  return (
    <SafeAreaView style={{width:'100%', height:'100%'}}>
      <WebView
        ref={webview}
        source={{uri: url}}
        style={{width:'100%', height:'100%'}}
        onNavigationStateChange={(navState) => {
          console.log(navState);
          SetCanGoBack(navState.canGoBack);
        }}
      />
    </SafeAreaView>
  );
}