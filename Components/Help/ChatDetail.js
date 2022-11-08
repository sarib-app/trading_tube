import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
Modal,
TextInput,
Dimensions
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import malepic from '../../assets/icons/male.png'
import Colors from '../GlobalStyles/Color';
import dropdown from '../../assets/icons/dropdown.png'
import BackBtn from '../GlobalStyles/BackButton';
import gobackIcon from '../../assets/icons/gobackIcon.png'
const WindowHeight = Dimensions.get('window').height;

function ChatDetail({IsVisible,onHideModal}) {
const [isKeyOpen,setIsKeyOpen] = useState(false)


const navigation = useNavigation()
return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >
    <SafeAreaView style={styles.Container}>
    <Pressable
    onPress={()=> onHideModal()}
    
    style={{flexDirection:"row",marginTop:10,alignSelf:'flex-start',left:15,alignItems:'center'}}>
      <Image  source={gobackIcon}
      style={{width:12,height:15}}
      />
    <Text style={{color:Colors.PrimaryColor}}> Go Back</Text>
    </Pressable>
<Text 
onPress={()=> onHideModal()}
style={styles.HeaderText}>Inbox</Text>
<Text style={styles.ModalBelowTitles}>Ticket # 902320</Text>
<Text style={[styles.ModalTitles,{color:Colors.PrimaryColor}]}>Title:</Text>
<Text style={styles.ModalTitles}>I am facing issues in depositing moeny.</Text>

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
    </Modal>
  )
}
export default ChatDetail;

