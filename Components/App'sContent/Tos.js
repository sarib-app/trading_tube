import React, { useState } from 'react';
import {

  Text,

 
} from 'react-native';
import styles from './Styles';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import terms_icon from '../../assets/icons/terms_icon.png'
import ContentPrivacy from './PrivacyContent';
import ContentHeader from './ContentHeader';
import ContentBottom from './ContentBottom';

function Tos() {

const navigation = useNavigation()








  return (
    <SafeAreaView style={styles.Container}>


<ContentHeader 
icon ={terms_icon}
width={39}
height={51}
title={"Terms of Services"}
/>

<ContentBottom
title="Terms of Services"
Content={ContentPrivacy}
/>


    </SafeAreaView>
  )
}
export default Tos;

