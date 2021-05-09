import * as React from 'react'; 
import {Appbar , Title} from 'react-native-paper' ; 
import {View ,Text} from 'react-native' ;


export default Header  = (props) => {
  
  return (
    <Appbar.Header
            style={{flexDirection: 'row' , justifyContent : 'center' , backgroundColor: "#fa7346"}}
            >
    </Appbar.Header>
  );
 }
