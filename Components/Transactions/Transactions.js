import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable
 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';

import LinearGradient from 'react-native-linear-gradient';
import credited from '../../assets/icons/credited.png'
import debited from '../../assets/icons/debited.png'



import {TipsTricks,DepositTransaction} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler'; 
import { TransactionIcons } from '../data/TopInvestors';
function Transactions() {
  const [selected,setSelected]=useState("All")

const navigation = useNavigation()


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}

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
<Text style={styles.balanceTitle}>Total {selected==="All"?"Income":selected}</Text>
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
data={TransactionIcons}
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











function LowerCart(){
  const data = selected==="All"?DepositTransaction:DepositTransaction.filter((item)=>item.type===selected)
  const TransactionList =({item})=>{

  const amountClr= item.type === "Deposit"?Colors.deposit:item.type === "Withdraw"?Colors.danger:Colors.send
  const transIcon = item.type === "Deposit"?credited:debited
  const operator = item.type ==="Withdraw"?"-":"+"

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
  <Text>{item.time}</Text>
  
  </View>
  
  
  </View>
  
  
  <Text style={[styles.TransactionText,{color:amountClr}]}>{operator}{item.amount} PKR</Text>
  
  
  </View>
  
  
  )
  }

return(
  <View style={styles.LowerCart}>
  <Text style={styles.L_Cart_Title}>Recenet Transactions</Text>




<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>
{data.map((item)=>{
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
    <Text style={styles.OuterTxt}>Weclcome To{'\n'} <Text style={styles.InnerTxt}>Transactions</Text></Text>
   <Image source={Profile} style={{width:50,height:50}}/>
</View>


<ScrollView nestedScrollEnabled={true}

>
<UpperCart/>

<LowerCart/>

</ScrollView>

    </SafeAreaView>
  )
}
export default Transactions;
