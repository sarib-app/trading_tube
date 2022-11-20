import React, { useState,useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from '../../EnDPoints';
import BaseUrl from '../../Urls';
function TeamComissionScreen() {
const navigation = useNavigation()
  

const [firstTeamList,setFirstTeamList]=useState([])
const [secondTeamList,setSecondTeam]=useState([])
const [selected,setIsSelected]=useState(1)

const data = selected === 1 ?firstTeamList : secondTeamList



useEffect(()=>{

  getAsyncData()

  
  },[])






async function getAsyncData () {
  const user = await AsyncStorage.getItem('user')
  const token = await AsyncStorage.getItem('token')
  let userParsed=JSON.parse(user) 
  if(token){

getTeamList(userParsed.id)


  }
}




function getTeamList(user_id){


  var formdata = new FormData();
  formdata.append("user_id", user_id);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`${BaseUrl}${Endpoints.get_the_team}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.status==="200"){
        setFirstTeamList(result.first_members)
        setSecondTeam(result.second_members)


      }
      
      console.log(result)})
    .catch(error => console.log('error', error));

}





function MyTeamList({item}){
  const [showDetail,setShowDetail]=useState(false)


function onHideModal(){
  setShowDetail((p)=>!p)
}



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
    <Text style={{fontWeight:'bold',fontSize:18,color:Colors.FontColorI}}>{item.username}</Text>
    <Text style={{fontWeight:'500',fontSize:14,color:Colors.PrimaryColor}}>Level 2</Text>

    
    </View>
    
    
    </View>
    
    
    <Text 
    onPress={()=> setShowDetail(true)}
    
    style={[styles.TransactionText,{color:Colors.PrimaryColor}]}>View</Text>
    
    <ComissionDetail IsVisible={showDetail} onHideModal={onHideModal} item={item}/>

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
data={data}
renderItem={({item})=>
<MyTeamList  item={item} 
/>

}
/>
<View
style={{height:20,width:50}}
></View>


    </SafeAreaView>
  )
}
export default TeamComissionScreen;

