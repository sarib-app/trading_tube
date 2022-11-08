import React, { useState } from 'react';
import {

  Text,
View,
SafeAreaView,
Image,
ImageBackground,
Pressable,
ScrollView
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';
import Abouts_Us from '../../assets/icons/Abouts_Us.png'
import ContentPrivacy from './PrivacyContent';
import ContentHeader from './ContentHeader';
import Colors from '../GlobalStyles/Color';
import SettingsTit from '../../assets/icons/SettingsTit.png'
import graph from '../../assets/icons/graph.png'
import tradingGraph from '../../assets/icons/tradingGraph.png'



function AboutUs() {
const navigation = useNavigation()
function LowerCart(){


const textStyle={color:Colors.FontColorI,margin:15,marginTop:10,textAlign:'center'}

    return(
      <View style={styles.LowerCart}>
        <View style={{flexDirection:'row',margin:15,alignItems:'center'}}>
    
        <Image 
        source={SettingsTit}
        style={{width:20,height:20,marginRight:10}}
        />
      <Text style={styles.L_Cart_Title}>About Us</Text>
      </View>
    {/* <View style={styles.InnerLowerCart}> */}
        <ScrollView>
    
        <Text style={textStyle}>It is a long established fact that a reader will be distractedby the readable content of a page when a for looking at itlayout. The point of using Lorem Ipsum is that it has a willmore-or-less normal distribution of letters, as opposed ofusing Content here, content here' making i look like more readable English.</Text>

<Image source={graph}
style={{width:182,height:105,alignSelf:'center'}}
/>
<Text style={textStyle}>It is a long established fact that a reader will be distractedby the readable content of a page when a for looking at itlayout. The point of using Lorem Ipsum is that it has a willmore-or-less normal distribution of letters, as opposed ofusing Content here, content here' making i look like more readable English.</Text>

    <Image source={tradingGraph}
    style={{width:153,height:99,alignSelf:'center'}}
    />
    <Text style={textStyle}>It is a long established fact that a reader will be distractedby the readable content of a page when a for looking at itlayout. The point of using Lorem Ipsum is that it has a willmore-or-less normal distribution of letters, as opposed ofusing Content here, content here' making i look like more readable English.</Text>

<Image source={graph}
style={{width:182,height:105,alignSelf:'center'}}
/>
<Text style={textStyle}>It is a long established fact that a reader will be distractedby the readable content of a page when a for looking at itlayout. The point of using Lorem Ipsum is that it has a willmore-or-less normal distribution of letters, as opposed ofusing Content here, content here' making i look like more readable English.</Text>

    </ScrollView>
    
<View style={{height:100,width:20}}>

</View>
    {/* </View> */}
    </View>
    
    )
    }



  return (
    <SafeAreaView style={styles.Container}>


<ContentHeader 
icon ={Abouts_Us}
width={51}
height={49}
title={"Abouts Us"}
/>


<LowerCart/>


    </SafeAreaView>
  )
}
export default AboutUs;

