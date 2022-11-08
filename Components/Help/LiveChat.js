import React, { useState } from 'react';
import {
  Text,
  View,

TextInput,
Dimensions
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import BackBtn from '../GlobalStyles/BackButton';
const WindowHeight = Dimensions.get('window').height;

function LiveChat() {
const [isKeyOpen,setIsKeyOpen] = useState(false)


const navigation = useNavigation()
return (

    <SafeAreaView style={styles.Container}>
    <BackBtn />
<Text 
style={styles.HeaderText}>Inbox</Text>
<Text style={styles.ModalBelowTitles}>Have a Live Chat with our operator</Text>


<View 
style={styles.ModalHeader}
/>
<View style={styles.ChatBox}>
    <Text style={styles.chatTxt}>
        I have been trying since mporning and i have requested 20000 since thursday its still not in my account where is my money.
    </Text>
</View>


<View style={[styles.ChatBox,{alignSelf:'flex-end',backgroundColor:Colors.bgIII}]}>
    <Text style={styles.chatTxt}>
        Sir Please be patient we are trying our best to deliver your requested amount to you soon we have been involved in some trouble please be patient.
    </Text>
</View>


<View style={styles.ChatBox}>
    <Text style={styles.chatTxt}>
        Please Jaldi krwa den i need them.
    </Text>
</View>

<View style={[styles.ChatBox,{alignSelf:'flex-end',backgroundColor:Colors.bgIII}]}>
    <Text style={styles.chatTxt}>
        Sir don't worry about this we are on it thanks..
    </Text>
</View>




<View style={[styles.InputBox,{bottom:isKeyOpen===true ? WindowHeight/2.5:50}]}>
<TextInput
placeholder='Enter Your Reply here'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI}}
cursorColor={Colors.PrimaryColor}
onPressIn={()=> setIsKeyOpen(true)}
onEndEditing={()=> setIsKeyOpen(false)}
/>
  
</View>


    </SafeAreaView>
  )
}
export default LiveChat;

