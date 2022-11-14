import React, { useEffect, useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,

 
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import filterIcon from '../../assets/icons/filter.png';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import getAsync from '../GetAsynData/getAsync';
function SharePlans() {
const asyncdata = getAsync()

function LowerCart(){



    return(
        <View style={styles.LowerCart}>
    <View style={styles.InnerlowCart}>
<Text style={styles.TxtClr}>Activity</Text>

    </View>
   

<View style={GlobalStyles.HistoryCard}>


     
 

</View>
</View>
    )
}


  return (
    <View style={styles.Container}>  
<Text style={styles.Text}>Wallet</Text>


<Text style={{color:Colors.placeHolder,marginLeft:15}}>BALANCE</Text>
<Text style={[styles.Text,{marginTop:5}]}>PKR {20}</Text>
<Text style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Deposit Via</Text>

<LowerCart />

</View>
  )
}
export default SharePlans;

