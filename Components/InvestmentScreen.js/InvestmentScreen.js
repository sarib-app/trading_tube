import React, { useState,useCallback,useEffect } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
TouchableOpacity,
ImageBackground,
RefreshControl,
Pressable,


} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';
import TipsIcon from '../../assets/icons/tips.png'
import DropDwn from '../../assets/icons/dropdown.png'

import LinearGradient from 'react-native-linear-gradient';
import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'
import Button from './../../assets/icons/smallBtn.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';

import {INvestmentList,DepositTransaction} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import { InvestmentIcons } from '../data/TopInvestors';
import Endpoints from '../../EnDPoints';
import Confirmation from './ConfirmationModal';
import getAsync from '../GetAsynData/getAsync';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7224745157985009/9676971080';

function InvestmentScreen({
  AllPackages,
  forceReload,
  currentDate,
  MyPackages,
  total_Record
}) {
   const asyncdata = getAsync()
  const [selected,setSelected]=useState("New") 


  const [refreshing, setRefreshing] = useState(false);


  const [user,setUser]=useState({
    firstname:"",
    lastname:"",
    phone:"",
    pro_pic:""
   
 })
const navigation = useNavigation()








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







const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}

/////Functions////////////


const dataFinal = selected === "New"? AllPackages.sort((a,b)=> a.price - b.price) :selected === "Pending"? MyPackages.filter((item)=> item.end_date != currentDate):selected === "Completed"? MyPackages.filter((item)=> item.end_date === currentDate):MyPackages

const onRefresh = useCallback(() => {

  forceReload()
  setRefreshing(true)
  setTimeout(() => {
  setRefreshing(false)
 
},2000);


}, [])







/////////////// GUI RENDERING //////////////////////////////////////




function UpperCart(){

function IconList ({item}){
  return(
    <TouchableOpacity 
onPress={()=> {
  setSelected(item.name)
}}
style={styles.iconWrapper}>
<LinearGradient 
 colors= { selected === item.name ?[Colors.GoldII, Colors.GoldI]:[Colors.FontColorI, Colors.FontColorI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={item.icon}
style={{width:item.width,height:item.height}}

/>


</LinearGradient>
<Text style={{color:"white"}}>{item.name}</Text>
</TouchableOpacity>

  )
}


  return(
<View style={styles.UpperCart}>
<Text style={styles.balanceTitle}>Total Investment</Text>
<Text style={styles.BalanceTxt}>PKR {total_Record !=""? total_Record.Total_investment:0}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record !=""? total_Record.my_level:0}</Text></Text>
</View>


<View 
style={styles.catSection}>


<FlatList 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{justifyContent:"space-between"}}
horizontal
scrollEnabled={true}
data={InvestmentIcons}
renderItem={({item})=>
<IconList
item={item}
/>
}
/>
</View>
</View>
  )
}














// const data = selected === "All"? AllPackages : AllPackages.filter((item)=>item.status === selected)
const data =AllPackages
function LowerCart(){
    function InvestmentLists ({item}){
      const [showConfirmation,setShowConfirmation]=useState(false)
        const [isOpen ,setIsOpen]=useState(false)
      
function onHideModal(){
  setShowConfirmation((p)=>!p)
}



      return(
        <View style={styles.TrickContainer}>
      <Pressable
      onPress={()=> setIsOpen((p)=>!p)}
      style={styles.TrickContainerInner}>
 
      <Image 
      style={{width:49,height:49}} 
      source={{uri:Endpoints.ImageBaseUrl+item.image}}
      borderRadius={1000}
      />
      
      <View style={styles.InnerTricks}>
      <Text style={{fontWeight:'bold',fontSize:18,color:Colors.BgColor}}>{item.title}</Text>
      {/* <Text>please see the video.. below.......</Text> */}
      {
        selected === "New"?
        <>
        <Text style={styles.ListingText}>Status: <Text style={{color:Colors.send}}>{item.status}</Text></Text>
        <Text style={styles.ListingText}>Price: <Text style={{color:Colors.deposit}}>{item.price}</Text></Text>

        </>
      :
      <Text style={styles.ListingText}>Status: <Text style={{color:Colors.deposit}}>{item.end_date === currentDate ? "Completed":"Pending"}</Text></Text>

      }
      </View>
      <TouchableOpacity onPress={()=> setIsOpen((p)=>!p)}>
      <Image 
      source={DropDwn}
      style={{width:15,height:12}}
      />
      </TouchableOpacity>
      
      </Pressable>
      {
        isOpen === true &&
        <>
      <Text style={{textAlign:'center',marginTop:10,color:Colors.bgIII}}> 
      {item.description}
      
      </Text>

   <View style={styles.ListingRow}>

<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Profit
    </Text>
    <Text style={styles.ListingText}>{selected==="New" ? item.profit_income:item.applied_income}</Text>
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Price
    </Text>
    <Text style={styles.ListingText}>{selected ==="New"?item.price:item.applied_price}</Text>
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Duration
    </Text>
    <Text style={styles.ListingText}>{item.profit_duration}</Text>
</View>

   </View>


   <View style={styles.ListingRow}>

<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Status
    </Text>
    {
      selected === "New" ? 
      <Text style={styles.ListingText}>{item.status}</Text>:
      <Text style={styles.ListingText}>{item.end_date === currentDate ? "Completed":"Pending"}</Text>
    }
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Package Id
    </Text>
    <Text style={styles.ListingText}>{selected === "New"? item.id:item.package_id}</Text>
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Income Cycle
    </Text>
    <Text style={styles.ListingText}>{item.cycle_duration}</Text>
</View>

   </View>


{
  item.status === "active" && selected === "New" ?
   <TouchableOpacity 
onPress={()=> {
  // setSelectedPackage(item)
setShowConfirmation(true)

}}
>

<ImageBackground 
source={Button}
style={{alignSelf:'center',width:109,height:30,alignItems:'center'}}

>

<Text style={GlobalStyles.BtnText}>Invest</Text>

</ImageBackground>
</TouchableOpacity>   : null
}

{
  showConfirmation === true &&
<Confirmation 
IsVisible={showConfirmation} 
onHideModal={onHideModal} 
selectedPackage={item}
user={asyncdata.user}
currentDate={currentDate}
/>

}
      </>

      }
      </View>
      
      
      )
      }
      
return(
  <View style={styles.LowerCart}>
  <Text style={styles.L_Cart_Title}>{selected} Investment</Text>

  <ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
// refreshControl={
//   <RefreshControl
//   refreshing={refreshing}
//   onRefresh={onRefresh}

//   />
// }
>
{
dataFinal.length > 0 ?

dataFinal.map((item)=>{
  return(
    <InvestmentLists item={item} />

  )
}) :
<Text style={{color:Colors.BgColor,fontSize:18,marginTop:40,alignSelf:"center"}}>No data found!</Text>


}
<View style={{height:150,width:100}}>

</View>
</ScrollView>

</View>
)
}

  return (
    <SafeAreaView style={styles.Container}>


<View style={styles.Header}>
    <Text style={styles.OuterTxt}>Weclcome To{'\n'} <Text style={styles.InnerTxt}>Investment Screen</Text></Text>
  





    { user.pro_pic === "" || user.pro_pic === "default"?
        
        <Image source={Profile} style={{width:50,height:50}}/>
      :  
      <Image source={{uri:Endpoints.ImageBaseUrl+user.pro_pic}} style={{width:50,height:50,borderRadius:1000}}/>

      }
  
</View>



<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      
      />


<ScrollView nestedScrollEnabled={true}
    refreshControl={
      <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      


      />
    }

>
<UpperCart />

<LowerCart />

</ScrollView>

    </SafeAreaView>
  )
}
export default InvestmentScreen;

