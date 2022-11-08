import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground
 
} from 'react-native';
import styles from './Styles';


import { useNavigation } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';
import SettingsTit from '../../assets/icons/SettingsTit.png'
import SmallBtn from '../../assets/icons/smallBtn.png'

function ContentBottom({title,Content}) {

const navigation = useNavigation()



function LowerCart(){

return(
  <View style={styles.LowerCart}>
    <View style={{flexDirection:'row',margin:15,alignItems:'center'}}>

    <Image 
    source={SettingsTit}
    style={{width:20,height:20,marginRight:10}}
    />
  <Text style={styles.L_Cart_Title}>{title}</Text>
  </View>
<View style={styles.InnerLowerCart}>
    <ScrollView>

<Text style={{color:Colors.FontColorI,margin:15,marginTop:0}}>{Content}</Text>
</ScrollView>

</View>
<View style={{flexDirection:'row',marginLeft:15,alignItems:'center',marginTop:5}}>

<Image 
source={SettingsTit}
style={{width:20,height:20,marginRight:10}}
/>
<Text style={{color:'white'}} >I agree with the {title}</Text>
</View>

<View style={styles.ButtonsCart} >
<View style={{width:115,height:32,borderRadius:20,borderColor:Colors.PrimaryColor,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
<Text style={{fontWeight:'bold',color:Colors.PrimaryColor,fontSize:16}}>Decline</Text>

</View>
<ImageBackground 
source={SmallBtn}
style={{width:115,height:32,alignItems:'center',justifyContent:'center'}}
>
  <Text style={{fontWeight:'bold',color:Colors.BgColor,fontSize:16}}>Accept</Text>
  </ImageBackground>

</View>


</View>

)
}





  return (
  




<LowerCart/>

  )
}
export default ContentBottom;

