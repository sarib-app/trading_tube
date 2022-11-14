import React, { useState } from 'react';
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
function ForgetPassword() {
const [index,setIndex]=useState(1)
const navigation = useNavigation()


const [otp,setOtp]=useState()
const [errorMessage,setErrorMessage]=useState("")
const [errorCode,setErrorCode]=useState("")
const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)
const [Phone,setPhone]=useState()
const [question,setQuestion]=useState("")
const [answer,setAnswer]=useState("")
const [password,setPassword]=useState("")
const [c_password,setC_Password]=useState("")

const InputSty = {flex:1,color:Colors.FontColorI}


////////on Press Button///////////////////
function ONpressNext(){
    // setIndex(index+1)
    // setIsPressed(false)

  if(index ===1 &&  Phone!=""){
    FetchQuestion()

    setIsPressed(false)
  }
  else if(index === 2 && question != "" && answer !="" ){
    CheckAnswer()
    setIsPressed(false)
  }
  else if(index === 3 &&   password != ""  && c_password != "" ){
    if(password === c_password){
        setIndex(index+1)
        setIsPressed(false)
    }
    else{
        setErrorMessage("Password does not match.")
        setErrorCode("password")
    }
  }

  else if(index === 4 &&  otp){
    
    changePassword()
  }
  else{
setIsPressed(true)
}
}


///////////on Hitting Api/////////////////

function FetchQuestion(){
    setLoading(true)

    var formdata = new FormData();
formdata.append("phone", Phone);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}get_questions`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status === "200"){
    setQuestion(result.data[0].question)
    setIndex(index+1)    
    setLoading(false)
    }
    else if(result.status==="401"){
        setErrorCode(result.Error)
        setErrorMessage(result.message)
        setLoading(false)
    }
    else{
        setLoading(false)
    }
    console.log(result)})
  .catch(error => {
    setLoading(false)
Alert.alert("somethign went wrong")
    console.log('error', error)});
}
function CheckAnswer(){
    setLoading(true)
    var formdata = new FormData();
    formdata.append("phone",Phone);
    formdata.append("question", question);
    formdata.append("answer", answer);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch(`${BaseUrl}question_check`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status==="401"){
            setAnswer("")
            setIsPressed(true)
            setErrorCode("answer")
            setErrorMessage("Probably wrong answer.")
            setLoading(false)

        }
        else if(result.status === "200"){
            setLoading(false)
            setIndex(index+1)
        }
        else{
            setLoading(false)

        }
        console.log(result)})
      .catch(error => {
        setLoading(false)
Alert.alert("somethign went wrong")
        console.log('error', error)});
}




function changePassword(){
setLoading(true)
    var formdata = new FormData();
    formdata.append("password", password);
    formdata.append("confirm_password", c_password);
    formdata.append("phone", Phone);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}updatepassword`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === "200"){
            navigation.navigate("Login")
            Alert.alert("Congratulations"," Your password is updated!")
            setLoading(false)
            setIsPressed(false)
        }else{
            Alert.alert("Ooops","Something Went Wrong!")
            setLoading(false)
            setIsPressed(false)
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
  onPress={()=> navigation.navigate("Login")}
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









function RegisterBtn(){
    return(

        <>
        {
  loading != true  ?
<Pressable 
onPress={()=> ONpressNext()}

>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Submit Request</Text>

</ImageBackground>
</Pressable>:
<SpinnerButton
onPress={()=>{}}
                        buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                        borderRadius: 6}}
                        isLoading={loading}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
>

</SpinnerButton>
}
        </>
    )
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
<Text style={styles.SubHeaderTitle}>Forget Password</Text>
{
  index===1&&
<>
<Text style={styles.TitleTxt}>Enter Your Phone No</Text>
<View style={[GlobalStyles.TextInput,{borderColor:Phone === ""&& isPressed === true?Colors.danger:Colors.PrimaryColor }]}>
  
<Image
source={phoneIcon}
style={{width:13,height:22,margin:10}}
/>
<TextInput
placeholder='Enter your phone no.'
value={Phone}
onChangeText={(e)=> setPhone(e)}
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:"white"}}
/>
</View>
{
  errorMessage != "" && errorCode === "phone"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}


</>
}
{
  index===2&&
<>
<Text style={styles.TitleTxt}>Answer to the question below</Text>
<Pressable 
    style={styles.QuestionBox}>
      <Text style={styles.TitleTxt}>{question}?</Text>
    </Pressable>
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
{
  errorMessage != "" && errorCode === "answer"  &&
<Text style={{color:Colors.danger}}>{errorMessage}</Text>
}
</>
}
{
  index===3&&
  <>
    
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

{
  errorMessage != "" && errorCode === "password"  &&
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
keyboardType="numeric"
value={otp}
onChangeText={(e)=>setOtp(e)}

/>
</View>
</>
}


  
<NextBtn/>




</View>
{
    index === 4 &&
    <RegisterBtn />
}


<View style={{width:100,height:250}}>

</View>


</ScrollView>
    </View>
  )
}
export default ForgetPassword;

