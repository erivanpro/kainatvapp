import { View, Text } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';


const Post = () => {
  return (
    <Animatable.View animation="bounce" duration={1500}>
      <Text>post</Text>
    </Animatable.View>
  )
}

export default Post