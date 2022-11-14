import React, { useState } from 'react';
import {

  Text,
  View,
  ImageBackground,
  Dimensions
 
} from 'react-native';
import styles from './Styles';
;

import Card from '../../assets/icons/card.png'
import Colors from '../GlobalStyles/Color';


const WindowWidth = Dimensions.get('window').width









function Cardd({
  AccountTitle,
  Acc_numberr,
  Bank_Type,
  type
}){
  return(
    <>
    <ImageBackground 
source={Card}
style={{width:362,height:194,alignSelf:'center'}}


>
    <View style={styles.UpperCardTxt}>

    <Text style={styles.CardHeadTxt}>Trading Card</Text>

<Text style={[styles.CardHeadTxt,{color:Colors.BgColorII}]}>{Bank_Type}</Text>

    </View>
    <View style={[styles.UpperCardTxt,{marginTop:50, width:WindowWidth/1.15}]}>

    <Text style={[styles.CardHeadTxt,{textAlign:'center'}]}>Account Title{'\n'}{AccountTitle}</Text>

<Text style={[styles.CardHeadTxt,{color:Colors.BgColorII,textAlign:'center'}]}>Account Number{'\n'}{Acc_numberr}</Text>

    </View>


</ImageBackground>

<Text style={{width:362,alignSelf:'center',textAlign:'left',color:Colors.danger,margin:5}}>Kindly send deposit amount on account number given above 
and after that fill the form given below.</Text>

<Text style={{width:362,alignSelf:'center',textAlign:'right',color:Colors.danger,margin:5}}>برائے مہربانی اوپر دیے گئے اکاؤنٹ نمبر پر جمع {`(Deposit amount)`}  رقم بھیجیں اور اس کے بعد نیچے دیا گیا فارم پُر کریں۔
</Text>
    </>
  )
}





 

export default Cardd;

