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
;
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
 
import types from '../../assets/icons/type.png'
import lock from '../../assets/icons/lock.png'
import Colors from '../GlobalStyles/Color';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Button from './../../assets/icons/longBtn.png'
import malepic from '../../assets/icons/male.png'
import BackBtn from '../GlobalStyles/BackButton';




import emailIcon from '../../assets/icons/emailIcon.png'


const WindowHeight = Dimensions.get('window').height; 



function UpdateProfile() {


const [Firstname,setFirstname]=useState()
const [Lastname,setLastname]=useState()
const [Email,setEmail]=useState("item.Email")
const [Old_Password,setOldPassword]=useState("444")
const [NewPassword,setNewPassword]=useState()
const [isPressed,setIsPressed]=useState(false)





function onDeposit(){
  
   if(Firstname && Lastname && Email && Old_Password && NewPassword ){
alert("good")
   }else{
    setIsPressed(true)
   }


}








const navigation = useNavigation()


  return (
<SafeAreaView style={styles.Container}>
    <BackBtn />
<ScrollView>

<Text style={[styles.TxtColor,{marginTop:10}]}>Update Profile</Text>

<Image
source={malepic}
style={{width:106,height:106,borderRadius:1000,alignSelf:'center'}}
/>

<Text style={styles.TxtInputTitle}>
  First Name
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Firstname &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={types}
style={{width:14,height:14,marginLeft:10  }}
/>

<TextInput
placeholder='Enter First Name'
value={Firstname}
onChangeText={(e)=> setFirstname(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>



<Text style={styles.TxtInputTitle}>
  Last Name
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Lastname &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={types}
style={{width:14,height:14,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Account Number'
value={Lastname}
// keyboardType={'numeric'}

onChangeText={(e)=> setLastname(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}

/>

</View>












<Text style={styles.TxtInputTitle}>
  Email Address
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Email&&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={emailIcon}
style={{width:16,height:11,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Email Here'
value={Email}
onChangeText={(e)=> setEmail(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
// secureTextEntry={true}
editable={false}

/>

</View>






<Text style={styles.TxtInputTitle}>
  Old Password
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !Old_Password &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={lock}
style={{width:17,height:17,marginLeft:10  }}
/>

<TextInput
placeholder='Enter Old Password'
value={Old_Password}
onChangeText={(e)=> setOldPassword(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI,marginLeft:10}}
cursorColor={Colors.PrimaryColor}
editable={false}
// secureTextEntry={true}

/>

</View>



<Text style={styles.TxtInputTitle}>
  New Password
</Text>
<View
style={[GlobalStyles.TextInput,{borderColor: !NewPassword &&isPressed === true ? Colors.danger:Colors.BgColorII}]}
>

<Image
source={lock}
style={{width:17,height:17,marginLeft:10  }}
/>

<TextInput
placeholder='Enter New Password'
value={NewPassword}
keyboardType={'numeric'}
onChangeText={(e)=> setNewPassword(e)}
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

<Text style={GlobalStyles.BtnText}>Update</Text>

</ImageBackground>
</Pressable>


<View style={{width:50,height:100}}></View>
</ScrollView>

    </SafeAreaView>
  )
}
export default UpdateProfile;

