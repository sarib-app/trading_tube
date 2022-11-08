import React, { useState } from 'react';
import {

  Text,

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import privacy_icon from '../../assets/icons/privacy_icon.png'
import ContentPrivacy from './PrivacyContent';
import ContentHeader from './ContentHeader';
import ContentBottom from './ContentBottom';

function PrivacyPolicy() {

const navigation = useNavigation()








  return (
    <SafeAreaView style={styles.Container}>


<ContentHeader 
icon ={privacy_icon}
width={47}
height={52}
title={"Privacy and Policy"}
/>

<ContentBottom
title="Privacy & Policy"
Content={ContentPrivacy}
/>


    </SafeAreaView>
  )
}
export default PrivacyPolicy;

