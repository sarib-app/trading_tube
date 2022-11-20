import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
Dimensions,
ImageBackground,
Platform,
Alert,
PermissionsAndroid
 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';

import LinearGradient from 'react-native-linear-gradient';
import Congrat from '../../assets/icons/Congrat.png'
import steps from '../../assets/icons/steps.png'
import BackBtn from '../GlobalStyles/BackButton';
import longBtn from './../../assets/icons/longBtn.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import BaseUrl from '../../Urls';
import * as ImagePicker from 'react-native-image-picker';
import getAsync from '../GetAsynData/getAsync';
import SpinnerButton from 'react-native-spinner-button';

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
function PromotionScreen() {
  const asyndata = getAsync()
  const [loading, setLoading]=useState(false)
  const [proof_image,setProofImage]=useState()


  const permissionForGallery=async ()=>{
    if (Platform.OS === 'ios') {
        SelectFromGallery();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            }
          );
  
  
          const grantedRead = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to upload file',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
            // Start downloading
            SelectFromGallery();
            
  alert("Download started please wait")
  
          } else {
            // If permission denied then show alert
            Alert.alert('Error','Storage Permission Not Granted');
          }
        } catch (err) {
          // To handle permission related exception
          console.log("++++"+err);
        }
      }
   }
   async function SelectFromGallery(){
    ImagePicker.launchImageLibrary({ mediaType: 'image', includeBase64: false, }, (response) => {
        if(response.didCancel !=true){
          UploadScreenShot(response.assets[0])
            
        }
        else{
            console.log("jedhfk")
        }
  
    })
   }
  function UploadScreenShot (imagee){
  setLoading(true)
    const uri =
    Platform.OS === "android"
      ? imagee.uri
      : imagee.uri.replace("file://", "");
  const filename = imagee.uri.split("/").pop();
  const match = /\.(\w+)$/.exec( String(filename));
  const ext = match?.[1];
  const type = match ? `image/${match[1]}` : `image`;
  
  console.log(uri+ "  " + ext + "  " + type )
  
  
  
  var formdata = new FormData();
  formdata.append("member_id",asyndata.user.id);
  formdata.append("member_name", asyndata.user.username);
  formdata.append("image", {
    uri:uri,
    name: `image.${ext}`,
    type:type,
  } );
  formdata.append("amount", "500");
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}post_reward`, requestOptions)
    .then(response => response.json())
    .then(result => {

      if(result.status === "200")
    {
      console.log(result)

      Alert.alert("Congratulation!","Screen Shot is uploaded Please wait for approval!")
      setLoading(false)
      
    } 
    else if(result.status === "401"){
      console.log(result)
      Alert.alert("Sorry",result.message)
      setLoading(false)
    } 
    }
      )
    .catch(error => {
      Alert.alert("Sorry","Something Went Wrong Please Try Again Later.")
      setLoading(false)
      console.log('error', error)});
  
  
  
  
  
  
    
    
  //     RNFetchBlob.fetch(
  //       'POST',
  //       `${BaseUrl}addDeposit`,
  // {
    
  // },
  //       [
  
  
  
  //         { name: 'payer_id', data: "44"},
  //         { name: 'amount', data: "4" },
  //         { name: 'account_no', data: "4"},
  //         { name: 'account_title', data:"4" },
  //         // { name: 'status', data: "4" },
  //         { name: 'account_subtype', data:"4" },
  //         { name: 'account_type', data: "4" },
  
  
  //         {
  //           name: "proof_image",
  //           filename: `proof_image.${ext}`,
  //           type: `proof_image/${type}`,
  //           data:  RNFetchBlob.wrap(uri),
  //         },
  
  
  
  
  //       ],
  //     ).then(response => response.text())
  //       .then(result => {
          // if(result.status === "200"){
          //   setLoading(false)
          //   Alert.alert("Congratulations")
          //   console.log(result)
          //   navigation.navigate("Main")
          // }
          // else{
          //   setLoading(false)
          // }
  //     console.log("result",result)
  //       })
  //       .catch(err => {
  //         setLoading(false)
  //         console.log('err >>>', err);
      
  //       });
  
  
  
  
  
  
  
  
  
  
  
  
  }





  return (
    <SafeAreaView style={styles.Container}>
{/* 

<Image
source={Congrat}
style={{width:278,height:128,marginTop:40,alignSelf:"center"}}

/> */}
<BackBtn/>

<ScrollView
contentContainerStyle={{alignItems:"center"}}

>

<Text style={styles.TitleText}>Congratulations !</Text>
<Text style={styles.DescriptTxt}>You have won promotion reward on registration, Please follow the steps below to withdraw your amount.</Text>
    
    {/* <Image 
    source={steps}
    style={{width:WindowWidth/1.15,height:WindowHeight/1.85,marginTop:20}}
    /> */}

<Text style={styles.DetailTitle}>1 : <Text style={styles.DetailTxt}>Give us a good review on playstore</Text></Text>

<Text style={styles.DetailTitle}>2 : <Text style={styles.DetailTxt}>Give us five start on play store</Text></Text>
<Text style={styles.DetailTitle}>3 : <Text style={styles.DetailTxt}>Take ScreenShot of review and 5 stars</Text></Text>
<Text style={styles.DetailTitle}>4 : <Text style={styles.DetailTxt}>Capture a selfie which shows your face and your CNIC clearly just like an example shown below.</Text></Text>
<Text style={styles.DetailTitle}>5 : <Text style={styles.DetailTxt}></Text></Text>



<Text style={styles.DetailTitle}>6 : <Text style={styles.DetailTxt}>Upload that screenshot and selfie by hitting the buttons below and submit</Text></Text>

<Text style={styles.DetailTitle}>7 : <Text style={styles.DetailTxt}>Thats it, your 500 RS will be available in your withdraw.</Text></Text>



<Pressable 
onPress={()=> permissionForGallery()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Upload ScreenShot</Text>

</ImageBackground>
</Pressable>


<Pressable 
onPress={()=> permissionForGallery()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Upload Selfie</Text>

</ImageBackground>
</Pressable>




{
  loading === false ?
  
  <Pressable 
onPress={()=> permissionForGallery()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Submit Now</Text>

</ImageBackground>
</Pressable>

:
<SpinnerButton
                        buttonStyle={{  backgroundColor: Colors.PrimaryColor,
                        borderRadius: 6}}
                        isLoading={loading}
                        spinnerType='PulseIndicator'
                        indicatorCount={0}
>

</SpinnerButton>
}




<View 
style={{width:100,height:100}}
/>


</ScrollView>

    </SafeAreaView>
  )
}
export default PromotionScreen;

