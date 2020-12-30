import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS, } from 'react-native';
import axios from "axios";
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default function World_Covid_Stats({navigation}){
  
  const[world_population,set_world_population]=useState()
   const[confirmed_Cases , set_confirmed_Cases]=useState();
   const[recovered_Cases,  set_recovered_Cases]=useState();
   const[critical_Cases,  set_critical_Cases]=useState();
   const[total_deaths,   set_total_deaths]=useState();
  const[last_updated,set_last_updated]=useState();

useEffect(() => {
    
      getData();
    getworlddata();
  },[])
  function getworlddata(){
    const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-key': 'aec64fd556mshfa674fafaa07b6ap163ccajsneb7a247eec1e',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	set_world_population(response.data.body.world_population);
  console.log("check",response.data.body.world_population)
}).catch(function (error) {
	console.error(error);
});

  }
  
function getData() {
    

const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  params: {code: 'it'},
  headers: {
    'x-rapidapi-key': 'aec64fd556mshfa674fafaa07b6ap163ccajsneb7a247eec1e',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	set_confirmed_Cases(response.data[0].confirmed)
  set_recovered_Cases(response.data[0].recovered)
  set_critical_Cases(response.data[0].critical)
  set_total_deaths(response.data[0].deaths)
  set_last_updated(response.data[0].lastUpdate)

}).catch(function (error) {
	console.error(error);
});
  }





 function calculate(value){
    const val =(100 * value) / world_population
    return val.toFixed(4)
  }
 

return (
  <View style={styles.container}> 
    
  <View  style={styles.tiles}>  
  <Text style={styles.text1}>Total World Population: {world_population}</Text>
  </View>

  <View style={styles.tiles1}>  
    <Text style={styles.text2}>  Confirmed cases: {confirmed_Cases} are {calculate(confirmed_Cases)}% of world's population </Text>
  
  </View>
  
  <View style={styles.tiles1}>  
     <Text style={styles.text3}>  Recovered cases: {recovered_Cases} are {calculate(recovered_Cases)}% of world's population </Text>
  
  </View>
  
  <View style={styles.tiles1}>  
   <Text style={styles.text4}>  Critical cases: {critical_Cases} are {calculate(critical_Cases)}% of world's population </Text>
  
  </View>
  
  <View style={styles.tiles1}>  
   <Text style={styles.text5}>  Total Deaths: {total_deaths} are {calculate(total_deaths)}% of world's population </Text>
  </View>
  
  <View style={styles.tiles1}>  
   <Text style={styles.text6}> Last Updated {last_updated} </Text>
  </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

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
  text6:{
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'serif',
  
  }

 
});



