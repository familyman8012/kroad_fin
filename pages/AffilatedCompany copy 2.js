import React, { useEffect, Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, Animated, TouchableHighlight } from 'react-native'
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
      toValue: -(height/3.5),
      duration: 700,
      useNativeDriver: true
    }
  );   
  Animated.sequence([
    downAni,
    upAni,
  ]).start();    
}
const AffilatedCompanys = [
  {title:'Aussie tourist dies at Bali hotel', imgUrl:require('../img/1.png')},
  {title:'Big lie behind Nine’s new show', imgUrl:require('../img/2.jpg')},
  {title:'Why Stone split from Garfield', imgUrl:require('../img/3.jpg')},
  {title:'Learn from Kim K to land that job', imgUrl:require('../img/4.jpg')},
];


function AffilatedCompany(props) { 
  useEffect(() => {
    anitest();
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
          <ImageBackground source={item.imgUrl} style={styles.image}>
          <Animated.View style={[styles.wrapLinkBox, {transform : [{translateY: animation}]}]}>
               <BlurView style={styles.blurView}
                blurType="light"
                blurAmount={50}
                educedTransparencyFallbackColor="blue"
                
                />               
              <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>     
          </Animated.View>
         <AnimatedTouchable underlayColor='none' style={[styles.aniButton, {transform : [{translateY: animation}]}]} 
         onPress={() => {  props.navigation.navigate('Webview', {webUriIndex : index+1})}}>
          <View style={styles.btnInner}>            
              <Text style={{paddingTop:29, paddingRight:13, color: 'white', textAlign:'center', zIndex:3, fontSize:16}}>Discover More</Text>
              <Image source={require('../img/btn.png')} style={styles.btn} />
              <Image source={require('../img/btn_arrow.png')} style={styles.btn_arrow} />
          </View>
        </AnimatedTouchable>
       
          {/* <Button onPress={() => {  props.navigation.navigate('Webview', {webUriIndex : index+1})}}
                title="Learn More"
                color="#841584"
              />    */}
         </ImageBackground>
           </View>
        ))}      
      </Swiper>
    )
}


const styles = StyleSheet.create({
  wrapper: {},
  slide: {flex: 1,justifyContent: 'center',backgroundColor: 'transparent'},
  image: {flex: 1,resizeMode: "cover"},
  wrapLinkBox: {position:'absolute', bottom: -(height/3.5),left:0,width,height:height/3.5},
  blurView:{position: "absolute",top: 0,left: 0},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },

  titleText : {
     color: 'white',
    fontSize: 20
  },
  button : {   
    width:50,
    height:100,
    borderWidth:1,
     color: 'white',
  },
   
  
  aniButton: {
    width:225,
    height:81,
    position:'absolute',
    bottom: -(height/3.5),
    alignSelf: 'center',
    textAlign:'center'
  },
  
  btnInner : {
    position:'relative',
    flex:1,
    alignItems: 'center'
  },
  btn : {
    position:'absolute',
    width:225,
    height:81,    
    resizeMode: "contain",
  },
  btn_arrow : {
    position:'absolute',
    top: 32,
    right:50,
    width:8.5,
    height:17,    
    resizeMode: "contain",
  },
  dotWrap : {
    bottom:height/3,
  }
})

export default AffilatedCompany;