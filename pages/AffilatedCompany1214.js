import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, Animated, TouchableHighlight, Share } from 'react-native'
import axios from 'axios';
import { BlurView } from "@react-native-community/blur";
import Swiper from 'react-native-swiper'


const { width, height } = Dimensions.get('window');

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


AffilatedCompanys = [
    {companyName:"K-car", description:"Mercedes-Benz", imgUrl:"http://kip.company/kroad/1.png"},
    {companyName:"Neunge", description:"Play-Block", imgUrl:"http://kip.company/kroad/2.jpg"},
    {companyName:"Why Sone split from Garfield", description:"Mercedes-Benz3", imgUrl:"http://kip.company/kroad/3.jpg"},
    {companyName:"Learnfrom Kim K to land that job", description:"Mercedes-Benz4", imgUrl:"http://kip.company/kroad/4.jpg"}
  ]


// alert(AffilatedCompanys[0].companyName);


function AffilatedCompany(props) {   
  const [AffilatedCompanys2, setAffilatedCompanys2] = useState([]);
  const apiUrl = 'http://kip.company/kroad/kroaddata.json';

  
  const onShare = async (index) => {
    switch (index) {
      case 0:
        messageTxt = 'http://www.naver.com'
        break;
      case 1:
        messageTxt = 'http://play-block.com/'
        break;
      case 2:
        messageTxt = 'https://www.coupang.com/'
        break;
      case 3:
        messageTxt = 'https://www.youtube.com/'
        break;
      default:
        break;
    }
    try {
      const result = await Share.share({
        message:messageTxt,
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


  useEffect(() => {
    anitest();
    async function axiosRun() {
      const result = await axios.get(apiUrl);
      setAffilatedCompanys2(result.data.AffilatedCompanys2);
    }
    axiosRun();    
  }, [])
  return (
    <Swiper
      style={styles.wrapper}
      loop={true}
      onScrollBeginDrag={anitest}
      paginationStyle={styles.dotWrap}
    >
      {AffilatedCompanys.map((item, index) => (       
        <View key={index} style={styles.slide}> 
          <ImageBackground source={{uri:item.imgUrl}} style={styles.image}>
            <Animated.View style={[styles.wrapLinkBox, {transform : [{translateY: animation}]}]}>
                <BlurView style={styles.blurView} blurType="light" blurAmount={50} />               
                <Text numberOfLines={1} style={styles.companyName}>{item.companyName}</Text>    
                <Text numberOfLines={1} style={styles.description}>{item.description}</Text>  
            </Animated.View>
            {Platform.OS === 'android' ? (
              <AnimatedTouchable underlayColor='none' style={[styles.aniButtonWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {  props.navigation.navigate('Webview', {webUriIndex : index+1})}}>
                <BtnInner />
              </AnimatedTouchable> ) : (
              <AnimatedTouchable underlayColor='none' style={[styles.aniButtonWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {  props.navigation.navigate('Webview2', {webUriIndex : index+1})}}>
                <BtnInner />
              </AnimatedTouchable>
              )
            }
            <AnimatedTouchable underlayColor='none' style={[styles.btnShareImgnWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {onShare(index)}}>
                <Image source={require('../img/btnshare.png')} style={styles.btnShareImg} />
              </AnimatedTouchable>
          </ImageBackground>
        </View>
        ))}      
      </Swiper>
    )
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
  image: {flex: 1,resizeMode: "cover"},
  wrapLinkBox: {overflow: "hidden",position:'absolute', bottom: -195,left:0,width,height:195},
  blurView:{position: "absolute",top: 0,left: 0,bottom: 0,right: 0},
  companyName : {marginTop:'8%',color: 'white',fontSize: 38,lineHeight:38,textAlign:'center'},
  description :  {marginTop:5,color: 'white',fontSize: 16,textAlign:'center',},
  aniButtonWrap: {position:'absolute',bottom: -180,width:225,height:81,alignSelf: 'center',textAlign:'center'},
  btnShareImgnWrap: {position:'absolute',right:8,bottom: -55,width:48,height:48},
  btnInner : {position:'relative',flex:1,justifyContent:'center'},
  btnInnerText : {paddingRight:13, color: 'white', textAlign:'center', zIndex:3, fontSize:16},
  btnImg : {position:'absolute',width:225,height:81,resizeMode: "contain"},
  btnShareImg : {width:48,height:48,resizeMode: "contain"},
  btnArrow : {position:'absolute',top: 32,right:50,width:8.5,height:17,resizeMode: "contain"},    
  dotWrap : {position: 'absolute',bottom:201,right: 10}
})

export default AffilatedCompany;