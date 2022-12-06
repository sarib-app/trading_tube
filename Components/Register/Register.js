import React, { useState , useEffect} from 'react';
import {

  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  Pressable,
  Alert

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
import { Question } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import SpinnerButton from 'react-native-spinner-button';
import CountryCode from './CountryCodes';
import AccepDialogue from '../Help/AccepDialogue';



function Register({
  onNavigate,
  onChangeState
}) {
const [index,setIndex]=useState(1)
const navigation = useNavigation()

const [refer,setrefer]=useState("")
const [firstName,setFirstname]=useState("")
const [LastName,setLastName]=useState("")
const [username,setUserName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [countryCode,setCountryCode]=useState(92)

const [c_password,setC_Password]=useState("")
const [cnic,setCnic]=useState()
const [Phone,setPhone]=useState()
const [otp,setOtp]=useState()
const [errorMessage,setErrorMessage]=useState("")
const [errorCode,setErrorCode]=useState("")

const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)
const [random,setRandom]=useState('0000')
const [question,setQuestion]=useState("")
const [answer,setAnswer]=useState("")
const [showCodes,setShowCodes]=useState(false)
const [showDialgoue,setShowDialogue]=useState(false)
const [OtpSending , setOtpSending]=useState(false)
const [OtpCounting,setOtpCounting]=useState()

const InputSty = {flex:1,color:Colors.FontColorI}

useEffect(() => {
  if (OtpCounting < 60) {
    const timer = setTimeout(() => {
      setOtpCounting(OtpCounting + 1)
    }, 1000);
    return () => clearTimeout(timer);
  }
}, [OtpCounting]);
////////on Press Button///////////////////
function ONpressNext(){
  if(index ===1 &&  refer !=""){
    CheckReferal()
    // setIndex(index+1)

    setIsPressed(false)
    setErrorCode("Nan")
  }
  else if(index === 2 &&  firstName != "" && LastName != ""  && username != "" && email !=""){
    setIndex(index+1)
    setIsPressed(false)
    setErrorCode("Nan")
    GeneratingOtp()

  }
  else if(index === 3 &&  Phone && password != ""  && c_password != "" && cnic){
  if(cnic.length < 13){
    setErrorCode("Cnic")
    setErrorMessage("CNIC should be atleast 13 digits.")
  }
    else if(password === c_password ){

      setIndex(index+1)
      setIsPressed(false)
      setErrorCode("Nan")
  
        SendOtp(random)
       
    
    }else{
      setErrorCode("password")
      setErrorMessage("Password does not match.")
    }

  }
  else if(index === 4 &&  question != "" && answer !=""){
    setIndex(index+1)
    setIsPressed(false)
    setErrorCode("Nan")
    setOtpSending(true)
    setTimeout(() => {
      setOtpSending(false)
     
    },60000);
    setOtpCounting(0)
  }
  else if(index === 5 &&  otp){

    if(Number(otp) === Number(random)){

      Register()
    }else{
      // setOtp("phone")
      setErrorMessage("Otp does not match")
      setErrorCode("otp")
    }
  }
  else{
setIsPressed(true)
}
}


///////////on Hitting Api/////////////////



function Register(){

setLoading(true)

  var formdata = new FormData();
  formdata.append("email", email === ""? "noemail@tradingtube.co":email);
  formdata.append("username", username);
  formdata.append("cnic", cnic);
  formdata.append("phone", countryCode+Phone);
  formdata.append("password", password);
  formdata.append("password_confirmation", c_password);
  formdata.append("code", refer);
  formdata.append("firstname", firstName);
  formdata.append("lastname", LastName);
  formdata.append("question", question);
  formdata.append("answer", answer);
  formdata.append("role_id", "5");

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.registeration}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.user){
setLoading(false)
      AsyncStorage.setItem('user',JSON.stringify(result.user))
      AsyncStorage.setItem('token',result.token)
      //navigation.navigate('Main')
      onChangeState()
    }
    if(result.status === '401'){
      setLoading(false)
      Validator(result.error,result.message)
    }

      
    })
    .catch(error =>{
      
      setLoading(false)
      Alert.alert("Sorry","An error occured please try again later.")
      console.log('error', error)});


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
    .catch(error => {
      setLoading(false)
Alert.alert("Network Error","Please check your internet connection and try again later!")
      console.log('error', error)});


}

function GeneratingOtp(){

  var val = Math.floor(1000 + Math.random() * 9000);
  setRandom(val)



}
function SendOtp(val){


    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': 'be434c3026msh50dc650f31b5e59p1380e1jsn8889f821e46d',
        'X-RapidAPI-Host': 'telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com'
      }
    };
    
    fetch(`https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=${countryCode+Phone}&verifyCode=${val}&appName=tradingtube`, options)
      .then(response => response.json()
      )
      .then(response => {
        if(response.message === "Invalid phone number"){
          setErrorCode("phone")
          setIndex(3)
          setErrorMessage("Cannot send otp on this phone no please check no again.")
        }
        console.log(response)
      })
      .catch(err => console.error(err));


}

useEffect(()=>{
  getAsyncData()
  },[])


  async function getAsyncData () {
    const Accepted = await AsyncStorage.getItem('Accepted')
    
    if(Accepted === "true"){
  
setShowDialogue(false)
  
  
    }else{
      setShowDialogue(true)
    }
  }


function onSelectBank(val){
  setCountryCode(val)
  setShowCodes((p)=> !p)
}

function OnPressBack(){
  if(index >=1){

    setIndex(index-1)
  }
}


function RegisterBtn(){
  return(
<>
    {
      index === 5 &&
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

</>

  )
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
  index !=5&&
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
  onPress={()=> onNavigate()}
  style={{color:Colors.PrimaryColor,fontWeight:"bold",fontSize:16}}>Sign In</Text>
</Text> 
  )
}



function Allquestions({item}){
  return(
    <Pressable 
    onPress={()=> setQuestion(item.Question)}
    style={[styles.QuestionBox,{backgroundColor:item.Question === question ? Colors.send :Colors.bgIII}]}>
      <Text style={styles.TitleTxt}>{item.Question}</Text>
    </Pressable>
  )
}

function AcceptServices(){
  AsyncStorage.setItem("Accepted","true")
  setShowDialogue(false)
}

  return (
    <View style={styles.Container}
    >
<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
contentContainerStyle={{alignItems:'center'}}
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

<Pressable
onPress={()=> setShowCodes(true)}
style={{padding:10,marginLeft:10,borderRightColor:"white",borderRightWidth:1}}
>
<Text style={{color:Colors.FontColorI,fontWeight:'bold'}}>+{countryCode}</Text>

</Pressable>
<TextInput
placeholder='Number after country code i.e. 320 *******'
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
autoCapitalize="none"
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
autoCapitalize="none"

value={c_password}
secureTextEntry={true}
onChangeText={(e)=>setC_Password(e)}

/>
</View>

{
  errorMessage != "" && errorCode === "password"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}

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
maxLength={13}
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
<Text style={[styles.TitleTxt,{marginTop:-20}]}>Select a Question</Text>
<FlatList
scrollEnabled={true}
nestedScrollEnabled={true}
data={Question}
renderItem={({item})=> 
<Allquestions item={item}/>
}

/>




<Text style={styles.TitleTxt}>Enter answer</Text>
<View style={[GlobalStyles.TextInput,{borderColor:answer==="" && isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={typeIcon}
style={{width:15,height:15,margin:10}}
/>
<TextInput
placeholder='Enter Your Answer Please'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}

value={answer}
onChangeText={(e)=>setAnswer(e)}

/>
</View>
</>
}
{
  index===5&&
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
keyboardType="numeric"
value={otp}
onChangeText={(e)=>setOtp(e)}

/>
</View>
{
  OtpSending === true ? <Text style={{color:Colors.send}}>"Haven't recieved OTP yet ? try again {OtpCounting}/60</Text>
:
<Text 
onPress={()=> SendOtp(random)}
style={{color:Colors.send}}>Resend OTP by clicking here.</Text>

}
{
  errorMessage != "" && errorCode === "otp"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}


</>
}


  
<NextBtn/>




</View>

{loading === true && index===5 ?

<SpinnerButton
                        buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                        borderRadius: 6}}
                        isLoading={loading}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
>

</SpinnerButton>:
<RegisterBtn/>



}


<View style={{width:100,height:250}}>

</View>


</ScrollView>


<BottoMtext/>

<CountryCode 
isVisible={showCodes}
onSelectBank={onSelectBank}

/>

<AccepDialogue 
IsVisible={showDialgoue}
onHideModal={AcceptServices}

/>

    </View>
  )
}
export default Register;

