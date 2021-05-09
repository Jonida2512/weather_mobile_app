import React from 'react';
import { StyleSheet, Text, View , StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Search from './main/Search'
import Home from './main/Home'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createBottomTabNavigator()
const App= () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
      <NavigationContainer >
        <Tab.Navigator 
         screenOptions={({route})=>({
           tabBarIcon:({color})=>{
             let iconName;
             if(route.name==="home"){
               iconName = 'home-circle-outline'
             }else if(route.name==="search"){
               iconName = "image-search-outline"
             }
             return <MaterialCommunityIcons name={iconName} size={25} color={color} />
           }
         })}
         tabBarOptions={{
           activeTintColor:"white",
           inactiveTintColor:"gray",
           activeBackgroundColor:"#fa7346",
           inactiveBackgroundColor:"#fa7346"
         }}


        >
          <Tab.Screen name="home" component={Home} 
           initialParams={{city:"barcelona"}}
          />
          <Tab.Screen name="search" component={Search} />
        </Tab.Navigator>
      </NavigationContainer>
   </>
  );
};


export default App;