import React, {useState, useEffect} from 'react';
import { Button, View, Text, FlatList,StyleSheet, TouchableOpacity,ScrollView ,NavigatorIOS,navigation} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons } from '@expo/vector-icons';
export default function Favourite_Country_Covid_Stats({ route,navigation }) {
  const[fav_countries,set_fav_countries]=useState([])
  
  useEffect(() => {
    
    loaddata()
    
  },[])
    
  const loaddata=async()=>{
    try{
      AsyncStorage.getItem('favorite_Country').then(
      (value) =>{
        console.log("val",value)
        var array = value.split(",");
        console.log(array)
        var uniqueArray = [];
        
        // Loop through array values
        for(  var i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        set_fav_countries(uniqueArray)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  
  
 const stats_screen=(item)=>{
       console.log ("selected country is",item)
       navigation.navigate('Stats by country',{
         country: item
          })
     }
   const removeItem= async(item)=>{
     console.log(item)
     const index=fav_countries.indexOf(""+item+"")
     console.log(index)
     if (index>-1){
       (fav_countries.splice(index,1));
     }
     console.log(fav_countries)
     for (var i=0;i<fav_countries.length;i++){
       try{
         if(i>0){
                const value=await AsyncStorage.getItem('fav_countries');
                await AsyncStorage.setItem('fav_countries',value+ ','+fav_countries[i]);

         }
         else if (i==0){
           await AsyncStorage.setItem('fav_countries',fav_countries[i]);

         }
       }
       catch(error){
         console.log(error)
       }
     }
     
    
   }  
    
  return (
    <ScrollView>
    <View style={styles.container}>
     
      <FlatList
        data={fav_countries}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.diplaycountry} >
         <Text onPress={()=>{stats_screen(item)}} style={styles.text7}>{item}{item.check}></Text>
       <Ionicons name="star" size={30} color="#2b8265"  onPress={()=>{removeItem(item)}}
       />
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  
  diplaycountry: {
    flexDirection:'row',
     fontSize: 20,
     paddingHorizontal:10,
     paddingVertical:10,
    fontFamily: 'serif',
 
  },
  text7:{
    fontSize: 25,
    color: 'black',
    fontFamily: 'serif',
  
  },
  
});
