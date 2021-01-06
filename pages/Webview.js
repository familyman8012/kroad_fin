import React, {useState, useRef} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View, Platform, ActivityIndicator} from 'react-native';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen(props) {
  const webview = useRef(null);
  const [canGoBack, SetCanGoBack] = useState(false);
  const urlIndex = props.route.params.webUriIndex;
  const data = props.route.params.data;
  function isUrl(element)  {
    if(element.id === urlIndex)  {
      return true;
    }
  }
  const urlData = data.find(isUrl);
  const url = urlData.url;
  console.log(url);

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