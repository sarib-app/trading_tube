import React, { useState } from 'react';
import {
  Text,
  View,

Modal,
TouchableOpacity,
Alert
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import Colors from '../GlobalStyles/Color';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import GlobalProgressLoader from '../LoadingModal/LoadingModal';
import BaseUrl from '../../Urls';
import Endpoints from '../../EnDPoints';
function Confirmation({
  IsVisible,
  onHideModal,
  selectedPackage,
  user

}) {


const navigation = useNavigation()
const [showProgressLoader,setshowProgressLoader]=useState(false)

function onHideLoader(){
setshowProgressLoader((p)=>!p)
}

console.log(selectedPackage.single_payment)


function InvestOnpackage(){
  var date = new Date().getDate()+10;
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
const currentDate = year+"-"+month+"-"+date;//format: d-m-y;



console.log(currentDate)

      var formdata = new FormData();
      formdata.append("package_id", selectedPackage.id);
      formdata.append("user_id", user.id);
      formdata.append("end_date", currentDate);
      formdata.append("single_earning",selectedPackage.single_payment);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch(`${BaseUrl}${Endpoints.AddInvestment}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if(result.status==="200"){
            console.log(result)
        
            setshowProgressLoader(false)
            onHideLoader()
            alert("cONGRATULATIONS !!!")

          }
        })
        .catch(error => console.log('error', error));





}


return (
    <Modal
    visible={IsVisible}
    transparent={true}
    animationType="slide"
    >

    <SafeAreaView style={[styles.Container,{backgroundColor:"rgba(0,0,0,0.8)",justifyContent: "center",
}]}>


<View style={styles.ModalDetail}>
<Text 
onPress={()=> onHideModal()}
style={styles.ModalTitles}>Close</Text>


<View style={styles.ModalHeader}>
<View style={[styles.InnerModalHeader,{borderColor:Colors.placeHolder,borderRightWidth:1}]}>
<Text style={styles.ModalTXt}>Package Id</Text>
<Text style={styles.ModalTXt}>Package</Text>
<Text style={styles.ModalTXt}>Profit</Text>
<Text style={styles.ModalTXt}>Price</Text>
<Text style={styles.ModalTXt}>Profit Duration</Text>
<Text style={styles.ModalTXt}>Income Cycle</Text>
<Text style={styles.ModalTXt}>Income per day</Text>


</View>
<View style={styles.InnerModalHeader}>
<Text style={styles.ModalTXt}>{selectedPackage.id}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.title}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.profit_income}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.price}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.profit_duration}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.cycle_duration}</Text>
<Text style={styles.ModalTXt}>{selectedPackage.single_payment}</Text>

</View>
</View>






  <Text style={[styles.ModalTXt,{color:Colors.PrimaryColor}]}>Are you sure you want to Invest ?</Text>

  <Text 
  onPress={()=>  {
    InvestOnpackage()
    setshowProgressLoader(true)}}
  
  style={[styles.ModalTXt,{color:Colors.send,marginTop:20,textDecorationLine:"underline"}]}>Yes, I want to Invest!</Text>


</View>




{
  showProgressLoader === true &&
<GlobalProgressLoader 
IsVisible={showProgressLoader} 
onHideLoader={onHideLoader} 

/>

}



    </SafeAreaView>
    </Modal>

  )
}
export default  Confirmation;

