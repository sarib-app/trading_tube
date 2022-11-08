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
import TipsIcon from '../../assets/icons/tips.png'
import { MyTeamData, TeamsComission } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import credited from '../../assets/icons/credited.png'
import Profile from '../../assets/icons/5.png'

import TeamDetail from './TeamDetail';
import BackBtn from '../GlobalStyles/BackButton';
import ComissionDetail from './ComissionDetails';
function TeamComissionScreen() {
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
    style={{width:50,height:50,}} 
    source={Profile}
    />
    
    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>{item.name}</Text>
    <Text style={{fontWeight:'500',fontSize:14,color:Colors.PrimaryColor}}>Level 2</Text>

    
    </View>
    
    
    </View>
    
    
    <Text 
    onPress={()=> setShowDetail(true)}
    
    style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>View</Text>
    
    
    </View>
)
}




return (
    <SafeAreaView style={styles.Container}>
<BackBtn/>
<Text style={styles.HeaderText}>
    Team's Comission
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

<ComissionDetail IsVisible={showDetail} onHideModal={onHideModal}/>

    </SafeAreaView>
  )
}
export default TeamComissionScreen;

