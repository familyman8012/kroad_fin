import React, {useState, useRef} from 'react';
import {StyleSheet, Share, Text, View,  ActivityIndicator, TouchableOpacity, ImageBackground} from 'react-native';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import { Button } from 'react-native-share';



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
  console.log('props.route.params.data.companyName는', urlData.companyName);

  const onShare = async () => { 
    try {      
      const result = await Share.share({
        message:url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbtn}>
            <ImageBackground source={require('../img/arrow_header_back.png')}  style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{urlData.companyName}</Text>
          <TouchableOpacity onPress={() => {onShare()}} style={styles.backbtn}>
            <ImageBackground source={require('../img/btnshare2.png')}  style={styles.image2} />
          </TouchableOpacity>
        </View>
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
  header : {display:'flex',flexDirection:'row', width:'100%',height:40,alignItems:'center',backgroundColor: 'black'},
  backbtn : {flex:1,width:40,height:40,justifyContent:'center'},
  headerTitle : {flex:1,color:'#ffffff',fontWeight:'bold',textAlign:'center'},
  image: {width:20,height:20,marginLeft:15,resizeMode: "cover"},
  image2 : {width:20,height:20,marginLeft:'auto',marginRight:15,resizeMode: "cover"},

  flexContainer : {
    flex:1,
    justifyContent:'center'
  }
});