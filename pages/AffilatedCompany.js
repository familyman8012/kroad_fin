import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button, Alert } from 'react-native'

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
  }

})

const AffilatedCompanys = [
  {title:'Aussie tourist dies at Bali hotel', imgUrl:require('../img/1.jpg')},
  {title:'Big lie behind Nine’s new show', imgUrl:require('../img/2.jpg')},
  {title:'Why Stone split from Garfield', imgUrl:require('../img/3.jpg')},
  {title:'Learn from Kim K to land that job', imgUrl:require('../img/4.jpg')},
];

function AffilatedCompany(props) {
  const width = Dimensions.get('window').width;

  const renderPagination = (index, total, context) => {
      return (
        <View style={styles.paginationStyle}>
          <Text style={{ color: 'grey' }}>
              <Button onPress={() => {  props.navigation.navigate('Webview', {webUriIndex : index+1})}}
                title="Learn More"
                color="#841584"
              />
            <Text style={styles.paginationText}>{index + 1}</Text>/{total}
          </Text>
        </View>
      )
    }
  return (
      <Swiper
        style={styles.wrapper}
       renderPagination={renderPagination}
        loop={false}
      >

        {AffilatedCompanys.map((item, index) => (
           <View key={index} style={styles.slide}
          title={
            <View style={{position:'absolute', width:width,  bottom:0, height:100, borderWidth:1}}>
              <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>             
          </View>
          }
        >
          <Image style={styles.image} source={item.imgUrl} />
           </View>
        ))}      
      </Swiper>
    )
}

export default AffilatedCompany;