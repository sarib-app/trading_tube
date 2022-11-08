import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
Dimensions,
ImageBackground
 
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
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
function PromotionScreen() {










  return (
    <SafeAreaView style={styles.Container}>
{/* 

<Image
source={Congrat}
style={{width:278,height:128,marginTop:40,alignSelf:"center"}}

/> */}
<BackBtn/>
<Text style={styles.TitleText}>Congratulations !</Text>
<Text style={styles.DescriptTxt}>You have won promotion reward on registration, Please follow the steps below to withdraw your amount.</Text>
    
    <Image 
    source={steps}
    style={{width:WindowWidth/1.15,height:WindowHeight/1.85,marginTop:20}}
    />
    <Pressable 
// onPress={()=> onLoginPress()}
>

<ImageBackground 
source={longBtn}
style={GlobalStyles.Button}

>

<Text style={GlobalStyles.BtnText}>Upload ScreenShot</Text>

</ImageBackground>
</Pressable>

    </SafeAreaView>
  )
}
export default PromotionScreen;

