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

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Colors from '../GlobalStyles/Color';
import emailIcon from '../../assets/icons/emailIcon.png'
import { MyTeamData, TeamsComission } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import Profile from '../../assets/icons/5.png'

import BackBtn from '../GlobalStyles/BackButton';
import ChatDetail from './ChatDetail';
function Help() {
const navigation = useNavigation()

  const [showDetail,setShowDetail]=useState(false)

function onHideModal(){
  setShowDetail((p)=>!p)
}





function MyTeamList({item}){
return(
    <View style={styles.TrickContainer}>
  
  
    <View style={{flexDirection:'row',alignItems:"center"}}>
    <View style={styles.IconWrapper}>
    
    <Image 
    style={{width:23,height:17,tintColor:Colors.FontColorI}} 
    source={emailIcon}
    />
    
    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={{fontWeight:'400',fontSize:16,color:Colors.FontColorI}}>I dont know how to withdraw my income</Text>
    {/* <Text style={{fontWeight:'500',fontSize:14,color:Colors.PrimaryColor}}>Level 2</Text> */}

    
    </View>
    
    
    </View>
    
    
    <Text 
    onPress={()=> setShowDetail(true)}
    
    style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>Chat</Text>
    
    
    </View>
)
}




return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Help Center
</Text>

<FlatList 
data={MyTeamData}
renderItem={({item})=>
<MyTeamList  item={item} 
/>

}
/>
<View
style={{height:20,width:50}}
></View>

<ChatDetail IsVisible={showDetail} onHideModal={onHideModal}/>

    </SafeAreaView>
  )
}
export default Help;

