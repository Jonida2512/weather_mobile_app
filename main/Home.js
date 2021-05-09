import React, {useState , useEffect} from 'react'; 
import {Title , TextInput , Button , Card } from 'react-native-paper' ; 
import {StyleSheet ,View ,Text, FlatList , Image} from 'react-native' ;
import PlacesAutocomplete from 'react-places-autocomplete';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

const Home = (props)=>{
    const [info , setInfo] = useState({
        name:" ",
        temp:"  ",
        temp_min: " ", 
        temp_max: " ",
        humidity:" ",
        desc:" ",
        icon:" ", 
    })

    useEffect(()=>{
       getWeather()
    },[])

    const getWeather = async ( )=> {
     //const api_key = 'f8443b13678430068289fe6ffd9235ba'
     const api_key = '16909a97489bed275d13dbdea4e01f59'
     let MyCity = await AsyncStorage.getItem("newcity")
     if(!MyCity){
        const {city} = props.route.params
        MyCity = city  
     }

          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=${api_key}&units=metric`)
          .then(data => data.json())
          .then(results=>{
           setInfo({
              name:results.name,
              temp:Math.round(results.main.temp),
              temp_min:Math.round(results.main.temp_min), 
              temp_max:Math.round(results.main.temp_max), 
              humidity:results.main.humidity,
              desc:results.weather[0].description,
              icon:results.weather[0].icon,
        })
     })
     .catch(err=>{
         console.log(err.message)
     })
    }
    if(props.route.params != 'barcelona')  {
        getWeather();
    }
    return(
        <View  style={{flex:1}}>
            
            <Header name="Weather App" style={{color:'#f5efed' , backgroundColor:'#fa7346'}}/>
            <View style={{alignItems:"center" , color:'#eb511a'}}>
               <Title 
               style={{
                   color:'#eb511a',
                   marginTop:30,
                   fontSize:30
               }}>
                   {info.name}
               </Title>
               <Image 
               style={{
                   width:120,
                   height:120
               }}
               source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}
               />
               <Title style={{color:"#ff6c3b" }}>{info.temp}°</Title>
               

           </View>

           <Card style={{
               margin:15,
               padding: 10, 
               justifyContent : 'center', 
               alignItems: 'center'
           }}>
           <Title style={{color:"#ff6c3b" }}>Temp Min   {info.temp_min}°</Title>
           </Card>

           <Card style={{
               margin:15,
               padding:10,
               justifyContent : 'center', 
               alignItems: 'center'
           }}>
           <Title style={{color:"#ff6c3b" }}>Temp Max  {info.temp_max}°</Title>
           </Card>

           <Card style={{
               margin:15,
               padding:10,
               justifyContent : 'center', 
               alignItems: 'center'
           }}>    
           <Title style={{color:"#ff6c3b" }}>Humidity {info.humidity}%</Title>
           </Card>

           <Card style={{
               margin:15,
               padding:10,
               justifyContent : 'center', 
               alignItems: 'center'
           }}>
           <Title style={{color:"#ff6c3b"}}>Description - {info.desc}</Title>
           </Card>
        </View>
    )
}

export default Home



