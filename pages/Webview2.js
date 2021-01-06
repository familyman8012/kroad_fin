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
  const url = data[urlIndex].url

  
  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          ref={webviewRef}
          source={{uri: url}}
          style={{width:'100%', height:'100%'}}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator color='black' size='large' style={styles.flexContainer} />
          )}
          allowsBackForwardNavigationGestures={true}
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