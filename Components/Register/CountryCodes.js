import React, { useState ,useEffect} from 'react';
import {

  Text,
  View,
  Pressable,
  Modal,
FlatList,
TextInput
 
} from 'react-native';
import styles from '../BankAllList/Styles';

import BankList   from '../data/BankList';
import Colors from '../GlobalStyles/Color';
import countries from '../data/CountryCode';
function CountryCode({
    isVisible,
    onSelectBank,
}) {

const data = countries
const [searchInput,setSearchInput]=useState("")

function BanksLists({item}){

      return(
        <Pressable 
        onPress={()=> onSelectBank(item.code)}
        style={styles.ListContainer}> 

      <Text style={{color:"white"}}>{item.code}</Text>  
        </Pressable>
      )

}
  
return (
    <Modal
    visible={isVisible}
    transparent={true}
    >

    <View style={styles.Container}>  
<Text style={styles.TitleText}>Select Country COde</Text>
<View style={styles.InputBox}>
<TextInput
placeholder='Search For Banks'
placeholderTextColor={Colors.placeHolder}
style={{flex:1,color:Colors.FontColorI}}
cursorColor={Colors.PrimaryColor}
onChangeText={(e)=> setSearchInput(e)}
// onPressIn={()=> setIsKeyOpen(true)}
// onEndEditing={()=> setIsKeyOpen(false)}
/>
  
</View>

<FlatList 
data={data.filter((item)=> item.name.toLowerCase().includes(searchInput.toLowerCase()))}
renderItem={({item})=>
<BanksLists
item={item}
/>
}
/>

<View style={{width:200,height:30}}>

</View>
</View>





</Modal>

  )
}
export default  CountryCode;

