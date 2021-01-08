import React, {useRef, useState} from 'react'
import { SafeAreaView, StyleSheet, StatusBar, ActivityIndicator,  View,  TouchableOpacity,  Text } from 'react-native'
import WebView from 'react-native-webview'

export default function HomeScreen(props) {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const backButtonHandler = () => {
  if (webviewRef.current) webviewRef.current.goBack()
}

 const frontButtonHandler = () => {
  if (webviewRef.current) webviewRef.current.goForward()
}
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

  
  return (
    <>
      <SafeAreaView style={styles.flexContainer}>       
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
            setCanGoBack(navState.canGoBack)
            setCanGoForward(navState.canGoForward)
            setCurrentUrl(navState.url)
          }}
        />
      </SafeAreaView>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={backButtonHandler}>
          <Text style={styles.button}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={frontButtonHandler}>
          <Text style={styles.button}>Forward</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer : {
    flex:1,
    justifyContent:'center'
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b43757'
  },
  button: {
    color: 'white',
    fontSize: 24
  }
});