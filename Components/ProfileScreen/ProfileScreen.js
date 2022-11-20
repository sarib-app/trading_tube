import React, { useState ,useEffect,useCallback} from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
Dimensions,
RefreshControl
 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';

import updateProfIcon from '../../assets/icons/updateProfIcon.png'
import { ProfileOptions, TopInvestors } from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WindowWidth = Dimensions.get('window').width

function ProfileScreen({total_Record,forceReload}) {
  const [selected,setSelected]=useState("All")
  const [refreshing, setRefreshing] = useState(false);




  const onRefresh = useCallback(() => {

    forceReload()
    setRefreshing(true)
    setTimeout(() => {
    setRefreshing(false)
   
  },2000);
  
  
  }, [])


const navigation = useNavigation()
function Navigator(route){
  navigation.navigate(route)
  if(route==="Login"){
    AsyncStorage.clear()
  }
}



const [user,setUser]=useState({
   firstname:"",
   lastname:"",
   phone:""
  
})



useEffect(()=>{
  getAsyncData()
  },[])


  async function getAsyncData () {
    const user = await AsyncStorage.getItem('user')
    const token = await AsyncStorage.getItem('token')
    let userParsed=JSON.parse(user) 
    if(token){
      setUser(userParsed)
    // getData(userParsed.id) 
    }
  }






function UpperCart(){




  return(
<View style={styles.UpperCart}>
<View style={styles.uperInnerCart}>
<View style={{alignItems:'center'}}>
<Text style={styles.balanceTitle}>Total Balance</Text>
<Text style={styles.BalanceTxt}>{total_Record !=""? total_Record.Total_balance != null ? total_Record.Total_balance:0:0}</Text>
</View>
<View style={{alignItems:'center'}}>
<Text style={styles.balanceTitle}>Total Income</Text>
<Text style={styles.BalanceTxt}>{total_Record !=""? total_Record.Total_income:0}</Text>
</View>
</View>

<View style={[styles.uperInnerCart,{marginTop:20}]}>
<View style={{alignItems:'center'}}>
<Text style={styles.balanceTitle}>Total Deposit</Text>
<Text style={styles.BalanceTxt}>{total_Record !=""? total_Record.Total_deposit:0}</Text>
</View>
<View style={{alignItems:'center'}}>
<Text style={styles.balanceTitle}>Total Withdraw</Text>
<Text style={styles.BalanceTxt}>{total_Record !=""? total_Record.Total_withdrawl:0}</Text>
</View>
</View>

{/* <View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>1</Text></Text>
</View> */}



</View>
  )
}
function LowerCart(){

  
function OptionList({item}){
  return(
    <Pressable 
    onPress={()=> Navigator(item.rout_to)}
    
    style={{alignItems:"center",}}>
    <View style={styles.OptionWrapper}>
   <Image
   source={item.icon}
   style={{width:item.width,height:item.height}}
   />
    </View>
<Text style={{color:Colors.BgColor,textAlign:'center',fontWeight:"bold"}}>{item.title}</Text>
    </Pressable>

  )
}
return(
  <View style={styles.LowerCart}>
<ScrollView
horizontal={true}
scrollEnabled={false}
>
<View style={{flex:1,width:WindowWidth,alignItems:'center'}}>

<FlatList 
// horizontal={true}
scrollEnabled={false}
style={{marginTop:15}}
nestedScrollEnabled={true}
numColumns={3}
data={ProfileOptions}
renderItem={({item})=>

<OptionList item={item} />

}

/>
</View>

</ScrollView>





</View>

)
}
return (
    <SafeAreaView style={styles.Container}>


<View style={styles.Header}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image source={Profile} style={{width:50,height:50}}/>

<Text style={styles.InnerTxt}>{user.firstname} {user.lastname}{'\n'} <Text style={styles.OuterTxt}>{user.phone}</Text></Text>
    </View>
<Pressable onPress={()=> Navigator('DecideUpdate')}>
<Image source={updateProfIcon} style={{width:29,height:21}}/>

</Pressable>
</View>


<ScrollView nestedScrollEnabled={true}
scrollEnabled={false}


refreshControl={
  <RefreshControl
  refreshing={refreshing}
  onRefresh={onRefresh}
  


  />
}


>
<UpperCart/>

<LowerCart/>

</ScrollView>

    </SafeAreaView>
)
}
export default ProfileScreen;

