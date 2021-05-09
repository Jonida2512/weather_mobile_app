import React, {useState} from 'react'; 
import {TextInput , Button , Card } from 'react-native-paper' ; 
import {View ,Text, FlatList} from 'react-native' ;


import Header from './Header';
import IonIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage';
 
export default Search =({navigation})=> {
  const [city,setCity] = useState('')
  const [cities,setCities] = useState([])
  const apis_key = ' '
  const fetchCities = (text)=>{
      setCity(text)
      fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apis_key}&input=${text}")
      .then(item=>item.json())
      .then(cityData=>{
          setCities(cityData)
      })
      setCity(city)
  }

const btnClick = async ()=>{
    await AsyncStorage.setItem("newcity",city)
    navigation.navigate("home",{city:city})
}
const listClick = async (cityname)=>{
    setCity(cityname)
    await AsyncStorage.setItem("newcity",cityname)
    navigation.navigate("home",{city:cityname})
}
  return (
    <View style={{flex:1}}>
    <Header style={{backgroundColor:'#fa7346'}} name="Search City" />
     <TextInput style={{color: '#94817b'}}
      label="city .."
      value={city}
      onChangeText={(text)=>fetchCities(text)}
     />
   <Button
      icon="content-save"
      mode="contained" 
      style={{margin:20 , backgroundColor:'#fa7346'}}
      onPress={() => btnClick()}>
     <Text style={{color:"white"}}>Save</Text> 
   </Button >

   <FlatList
   data={cities}
   renderItem={({item})=>{
       return(
           <Card 
            style={{margin:2,padding:12 }}
            onPress={()=>listClick(item.name)}
           >
               <Text>{item.name}</Text>
           </Card>
       )
   }}
   keyExtractor={item=>item.name}
   />
</View>
  )
}
 
