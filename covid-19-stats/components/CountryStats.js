import React, {useState, useEffect} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS,TextInput,FlatList,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  textInputView:{
  paddingTop:20,
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
  
    text2:{
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  text3:{
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  text4:{
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  text5:{
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'brown',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'serif',
  
  },
  text6:{
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'serif',
  
  },
  diplaycountry: {
    textAlign:'center',
    flexDirection:'row',
     fontSize: 20,
     paddingHorizontal:10,
     paddingVertical:10,
    fontFamily: 'serif',
     elevation: 8,
  
   
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
 export default function Country_Covid_Stats({navigation,route}){

   const[countries,set_Countries]=useState([])
  const[fav_countries,set_fav_countries]=useState('')
  const [array_holder,set_array_holder] =useState([])
   const[text, set_text] = useState('')
  useEffect(() => {
    loaddata()
    getData();
    
  },[])
    function getData() {
    const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-key': 'aec64fd556mshfa674fafaa07b6ap163ccajsneb7a247eec1e',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  set_Countries(response.data.body.countries)
  set_array_holder(response.data.body.countries)
}).catch(function (error) {
	console.error(error);
});
  } 
   const loaddata=async()=>{
    try{
      AsyncStorage.getItem('favorite_Country').then(
      (value) =>{
        console.log("val",value)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  
  


     
     const searchData= (text)=>  {
    const newData = array_holder.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

      set_Countries(newData)
      set_text(text)
    }
     const stats_screen=(item)=>{
       console.log ("selected country is",item)
       navigation.navigate('Stats by country',{
         country: item
          })
     }
      const addfitem =async(country)=>{
    
    try {
      const value = await AsyncStorage.getItem('favorite_Country');
      console.log("added",fav_countries, value)
     
    
    
           await AsyncStorage.setItem('favorite_Country', value+","+country);
          
        } catch (error) {
            // Error saving data
        }
        
  }
 
return ( 
  <ScrollView>
<View style={styles.container}> 
  <View style={styles.textInputView}>  
  <TextInput style={styles.textinput1}
   placeholder="Search here" onChangeText={(text) => searchData(text)}
         value={text}
   
  >
         
   
  </TextInput>
     <FlatList
        data={countries}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.diplaycountry} >
         <Text onPress={()=>{stats_screen(item)}} style={styles.text7}>{item}{item.check}></Text>
       <Ionicons name="star" size={20} color="#2b8265" 
       onPress={()=>{addfitem(item)}}
       />
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />
  
  </View>
 
  </View>
  </ScrollView>
);
}

