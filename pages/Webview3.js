import React, {useState, useRef} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View, Platform, ActivityIndicator} from 'react-native';
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
    <>
        <WebView
          ref={webview}
          source={{uri: url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          originWhitelist={["*"]}
          scalesPageToFit={true}
          mixedContentMode={"always"}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          allowsBackForwardNavigationGestures={true}
          allowsLinkPreview={false}          
          style={{width:'100%', height:'100%'}}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator color='black' size='large' style={styles.flexContainer} />
          )}
          onNavigationStateChange={(navState) => {
            console.log(navState);
            SetCanGoBack(navState.canGoBack);
          }}
        />
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer : {
    flex:1,
    justifyContent:'center'
  }
});