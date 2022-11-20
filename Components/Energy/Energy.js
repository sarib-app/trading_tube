import React, { useState,useCallback } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
RefreshControl
 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';

import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'

import LinearGradient from 'react-native-linear-gradient';

import {DepositTransaction,TeamsComission,DailyIncomeData} from '../data/TopInvestors';
import DailyIncome from '../../assets/icons/DailyIncome.png'
import TeamComission from '../../assets/icons/TeamComission.png'
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
import GlobalProgressLoader from '../LoadingModal/LoadingModal';
import getAsync from '../GetAsynData/getAsync';
function EnergyScreen({
  DailyIncomes,
  forceReload,
  currentDate,
  total_Record,
  allComissions

}) {
  const asyncdata = getAsync()
  const [refreshing, setRefreshing] = useState(false);

  const [selected,setSelected]=useState("Income")
 
const navigation = useNavigation()


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}


// const LowerCardTitle = selected === "Income"?"Daily Income":"Team's Comission"
const LowerCardTitle = selected === "Income"?"Daily Income":"Team's Comission"





const onRefresh = useCallback(() => {

  forceReload()
  setRefreshing(true)
  setTimeout(() => {
  setRefreshing(false)
 
},2000);


}, [])




function UpperCart(){





  return(


<View style={styles.UpperCart}>
<Text style={styles.balanceTitle}>Total {"Income"}</Text>
<Text style={styles.BalanceTxt}>PKR {total_Record !=""? total_Record.Total_income:0}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record !=""? total_Record.my_level:0}</Text></Text>
</View>


<View 
style={styles.catSection}>
<Pressable
onPress={()=> setSelected("Income")}
style={{alignItems:'center'}}
>

<LinearGradient 
 colors={[ selected === "Income"? Colors.GoldII:Colors.bgIII, selected === "Income"? Colors.GoldI:Colors.bgIII]}
 start={start} end={end}     
style={styles.iconWrapper}>


<Image
style={{width:42,height:42,tintColor:selected === "Income"?Colors.BgColor:Colors.FontColorI}}
source={DailyIncome}
/>


</LinearGradient>
<Text style={{color:Colors.FontColorI}}>
Daily Income
</Text>
</Pressable>

<Pressable
onPress={()=> setSelected("Comission")}
style={{alignItems:'center'}}

>


<LinearGradient 
 colors={[ selected === "Comission"? Colors.GoldII:Colors.bgIII, selected === "Comission"? Colors.GoldI:Colors.bgIII]}
 start={start} end={end}     
style={styles.iconWrapper}>


<Image
style={{width:41,height:46,tintColor:selected === "Comission"?Colors.BgColor:Colors.FontColorI}}
source={TeamComission}
/>


</LinearGradient>

<Text style={{color:Colors.FontColorI}}>
Team Comission
</Text>

</Pressable>



</View>
</View>



  )
}











function LowerCart(){
  const data = selected=== "Income"? DailyIncomes.filter((item)=> item.earn_date === currentDate):allComissions



  const ComissionList =({item})=>{

    const amountClr= selected==="Income"?Colors.send:Colors.deposit
    const transIcon = debited
    const operator = "+"
  
      const [isOpen ,setIsOpen]=useState(false)
    
    return(
      <View style={styles.TrickContainer}>
    
    
    <View style={{flexDirection:'row',alignItems:"center"}}>
    <View style={styles.IconWrapper}>
    
    <Image 
    style={{width:22,height:22,tintColor:amountClr}} 
    source={transIcon}
    />
    
    
    </View>
    
    
    
    <View style={styles.InnerTricks}>
    <Text style={{fontWeight:'bold',fontSize:18,color:Colors.BgColor}}>{item.type}</Text>
    
  
    {selected === "Income"?
    <>
    <Text>Package Id: {item.package_Id}</Text>
    <Text>Package: {item.package_Name}</Text>
    </>
    
    :
  <>
    <Text>Member name: {item.mem_name}</Text>
    <Text>Chain: {item.Chain}</Text>
    </>
  
    }
  
  
  
     
     
    <Text>5 days ago</Text>
    
    </View>
    
    
    </View>
    
    
    <Text style={[styles.TransactionText,{color:amountClr}]}>{operator}{item.amount} PKR</Text>
    
    
    </View>
    
    
    )
    }
  

  
  const TransactionList =({item})=>{
    const [showProgressLoader,setshowProgressLoader]=useState(false)
    function onHideLoader(){
    setshowProgressLoader((p)=>!p)
    }
const [isGot,SetIsGot]=useState(item.is_got)

function onCollect(){
  SetIsGot("1")
}



    function CollectIncome(){
      setshowProgressLoader(true)
      var formdata = new FormData();
      formdata.append("id", item.id);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${BaseUrl}${Endpoints.CollectInvestment}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          
        if(result.status==="200"){
          forceReload()
          onHideLoader()
          onCollect()

        }
        else{
          forceReload()
          onHideLoader()

        }
          
        })
        .catch(error => {
          forceReload()

          onHideLoader()
          console.log('error', error)});
    
    
    }
    


  const amountClr= Colors.send
  const transIcon = debited
  const operator = "+"

    const [isOpen ,setIsOpen]=useState(false)
  
  return(
    <View style={styles.TrickContainer}>
  
  
  <View style={{flexDirection:'row',alignItems:"center"}}>
  <View style={styles.IconWrapper}>
  
  <Image 
  style={{width:22,height:22,tintColor:amountClr}} 
  source={transIcon}
  />
  
  
  </View>
  
  
  
  <View style={styles.InnerTricks}>
  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.BgColor}}>{selected === "Income" ? "Income":"Comission"}</Text>
  
{
  selected === "Income" ?

  <>
  <Text style={{color:Colors.bgIII}}>Package Id: {item.package_id}</Text>
  <Text style={{color:Colors.bgIII}}>Cycle Ends at: {item.end_date}</Text>
  <Text style={{color:Colors.bgIII}}>Available at: {item.earn_date}</Text>
  </>:
    <>
    <Text style={{color:Colors.bgIII}}>Chain Name: {item.username}</Text>
    <Text style={{color:Colors.bgIII}}>Chain Id: {item.commission_from}</Text>
    </>
}



  </View>
  
  
  </View>
  
  <View style={{alignItems:"center"}}>
  <Text style={[styles.TransactionText,{color:amountClr}]}>{operator}{selected === "Income"? item.single_earning:item.commission} PKR{'\n'}</Text>


  {selected === "Income"?
    isGot === "0" ?
    <Text 
    onPress={()=> CollectIncome()}
    style={[styles.TransactionText,{color:Colors.deposit}]}>Collect Now</Text>
:
<Text style={[styles.TransactionText,{color:Colors.placeHolder}]}>Collected</Text>:null

  }
  </View>

  {
  showProgressLoader === true &&
<GlobalProgressLoader 
IsVisible={showProgressLoader} 
onHideLoader={onHideLoader} 

/>

}
  
  </View>
  
  
  )
  }

return(
  <View style={styles.LowerCart}>
  <Text style={styles.L_Cart_Title}>{LowerCardTitle}</Text>




<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>
{
data.length < 1?
<Text style={{color:Colors.BgColor,fontSize:18,marginTop:40,alignSelf:"center"}}>No data found!</Text>:
data.map((item)=>{
  return(
    <TransactionList item={item} />

  )
})}
<View style={{height:150,width:100}}>

</View>
</ScrollView>




</View>

)
}





  return (
    <SafeAreaView style={styles.Container}>


<View style={styles.Header}>
    <Text style={styles.OuterTxt}>Weclcome To{'\n'} <Text style={styles.InnerTxt}>Daily Transaction</Text></Text>
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
<UpperCart/>

<LowerCart/>

</ScrollView>




    </SafeAreaView>
  )
}
export default EnergyScreen;

