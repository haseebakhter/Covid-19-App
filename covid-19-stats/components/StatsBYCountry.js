import React, {useState, useEffect} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS,TextInput,FlatList,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Ionicons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  textInputView:{
  paddingTop:120,
  },
  textinput1:{
    textAlign: 'center',
    fontSize: 20,
    borderRadius:15,
    height: 50,
    width: 320,
   fontFamily: 'serif',
   borderColor:'#2b8265',
  borderWidth:3,
 
    
  },
  tiles:{
    paddingTop:20,
  },
  tiles1:{
    paddingTop:15,
  },
  
  text1:{
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    height: 50,
    width: 320,
    fontFamily: 'serif',
    borderBottomWidth:3,
    borderColor:'#2b8265'
  
  },
    text2:{
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    height: 70,
    width: 320,
    fontFamily: 'serif',
     borderBottomWidth:3,
    borderColor:'#2b8265'
  
  },
  text3:{
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    borderBottomWidth:3,
    borderColor:'#2b8265',
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  text4:{
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
   borderBottomWidth:3,
    borderColor:'#2b8265',
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  text5:{
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  borderBottomWidth:3,
    borderColor:'#2b8265',
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  diplaycountry: {
    textAlign:'center',
    flexDirection:'row',
     fontSize: 20,
     paddingHorizontal:10,
     paddingVertical:10,
    fontFamily: 'serif',
  
   
    alignItems: 'center',
 
  },
  text7:{
    fontSize: 18,
    color: 'black',
    fontFamily: 'serif',
  
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#2b8265',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
     fontFamily: 'serif',
  },
   header:{
   backgroundColor:"#2b8265",
    borderRadius:10,
    height: 50,
    width: 400,
  },
  headertext:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight:'bold',
    color:'white',
  },
  
});

export default function Stats_Screen({route,navigation}){
  const[confirmed_Cases , set_confirmed_Cases]=useState();
   const[recovered_Cases,  set_recovered_Cases]=useState();
   const[critical_Cases,  set_critical_Cases]=useState();
   const[total_deaths,   set_total_deaths]=useState();
  const[last_updated,set_last_updated]=useState();
   const[country,set_country]=useState()
  useEffect(() => {
    set_country(route.params.country)
    console.log(route.params.country)
    get_Country_Data(route.params.country);
  },[route.params.country])
    
 

     function get_Country_Data(country){
const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/country',
  params: {name: country},
  headers: {
    'x-rapidapi-key': 'aec64fd556mshfa674fafaa07b6ap163ccajsneb7a247eec1e',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data[0]);
  set_confirmed_Cases(response.data[0].confirmed)
  set_recovered_Cases(response.data[0].recovered)
  set_critical_Cases(response.data[0].critical)
  set_total_deaths(response.data[0].deaths)
  set_last_updated(response.data[0].lastUpdate)

}).catch(function (error) {
	console.error(error);
});
    
  }
  return(
    <View style={styles.container} >  
      <View style={styles.header}>   
   <Text style={styles.headertext}>  Stats By Country</Text>
  </View>
<View style={styles.tiles1}>
     <Text style={styles.text7}>  Country:  {country}   </Text>  
    <Text style={styles.text2}>  Confirmed cases: {confirmed_Cases}  </Text>
  
  </View>
  
  <View style={styles.tiles1}>  
     <Text style={styles.text3}>  Recovered cases: {recovered_Cases} </Text>
  
  </View>
  
  <View style={styles.tiles1}>  
   <Text style={styles.text4}>  Critical cases: {critical_Cases}  </Text>
  
  </View>
  
  <View style={styles.tiles1}>  
   <Text style={styles.text5}>  Total Deaths: {total_deaths}  </Text>
  </View>
  
  <View style={styles.tiles1}>  
   <Text style={styles.text6}> Last Updated {last_updated} </Text>
  </View>

    
     <TouchableOpacity style={styles.appButtonContainer}
     onPress={() => navigation.navigate('View by Country')}
     > 
      <Text style={styles.appButtonText}> Go Back To Search  </Text>
      </TouchableOpacity>
      <View style={styles.tiles1}>
      <TouchableOpacity style={styles.appButtonContainer}
     onPress={() => navigation.navigate('Favourite Countries')}
     > 
      <Text style={styles.appButtonText}> Favourite Countries  </Text>
      </TouchableOpacity>
     </View>

    </View>
  );
}
