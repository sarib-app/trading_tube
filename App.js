import React,{useEffect} from 'react';
import {
  StyleSheet,

} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Recharge from './Components/Recharge/Recharge';
import DepositScreen from './Components/DepositNow/Deposit';
import Withdraw from './Components/Withdraw/Withdraw';
import Withdraw_now from './Components/Withdraw_Now/Withdraw_now';
import MyTeam from './Components/MyTeam/MyTeam';
import TeamComissionScreen from './Components/MyTeam/TeamComission';
import PrivacyPolicy from './Components/App\'sContent/PrivacyPolicy';
import Tos from './Components/App\'sContent/Tos';
import AboutUs from './Components/App\'sContent/AboutUs';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import Help from './Components/Help/Help';
import PromotionScreen from './Components/PromotionScreen/PromotionScreen';
import Decider from './Components/Help/Decider';
import LiveChat from './Components/Help/LiveChat';
const Stack = createNativeStackNavigator();

const App = () => {
return( 
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Register"   screenOptions={{
      headerShown: false
    }}
    >
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="Recharge" component={Recharge} />
    <Stack.Screen name="DepositScreen" component={DepositScreen} />
    <Stack.Screen name="Withdraw" component={Withdraw} />
    <Stack.Screen name="Withdraw_now" component={Withdraw_now} />
    <Stack.Screen name="MyTeam" component={MyTeam} />
    <Stack.Screen name="TeamComissionScreen" component={TeamComissionScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="Tos" component={Tos} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    <Stack.Screen name="Help" component={Help} />
    <Stack.Screen name="Decider" component={Decider} />

    <Stack.Screen name="LiveChat" component={LiveChat} />

    <Stack.Screen name="PromotionScreen" component={PromotionScreen} />


    </Stack.Navigator>
    </NavigationContainer>
    )

};



export default App;
