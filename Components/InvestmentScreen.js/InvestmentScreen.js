import React, { useState,useCallback } from 'react';
import {
  Text,
  Image,
  View,
ScrollView,
Pressable,
ImageBackground,
RefreshControl

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
function InvestmentScreen({
  AllPackages,
  forceReload,
  currentDate
}) {
   const asyncdata = getAsync()
  const [selected,setSelected]=useState("New") 


  const [refreshing, setRefreshing] = useState(false);


const navigation = useNavigation()


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}

/////Functions////////////




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
    <Pressable 
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
</Pressable>

  )
}


  return(
<View style={styles.UpperCart}>
<Text style={styles.balanceTitle}>Total Investment</Text>
<Text style={styles.BalanceTxt}>PKR 150,0000</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>1</Text></Text>
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
      <View style={styles.TrickContainerInner}>
 
      <Image 
      style={{width:49,height:49}} 
      source={{uri:Endpoints.ImageBaseUrl+item.image}}
      borderRadius={1000}
      />
      
      <View style={styles.InnerTricks}>
      <Text style={{fontWeight:'bold',fontSize:18,color:Colors.BgColor}}>{item.title}</Text>
      {/* <Text>please see the video.. below.......</Text> */}
      <Text style={styles.ListingText}>Status: <Text style={{color:Colors.deposit}}>{item.status}</Text></Text>

      </View>
      <Pressable onPress={()=> setIsOpen((p)=>!p)}>
      <Image 
      source={DropDwn}
      style={{width:15,height:12}}
      />
      </Pressable>
      
      </View>
      {
        isOpen === true &&
        <>
      <Text style={{textAlign:'center',marginTop:10}}> 
      {item.description}
      
      </Text>

   <View style={styles.ListingRow}>

<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Profit
    </Text>
    <Text style={styles.ListingText}>{item.profit_income}</Text>
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Price
    </Text>
    <Text style={styles.ListingText}>{item.price}</Text>
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
    <Text style={styles.ListingText}>{item.status}</Text>
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Package Id
    </Text>
    <Text style={styles.ListingText}>3</Text>
</View>
<View style={{alignItems:"center"}}>
    <Text style={styles.ListingTitle}>
    Income Cycle
    </Text>
    <Text style={styles.ListingText}>{item.cycle_duration}</Text>
</View>

   </View>



   <Pressable 
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
</Pressable>   
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
data.length > 0 ?

data.map((item)=>{
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
   <Image source={Profile} style={{width:50,height:50}}/>
</View>


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

