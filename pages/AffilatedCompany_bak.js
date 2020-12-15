import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button, Alert,  Animated } from 'react-native'

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width,
    flex: 1
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
  textContainer2: {
    width,
    height:250,
    position:'absolute',
    bottom: -250,
    left:0,
    backgroundColor:'red'
  }

})
  const animation = new Animated.Value(0);
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
        toValue: -250,
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
  {title:'Aussie tourist dies at Bali hotel', imgUrl:require('../img/1.jpg')},
  {title:'Big lie behind Nine’s new show', imgUrl:require('../img/2.jpg')},
  {title:'Why Stone split from Garfield', imgUrl:require('../img/3.jpg')},
  {title:'Learn from Kim K to land that job', imgUrl:require('../img/4.jpg')},
];

const RenderPagination = (index, total, context) => {
  return (
    <Animated.View style={[styles.textContainer2, {transform : [{translateY: animation}]}]}>
      <Text style={{ color: 'grey' }}>
           <Button onPress={() => {  props.navigation.navigate('Webview', {webUriIndex : index+1})}}
                title="Learn More"
                color="#841584"
              />
      </Text>
    </Animated.View>
  )
}




function AffilatedCompany(props) {
  const width = Dimensions.get('window').width;

  
  return (
      <Swiper
        style={styles.wrapper}
       renderPagination={({ item, index }) => (
          <RenderPagination />
        )}
        loop={false}
        onScrollBeginDrag={anitest}
      >

        {AffilatedCompanys.map((item, index) => (
           <View key={index} style={styles.slide}
          title={
            <Animated.View style={[styles.textContainer2, {transform : [{translateY: animation}]}]}>
              <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>             
          </Animated.View>
          }
        >
          <Image style={styles.image} source={item.imgUrl} />
           </View>
        ))}      
      </Swiper>
    )
}

export default AffilatedCompany;