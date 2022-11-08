import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,

 
} from 'react-native';
import styles from '../Recharge/Styles';


import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { DepositMethod ,RecentDeposit} from '../data/TopInvestors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import filterIcon from '../../assets/icons/filter.png';
import easypaissmall from '../../assets/icons/easypaissmall.png'
import BinanceSmall from '../../assets/icons/BinanceSmall.png'
import OkxSmall from '../../assets/icons/OkxSmall.png'
import JazzCashSmall from '../../assets/icons/JazzCashSmall.png'
import VisaSmall from '../../assets/icons/VisaSmall.png'
import GlobalStyles from '../GlobalStyles/GlobalStyles';

function Withdraw() {

const navigation = useNavigation()
const [selected , setSelected]=useState(1)





function DepositMethodd(){

function Navigation(item){
  navigation.navigate("Withdraw_now",{item:item})
}

  const RenderDeposit=({item})=>(
    <Pressable 
     onPress={()=> Navigation(item)}
     style={{shadowColor:'red', elevation:2}}>
    <Image source={item.Image}
    style={{width:134,height:90,marginRight:10,}}
    />
    </Pressable>
    )
    
return(
    <View style={styles.DepoistMethods}>

<FlatList 
showsHorizontalScrollIndicator={false}
horizontal={true}
data={DepositMethod}
renderItem={RenderDeposit}
/>



</View>
)
}









function LowerCart(){


  function HistoryWrapperList({item}){
    const PaymentIcon = item.Acc_Type === "EasyPaisa" ? easypaissmall : 
    item.Acc_Type === "Jazzcash" ? JazzCashSmall: 
    item.Acc_Type === "Binance" ? BinanceSmall :
    item.Acc_Type === "VISA" ? VisaSmall:
    item.Acc_Type === "OKX" ? OkxSmall:easypaissmall

const imgStyle={width:
item.Acc_Type === "VISA"?32:item.Acc_Type === "OKX" ?32:27,
height:item.Acc_Type === "VISA"?19:item.Acc_Type === "OKX" ?8:27,


}

    return(
  <View style={GlobalStyles.historyWrapper}>
  <View style={GlobalStyles.IconWrapper}>
  <Image 
  
  source={PaymentIcon}
  style={imgStyle}
  
  />
  </View>
  
  
  <View style={GlobalStyles.TitlesWrapper}>
    
    <Text style={GlobalStyles.TitleText}>Withdraw Via {item.Acc_Type}</Text>
    <Text style={GlobalStyles.ScndTxt}>4 days ago</Text>
     </View>
  
  <View style={GlobalStyles.TransactionWrapper}>
  <Text style={{color:Colors.danger}}>-{item.amount}</Text>
  </View>
  
  
  </View>
    )
  }
  


    return(
        <View style={styles.LowerCart}>
    <View style={styles.InnerlowCart}>
<Text style={styles.TxtClr}>Activity</Text>
<View style={styles.FilterWrap}>

<Text style={styles.TxtClr}>Filter</Text>
<Image source={filterIcon}
style={{width:13,height:13}}
/>
</View>
    </View>
   
<Text style={[styles.TxtClr,{margin:15}]}>Recent Withdrawls</Text>

<View style={GlobalStyles.HistoryCard}>
<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>

{
RecentDeposit.map((item)=>{
  return(
    <HistoryWrapperList item={item}/>
  )
}
)
}

</ScrollView>


     
    <View style={{height:30,width:30}}>


    </View>

</View>
</View>
    )
}


  return (
    <View style={styles.Container}>  
<Text style={styles.Text}>Withdraw</Text>
<ScrollView
nestedScrollEnabled={true}
>

<Text style={{color:Colors.placeHolder,marginLeft:15}}>Income</Text>
<Text style={[styles.Text,{marginTop:5}]}>$5000.00</Text>
<Text style={{color:Colors.PrimaryColor,fontWeight:'600',marginLeft:15,marginTop:-10}}>Withdraw Via</Text>

<DepositMethodd />
<LowerCart />
</ScrollView>

</View>
  )
}
export default Withdraw;

