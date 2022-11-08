import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Dimensions,
  
 
} from 'react-native';
import styles from '../DepositNow/Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import title_icon from '../../assets/icons/account_title.png'
import acc_numb_icon from '../../assets/icons/acc_numb.png'
import acc_type_icon from '../../assets/icons/acc_type.png'
import amount_icon from '../../assets/icons/amount.png'
import upload_img_icon from '../../assets/icons/upload_img.png'
import Card from '../../assets/icons/card.png'
import Colors from '../GlobalStyles/Color';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './../../assets/icons/longBtn.png'

const WindowHeight = Dimensions.get('window').height; 

function Withdraw_now({route}) {

const item = route.params.item
console.log(item)
const [Acc_Title,setAcc_title]=useState()
const [Acc_Number,setAcc_Number]=useState()
const [Acc_Type,setAcc_Type]=useState(item.Acc_Type)
const [Account_Subtype,setAcc_SubType]=useState(item.Acc_Type)
const [Amount,setAmount]=useState()
const [isPressed,setIsPressed]=useState(false)





function onDeposit(){
  
   if(Acc_Title && Acc_Number && Acc_Type && Account_Subtype && Amount ){
alert("good")
   }else{
    setIsPressed(true)
   }


}








const navigation = useNavigation()


  return (
<SafeAreaView style={styles.Container}>
<Text style={styles.TxtColor}>Withdraw</Text>
<ScrollView>
<Text style={{width:362,alignSelf:'center',textAlign:'left',color:Colors.danger,margin:5}}>Please add the account number on which you want your payments to be received.</Text>
<Text style={{width:362,alignSelf:'center',textAlign:'right',color:Colors.danger,margin:5}}>

 براہ کرم وہ اکاؤنٹ نمبر شامل کریں جس پر آپ اپنی ادائیگیاں وصول کرنا چاہتے ہیں۔

</Text>






<Text style={styles.TxtInputTitle}>
  Account Title
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Title &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={title_icon}
style={{width:23,height:21,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Title'
value={Acc_Title}
onChangeText={(e)=> setAcc_title(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>



<Text style={styles.TxtInputTitle}>
  Account Number
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Number &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_numb_icon}
style={{width:27,height:20,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Number'
value={Acc_Number}
keyboardType={'numeric'}

onChangeText={(e)=> setAcc_Number(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>












<Text style={styles.TxtInputTitle}>
  Account Type
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Acc_Type&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Type'
value={Acc_Type}
// onChangeText={(e)=> setAcc_Type(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}
editable={false}

/>

</View>






<Text style={styles.TxtInputTitle}>
  Account Sub-Type
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Account_Subtype &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={acc_type_icon}
style={{width:24,height:19,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Sub-Type'
value={Account_Subtype}
// onChangeText={(e)=> setAcc_SubType(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
editable={false}
// secureTextEntry={true}

/>

</View>



<Text style={styles.TxtInputTitle}>
  Amount
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Amount &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={amount_icon}
style={{width:22,height:24,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Amount'
value={Amount}
keyboardType={'numeric'}
onChangeText={(e)=> setAmount(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>







<Pressable 
onPress={()=> onDeposit()}
>

<ImageBackground 
source={Button}
style={[GlobalStyles.Button,{alignSelf:'center'}]}

>

<Text style={GlobalStyles.BtnText}>Withdraw</Text>

</ImageBackground>
</Pressable>


<View style={{width:50,height:300}}></View>
</ScrollView>

    </SafeAreaView>
  )
}
export default Withdraw_now;

