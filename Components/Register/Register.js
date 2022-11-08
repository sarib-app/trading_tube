import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Pressable

} from 'react-native';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import styles from './Styles';


import longBtn from './../../assets/icons/longBtn.png'


import refIcon from '../../assets/icons/referIcon.png'
import typeIcon from '../../assets/icons/type.png'
import emailIcon from '../../assets/icons/emailIcon.png'
import lockIcon from '../../assets/icons/lock.png'

import phoneIcon from '../../assets/icons/phoneIcon.png'

import { useNavigation } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Register() {
const [index,setIndex]=useState(1)
const navigation = useNavigation()

const [refer,setrefer]=useState("")
const [firstName,setFirstname]=useState("")
const [LastName,setLastName]=useState("")
const [username,setUserName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [c_password,setC_Password]=useState("")
const [cnic,setCnic]=useState()
const [Phone,setPhone]=useState()
const [otp,setOtp]=useState()
const [errorMessage,setErrorMessage]=useState("")
const [errorCode,setErrorCode]=useState("")

const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)


const InputSty = {flex:1,color:Colors.FontColorI}


////////on Press Button///////////////////
function ONpressNext(){
  if(index ===1 &&  refer !=""){
    CheckReferal()

    setIsPressed(false)
  }
  else if(index === 2 &&  firstName != "" && LastName != ""  && username != "" && email !=""){
    setIndex(index+1)
    setIsPressed(false)
  }
  else if(index === 3 &&  Phone && password != ""  && c_password != "" && cnic){
    setIndex(index+1)
    setIsPressed(false)
  }
  else if(index === 4 &&  otp){
    Register()
  }else{
setIsPressed(true)
}
}


///////////on Hitting Api/////////////////




function Register(){



  var formdata = new FormData();
  formdata.append("email", email);
  formdata.append("username", username);
  formdata.append("cnic", cnic);
  formdata.append("phone", Phone);
  formdata.append("password", password);
  formdata.append("password_confirmation", c_password);
  formdata.append("code", refer);
  formdata.append("firstname", firstName);
  formdata.append("lastname", LastName);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.registeration}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.user){

      AsyncStorage.setItem('user',JSON.stringify(result.user))
      AsyncStorage.setItem('token',result.token)
      navigation.navigate('Main')

    }
    if(result.status === '401'){
      Validator(result.error,result.message)
    }

      
      console.log(result)})
    .catch(error => console.log('error', error));


}




function Validator(error,message){

if(error === "username"){
  setErrorCode(error)
  setIndex(2)
setErrorMessage(message)
}
else if(error === "email"){
  setErrorCode(error)
  setIndex(2)
setErrorMessage(message)
}
else if(error === "phone"){
  setErrorCode(error)
  setIndex(3)
setErrorMessage(message)
}
else if(error === "Cnic"){
  setErrorCode(error)
  setIndex(3)
setErrorMessage(message)
}
}


function CheckReferal (){
setLoading(true)
  var formdata = new FormData();
  formdata.append("referal_code", refer);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.checkingrefer}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
      
      console.log(result)
    if(result.status==="200"){
      setIndex(index+1)
      setLoading(false)
      setErrorMessage("")
    }
    else{
      setErrorCode("refer")
      setErrorMessage("Refer code does not exist.")
      setLoading(false)

    }
    
    
    })
    .catch(error => console.log('error', error));


}






function OnPressBack(){
  if(index >=1){

    setIndex(index-1)
  }
}




function NextBtn(){
  return(
    
<View style={[styles.marginer,{flexDirection:'row',justifyContent:'space-between',marginTop:0}]}>
  {
    index !=1 &&
<Text 
onPress={()=>OnPressBack()}
style={styles.NextTextSTyle} >{"<"} Back</Text>
}
{
  index !=4&&
  <Text 
onPress={()=>ONpressNext()}
style={styles.NextTextSTyle} >{loading === true ? "Loading....":"Next >"}</Text>
}

</View> 
  )
}


function BottoMtext(){
  return(
    <Text style={{color:Colors.FontColorI,margin:15,alignSelf:'center',position:'absolute',bottom:30}}>
  Already have an account? <Text 
  onPress={()=> navigation.navigate("Login")}
  style={{color:Colors.PrimaryColor,fontWeight:"bold",fontSize:16}}>Sign In</Text>
</Text> 
  )
}

  return (
    <View style={styles.Container}
    >

<View style={styles.marginer}>
<Text style={styles.HeaderTitle}>
  Welcome
</Text>
<Text style={styles.SubHeaderTitle}>Register To Continue</Text>
{
  index===1&&
<>
<Text style={styles.TitleTxt}>Enter refer code</Text>
<View style={[GlobalStyles.TextInput,{borderColor:refer === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={refIcon}
style={{width:17,height:17,margin:10}}
/>
<TextInput
placeholder='Enter refer code here...'
value={refer}
onChangeText={(e)=> setrefer(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}
/>
</View>
{
  errorMessage != "" && errorCode === "refer"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}
<Text style={{color:Colors.FontColorI}}>If you don't have any refer code try this: <Text style={{color:Colors.PrimaryColor,fontWeight:'bold'}}>7IDPFK</Text></Text>


</>
}
{
  index===2&&
<>
<Text style={styles.TitleTxt}>First Name</Text>


<View style={[GlobalStyles.TextInput,{borderColor:firstName === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={typeIcon}
style={{width:15,height:15,margin:10}}
/>
<TextInput
placeholder='First name here'
placeholderTextColor={Colors.placeHolder}
value={firstName}
onChangeText={(e)=> setFirstname(e)}
style={{flex:1,color:"white"}}

/>
</View>
<Text style={styles.TitleTxt}>Last Name</Text>


<View style={[GlobalStyles.TextInput,{borderColor:LastName === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={typeIcon}
style={{width:15,height:15,margin:10}}
/>
<TextInput
placeholder='Last name here'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}
value={LastName}
onChangeText={(e)=>setLastName(e)}
/>
</View>
<Text style={styles.TitleTxt}>User Name</Text>


<View style={[GlobalStyles.TextInput,{borderColor:username === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={typeIcon}
style={{width:15,height:15,margin:10}}
/>
<TextInput
placeholder='Username here'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}
value={username}
onChangeText={(e)=>setUserName(e)}
/>
</View>
{
  errorMessage != "" && errorCode === "username"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}


<Text style={styles.TitleTxt}>Email</Text>

<View style={[GlobalStyles.TextInput,{borderColor:email === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={emailIcon}
style={{width:16,height:11,margin:10}}
/>
<TextInput
placeholder='Email here'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}
value={email}
onChangeText={(e)=>setEmail(e)}
/>
</View>
{
  errorMessage != "" && errorCode === "email"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}

</>
}
{
  index===3&&
  <>
    
  <Text style={styles.TitleTxt}>Phone No</Text>


  <View style={[GlobalStyles.TextInput,{borderColor:!Phone && isPressed === true?Colors.danger:Colors.PrimaryColor }]}>

<Image
source={phoneIcon}
style={{width:13,height:22,margin:10}}
/>
<TextInput
placeholder='+92 XXXXXXX'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={Phone}
keyboardType="numeric"

onChangeText={(e)=>setPhone(e)}

/>
</View>
{
  errorMessage != "" && errorCode === "phone"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}

<Text style={styles.TitleTxt}>Password</Text>



<View style={[GlobalStyles.TextInput,{borderColor:password === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>

<Image
source={lockIcon}
style={{width:17,height:17,margin:10}}
/>
<TextInput
placeholder='Password'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={password}
secureTextEntry={true}
onChangeText={(e)=>setPassword(e)}
/>

</View>


<Text style={styles.TitleTxt}>Confirm Password</Text>

<View style={[GlobalStyles.TextInput,{borderColor:c_password === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>

<Image
source={lockIcon}
style={{width:17,height:17,margin:10}}
/>
<TextInput
placeholder='Confirm Password'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={c_password}
secureTextEntry={true}
onChangeText={(e)=>setC_Password(e)}

/>
</View>

<Text style={styles.TitleTxt}>Cnic</Text>

<View style={[GlobalStyles.TextInput,{borderColor:!cnic && isPressed === true?Colors.danger:Colors.PrimaryColor }]}>

<Image
source={typeIcon}
style={{width:15,height:15,margin:10}}
/>
<TextInput
placeholder='i.e. 3520XXX4X7XXX'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={cnic}
onChangeText={(e)=>setCnic(e)}
keyboardType="numeric"
/>
</View>
{
  errorMessage != "" && errorCode === "Cnic"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}

</>
}
{
  index===4&&
<>
<Text style={styles.TitleTxt}>OTP Code</Text>
<View style={[GlobalStyles.TextInput,{borderColor:!otp && isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={lockIcon}
style={{width:17,height:17,margin:10}}
/>
<TextInput
placeholder='Enter OTP code sent to your phone'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={otp}
keyboardType="numeric"
onChangeText={(e)=>setOtp(e)}

/>
</View>
</>
}


  
<NextBtn/>




</View>
{
  index === 4 &&
<Pressable 
onPress={()=> ONpressNext()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Register Now</Text>

</ImageBackground>
</Pressable>
}


<BottoMtext/>



    </View>
  )
}
export default Register;

