import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableHighlight, Share, ActivityIndicator, StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { BlurView } from "@react-native-community/blur";
import Swiper from 'react-native-swiper'


const { width } = Dimensions.get('window');

const animation = new Animated.Value(0);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);
const anitest = () => {
  const downAni = Animated.timing(
    animation,
    {
      toValue: 0,
      duration: 0,
      useNativeDriver: true
    }
  );
  const upAni = Animated.timing(
    animation,
    {
      toValue: -195,
      duration: 500,
      useNativeDriver: true
    }
  );   
  Animated.sequence([
    downAni,
    upAni,
  ]).start();    
}


// alert(AffilatedCompanys[0].companyName);
function shuffleArray(array) {
  let i = array.length - 1; 
  for (i; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function AffilatedCompany(props) {   
  const [AffilatedCompanys2, setAffilatedCompanys2] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [curIndex, setcurIndex] = useState(0);
  const [startSwipe, setstartSwipe] = useState(false)
   const isFocused = useIsFocused();
  const apiUrl = `http://kip.company/kroad/kroaddata.json?_=${new Date().getTime()}`;
 
  useEffect(() => {
    async function axiosRun() {
      await axios.get(apiUrl)
          .then(response => {
            console.log(response.data.AffilatedCompanys2);
            shuffleData = shuffleArray(response.data.AffilatedCompanys2);
            setAffilatedCompanys2(shuffleData);
            setIsLoading(false);
          })
          .catch(error => {
                alert(error.message);
            })
  }
      axiosRun()
      setstartSwipe(true);
      
  }, [])  

  
  
const onShare = async (index) => {   
    function isUrl(element)  {
        if(element.id === index)  {
          return true;
        }
      }
    const urlData = shuffleData.find(isUrl);
    const urlShare = urlData.url;

    try {      
      const result = await Share.share({
        message:urlShare,
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
  

  if (isFocused && !isLoading) {    
    anitest();
  }
  if (!isLoading) {  
  return (
    <>
    <StatusBar hidden />   
    <Swiper
      style={isFocused && !isLoading ? styles.wrapper : styles.wrapper2}
      loop={true}
      onScrollBeginDrag={anitest}
      paginationStyle={styles.dotWrap}
      index={curIndex}
      loadMinimalLoader={<ActivityIndicator color='black' size='large' style={styles.flexContainer}   />}
    >
      {AffilatedCompanys2.map((item, index) => (       
        <View key={item.companyName + index} style={ styles.slide}> 
            <Image source={{uri:item.imgUrl}} style={[styles.image]} />
            <Animated.View style={[styles.wrapLinkBox, {transform : [{translateY: animation}]}]}>
              <View style={{borderRadius: 15,borderBottomRightRadius: 0,borderBottomLeftRadius:0,overflow: "hidden",  flex: 1,width: "100%",
              backgroundColor: "transparent"}}>
                <BlurView style={styles.blurView} blurType="light" blurAmount={50} reducedTransparencyFallbackColor="white" />
                           
                <Text numberOfLines={1} style={styles.companyName}>{item.companyName}</Text>    
                <Text numberOfLines={1} style={styles.description}>{item.description}</Text> 
               </View>  
            </Animated.View>
            
            <AnimatedTouchable underlayColor='none' style={[styles.aniButtonWrap, {transform : [{translateY: animation}]}]} 
                              onPress={() => {setcurIndex(index);props.navigation.navigate('Webview', {webUriIndex : item.id, data:AffilatedCompanys2})}}>
              <BtnInner />
            </AnimatedTouchable>
            <AnimatedTouchable underlayColor='none' style={[styles.btnShareImgnWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {onShare(item.id)}}>
                <Image source={require('../img/btnshare.png')} style={styles.btnShareImg} />
            </AnimatedTouchable>
        </View>
        ))}      
      </Swiper></>   
    )}
    else {
      return (
          <ActivityIndicator color='black' size='large' style={styles.flexContainer}  />
      )
    }
  } 
  


function BtnInner() {
  return(
    <View style={styles.btnInner}>            
        <Text style={styles.btnInnerText}>Discover More</Text>
        <Image source={require('../img/btn.png')} style={styles.btnImg} />
        <Image source={require('../img/btn_arrow.png')} style={styles.btnArrow} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {flex: 1,justifyContent: 'center',backgroundColor: 'transparent'},   
  wrapper2: {position:'absolute',overflow:'hidden',top:-10,left:-10,width:1,height:1},
  image: {resizeMode: "cover",width:'100%',height:'100%'},
  wrapLinkBox: {overflow: "hidden",position:'absolute', bottom: -195,left:0,width,height:195},
  blurView:{position: "absolute",top: 0,left: 0,bottom: 0,right: 0},
  companyName : {marginTop:'8%',color: 'white',fontSize: 38,lineHeight:38,textAlign:'center'},
  description :  {marginTop:5,color: 'white',fontSize: 16,textAlign:'center',},
  aniButtonWrap: {position:'absolute',bottom: -180,width:225,height:81,alignSelf: 'center',textAlign:'center'},
  btnShareImgnWrap: {position:'absolute',right:8,bottom: -55,width:48,height:48},
  btnInner : {position:'relative',flex:1,flexDirection:'row',width:225,height:81,alignItems:'center'},
  btnInnerText : {paddingLeft:49, color: 'white', textAlign:'center', zIndex:3, fontSize:16},
  btnImg : {position:'absolute',width:225,height:81,resizeMode: "contain"},
  btnShareImg : {width:48,height:48,resizeMode: "contain"},
  btnArrow : {width:8.5,height:17,marginLeft:19,resizeMode: "contain"},    
  dotWrap : {position: 'absolute',bottom:201,right: 10},
  flexContainer : {flex:1,justifyContent:'center'}
})

export default AffilatedCompany;