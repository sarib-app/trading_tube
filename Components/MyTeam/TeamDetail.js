import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Modal
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import malepic from '../../assets/icons/male.png'
import Colors from '../GlobalStyles/Color';
import dropdown from '../../assets/icons/dropdown.png'

function TeamDetail({IsVisible,onHideModal}) {



const navigation = useNavigation()

  





return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >

    <SafeAreaView style={[styles.Container,{backgroundColor:"transparent",flexDirection:"row",shadowColor:"black",elevation:4}]}>


<View style={styles.ModalDetail}>
  <Pressable onPress={()=>onHideModal()} >

  <Image 
  source={dropdown}
  style={{width:30,height:28,alignSelf:"center",marginTop:20,}}
  
  />
  </Pressable>

<View style={styles.ModalHeader}>


<Image 
source={malepic}
style={{width:100,height:100,borderRadius:10}}

/>
<View style={{marginLeft:10}}>
  <Text style={styles.ModalTitles}>@Username</Text>
  <Text style={styles.ModalTitles}>email@gmail.com</Text>

</View>





</View>
<View style={{marginLeft:30}}>
<Text style={styles.ModalTitles}>Level: <Text style={{color:Colors.PrimaryColor}}>1</Text></Text>
<Text style={styles.ModalTitles}>Total Earning: <Text style={{color:Colors.PrimaryColor}}>PKR 10,0000</Text></Text>
</View>

</View>
    </SafeAreaView>
    </Modal>

  )
}
export default TeamDetail;

