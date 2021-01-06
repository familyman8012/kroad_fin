import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableHighlight, Share, ActivityIndicator } from 'react-native'
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


AffilatedCompanys = [
    {companyName:"K-car", description:"Mercedes-Benz", imgUrl:"http://kip.company/kroad/1.png"},
    {companyName:"Neunge", description:"Play-Block", imgUrl:"http://kip.company/kroad/2.jpg"},
    {companyName:"Why Sone split from Garfield", description:"Mercedes-Benz3", imgUrl:"http://kip.company/kroad/3.jpg"},
    {companyName:"Learnfrom Kim K to land that job", description:"Mercedes-Benz4", imgUrl:"http://kip.company/kroad/4.jpg"}
  ]


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

  
  const onShare = async (index) => {
    switch (index) {
      case 1:
        messageTxt = 'http://www.gsrent.kr'
        break;
      case 2:
        messageTxt = 'http://dealerweb.kr/m/join_seller.php?c_code=c30225'
        break;
      case 3:
        messageTxt = 'https://www.axa.com.hk/en'
        break;
      case 4:
        messageTxt = 'https://www.fwd.com.hk/tc/'
      case 5:
        messageTxt = 'http://www.kipersmall.co.kr/'
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
      axios.get(apiUrl)
          .then(response => {
            console.log(response.data.AffilatedCompanys2);
            setAffilatedCompanys2(shuffleArray(response.data.AffilatedCompanys2));
            setIsLoading(false);
          })
          .catch(error => {
                alert(error.message);
            })
      setstartSwipe(true);
      
  }, [])  
  if (isFocused && !isLoading) {    
    anitest();
  }
  if (!isLoading && startSwipe) {  
  return (      
    <Swiper
      style={isFocused && !isLoading ? styles.wrapper : styles.wrapper2}
      loop={true}
      onScrollBeginDrag={anitest}
      paginationStyle={styles.dotWrap}
      index={curIndex}
      loadMinimalLoader={<ActivityIndicator color='black' size='large' style={styles.flexContainer}   />}
    >
      {AffilatedCompanys2.map((item, index) => (       
        <View key={item.companyName + index} style={styles.slide}> 
            <Image source={{uri:item.imgUrl}} style={[styles.image]} />
            <Animated.View style={[styles.wrapLinkBox, {transform : [{translateY: animation}]}]}>
                <BlurView style={styles.blurView} blurType="light" blurAmount={50} />               
                <Text numberOfLines={1} style={styles.companyName}>{item.companyName}</Text>    
                <Text numberOfLines={1} style={styles.description}>{item.description}</Text>  
            </Animated.View>
            {Platform.OS === 'android' ? (
              <AnimatedTouchable underlayColor='none' style={[styles.aniButtonWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {setcurIndex(index);props.navigation.navigate('Webview', {webUriIndex : item.id})}}>
                <BtnInner />
              </AnimatedTouchable> ) : (
              <AnimatedTouchable underlayColor='none' style={[styles.aniButtonWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {setcurIndex(index);props.navigation.navigate('Webview2', {webUriIndex : item.id})}}>
                <BtnInner />
              </AnimatedTouchable>
              )
            }
            <AnimatedTouchable underlayColor='none' style={[styles.btnShareImgnWrap, {transform : [{translateY: animation}]}]} 
                                onPress={() => {onShare(item.id)}}>
                <Image source={require('../img/btnshare.png')} style={styles.btnShareImg} />
              </AnimatedTouchable>
          
        </View>
        ))}      
      </Swiper>
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
  slide2: {position:'absolute',overflow:'hidden',top:'-10px',top:'-10px',width:'10px',height:'10px'},
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
  dotWrap : {position: 'absolute',bottom:201,right: 10},
  flexContainer : {flex:1,justifyContent:'center'}
})

export default AffilatedCompany;