import React, { useEffect, useState } from 'react';
import {

  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Home from '../Home/Home';
import homeIcon from '../../assets/icons/home.png'
import investIcon from '../../assets/icons/invest.png'
import TransactionIcon from '../../assets/icons/transactions.png'
import EnergyIcon from '../../assets/icons/Energy.png'

import profile from '../../assets/icons/profile.png'
import Colors from '../GlobalStyles/Color';
import Transactions from '../Transactions/Transactions';
import EnergyScreen from '../Energy/Energy';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import InvestmentScreen from '../InvestmentScreen.js/InvestmentScreen';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
function Main() {

const navigation = useNavigation()
const [selected , setSelected]=useState(1)
const [AllPackages,setAllPackages]=useState([])


function changeState(val){
  setSelected(val)
}





useEffect(()=>{


  if(selected === 3 && AllPackages.length < 1){
    FetchPackages()
  }

  
  
  },[selected])



  function forceReload (){
if(selected === 3){
  FetchPackages()
}

  }


  function FetchPackages(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}${Endpoints.fetchallpackage}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === "200"){
          console.log(result)
          setAllPackages(result.Packages)

        }
      })
      .catch(error => console.log('error', error));
  }




  



















function BottomBar(){
return(
  <View
  
  style={styles.BottomBar}>



<TouchableOpacity
onPressIn={()=> changeState(1)}

>
<Image 

source={homeIcon}
style={{width:29,height:27,tintColor:selected===1?Colors.PrimaryColor:Colors.FontColorI}}
/>

</TouchableOpacity>


<TouchableOpacity
onPressIn={()=> changeState(2)}

>

<Image 
source={TransactionIcon}
style={{width:32,height:24,tintColor:selected===2?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>


<TouchableOpacity
onPressIn={()=> changeState(3)}

>

<Image 
source={investIcon}
style={{width:30,height:31,tintColor:selected===3?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>

<TouchableOpacity
onPressIn={()=> changeState(4)}

>

<Image 
source={EnergyIcon}
style={{width:14,height:28,tintColor:selected===4?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>

<TouchableOpacity
onPressIn={()=> changeState(5)}

>

<Image 
source={profile}
style={{width:29,height:27,tintColor:selected===5?Colors.PrimaryColor:Colors.FontColorI}}
/>
</TouchableOpacity>



</View>
)
}


  return (
    <> 
    {
      selected === 1 && 
<Home val={1}/>
    }
    {
      selected === 2&&
<Transactions/>
}
{
      selected === 3&&
<InvestmentScreen 
AllPackages={AllPackages}
forceReload={forceReload}

/>
}
{
      selected === 4&&
<EnergyScreen/>
}


{
      selected === 5&&
<ProfileScreen />
}
<BottomBar/>

    </>
  )
}
export default Main;

