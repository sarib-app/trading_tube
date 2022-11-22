import React, { useState } from 'react';
import {

  Text,
  Image,
  View,
ScrollView,
Pressable,
TouchableOpacity,

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/icons/5.png'
import Colors from '../GlobalStyles/Color';

import LinearGradient from 'react-native-linear-gradient';
import plansIcon from '../../assets/icons/plans.png'
import RechargeIcon from '../../assets/icons/Recharge.png'
import withdrawIcon from '../../assets/icons/withdraw.png'
import promotion from '../../assets/gif/promotion.gif'

import helpIcon from '../../assets/icons/help.png'
import jobsIcon from '../../assets/icons/jobs.png'
import nftIcon from '../../assets/icons/nft.png'
import tradeIcon from '../../assets/icons/trade.png'
import TipsIcon from '../../assets/icons/tips.png'
import shopIcon from '../../assets/icons/shop.png'
import notification from '../../assets/icons/notification.png'

import gameIcon from '../../assets/icons/game.png'
import {TopInvestors, TipsTricks} from '../data/TopInvestors';
import { FlatList } from 'react-native-gesture-handler';
import DropDwn from '../../assets/icons/dropdown.png'
import Banner from '../../assets/icons/Banner.png'
import WebView from 'react-native-webview';
import Coming_Soon from '../Help/Comingg_Soon';

function Home({data,total_Record}) {




const navigation = useNavigation()


const start={x: 0.1, y: 0.8}
const end = {x: 0, y: 0}


function UpperCart(){
  const [showComingSoon,setShowComingSoon] = useState(false)
  function onHideComingsoon(){
setShowComingSoon((P)=> !P)
  }
  return(


<View style={[styles.UpperCart,{marginBottom:0}]}>
<Text style={styles.balanceTitle}>Total Balance</Text>
<Text style={styles.BalanceTxt}>PKR {total_Record !=""? total_Record.Total_balance != null ? total_Record.Total_balance:0:0}</Text>

<View style={styles.LvlContainer}>
<Text style={styles.LvlTxt}>Level <Text style={styles.LvlinnerTxt}>{total_Record.my_level}</Text></Text>
</View>
<View style={{height:80,marginTop:15}}>

<ScrollView 
showsHorizontalScrollIndicator={false}
horizontal={true}
// contentContainerStyle={{justifyContent:'space-between'}}
style={styles.catSection}>
<Pressable 
onPress={()=> navigation.navigate('Recharge')}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={RechargeIcon}
style={{width:20,height:30}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Recharge</Text>
</Pressable>




<Pressable 
onPress={() => navigation.navigate("Withdraw")}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={withdrawIcon}
style={{width:27,height:27}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Withdraw</Text>
</Pressable>







<Pressable 
onPress={()=> navigation.navigate("PlanDecider")}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={plansIcon}
style={{width:27,height:27}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Plans</Text>
</Pressable>






<Pressable 
onPress={()=> navigation.navigate('Decider')}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={helpIcon}
style={{width:27,height:27}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Help</Text>
</Pressable>






<Pressable 
onPress={()=> setShowComingSoon(true)}
style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={jobsIcon}
style={{width:28,height:23}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Jobs</Text>
</Pressable>





<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={gameIcon}
style={{width:30,height:24}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Games</Text>
</Pressable>




<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={shopIcon}
style={{width:29,height:25}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Shop</Text>
</Pressable>




<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={tradeIcon}
style={{width:31,height:22}}

/>


</LinearGradient>
<Text style={{color:"white"}}>Trading</Text>
</Pressable>








<Pressable 
onPress={()=> setShowComingSoon(true)}

style={styles.iconWrapper}>
<LinearGradient 
 colors={[Colors.GoldII, Colors.GoldI]}
 start={start} end={end}     
style={styles.CatIcon}>


<Image 
source={nftIcon}
style={{width:30,height:28}}

/>


</LinearGradient>
<Text style={{color:"white"}}>NFT</Text>
</Pressable>
</ScrollView>
</View>

<Coming_Soon 
IsVisible={showComingSoon}
onHideModal={onHideComingsoon}
/>
</View>

  )
}




const Investor =({item}) =>(
<View style={styles.ProfileWrapper}>
<Image source={item.image} style={{width:60,height:60}} />
<Text style={{color:Colors.BgColor}}>{item.name}</Text>
</View>
)





function LowerCart(){
  const TipsTrickss =({item})=>{

    const [isOpen ,setIsOpen]=useState(false)
  
  return(
    <View style={styles.TrickContainer}>
  <Pressable 
  
  onPress={()=> setIsOpen((p)=>!p)}
  style={styles.TrickContainerInner}>
  
  
  
  <Image 
  style={{width:49,height:49}} 
  source={TipsIcon}
  />
  
  <View style={styles.InnerTricks}>
  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.BgColor}}>{item.title}</Text>
  {/* <Text>please see the video.. below.......</Text> */}
  
  </View>
  <TouchableOpacity onPress={()=> setIsOpen((p)=>!p)}>
  <Image 
  source={DropDwn}
  style={{width:18,height:15}}
  />
  </TouchableOpacity>
  
  </Pressable>
  {
    isOpen === true &&
    <>
  <Text style={{textAlign:'center',marginTop:10,color:Colors.bgIII}}> 
  {item.body}
  </Text>
  <WebView 
  style={{width:300,height:150}}
  source={{uri: item.embeded_link}}
  
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
  >
  </WebView>
  </>

  }
  </View>
  
  
  )
  }
  
return(
  <View style={styles.LowerCart}>
  
  <Text style={styles.L_Cart_Title}>Top Investors</Text>
  
  <View style={styles.lowerProfilesCart}>

<FlatList 
data={TopInvestors}
renderItem={Investor}
horizontal={true}
showsHorizontalScrollIndicator={false}
scrollEnabled={true}
/>

</View>

<Text style={[styles.L_Cart_Title,{marginTop:0}]}>Tips & Tricks</Text>

<ScrollView
showsVerticalScrollIndicator={false}
nestedScrollEnabled={true}
>

{
data.length > 0 &&
data.map((item)=>{
  return(
    <TipsTrickss item={item} />

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
    <Text style={styles.OuterTxt}>Weclcome{'\n'} <Text style={styles.InnerTxt}>Username</Text></Text>

    <View style={{flexDirection:'row'}}>
<TouchableOpacity
  onPress={()=> navigation.navigate("Notification")}

>

    <Image source={notification} style={{width:35,height:35,tintColor:Colors.PrimaryColor}}/>
</TouchableOpacity>
  
  <TouchableOpacity
  onPress={()=> navigation.navigate("LevelRewards")}
  >

   <Image source={{uri:"https://img.icons8.com/glyph-neue/64/null/packaging.png"}} style={{width:35,height:35,tintColor:Colors.PrimaryColor}}/>
  </TouchableOpacity>

  </View>

</View>


<ScrollView nestedScrollEnabled={true}

>
<UpperCart/>
{/* <Pressable
onPress={()=> navigation.navigate("PromotionScreen")}

style={{backgroundColor:"red"}}
>
<Text style={{color:"white",fontWeight:"bold",fontSize:18,margin:10,alignSelf:"center"}}>
  Kindly Collect Your 500 Rupees Now
</Text>
  
</Pressable> */}
<Pressable
onPress={()=> navigation.navigate("PromotionScreen")}
>

<Image 
source={require("../../assets/gif/promotionn.gif")}
style={{ width:320,
  height:120,
  margin:10,
  alignSelf:"center"  }}
/>
</Pressable>

<LowerCart/>

</ScrollView>
{/* <Pressable
onPress={()=> navigation.navigate("PromotionScreen")}
style={{right:0,top:100,position:'absolute'}}>
 
<Image 
source={promotion}
style={{width:80,height:80}}
/>
</Pressable> */}

    </SafeAreaView>
  )
}
export default Home;

