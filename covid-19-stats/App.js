// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import World_Covid_Stats from './components/WorldStats';
import Country_Covid_Stats from './components/CountryStats';
import Favourite_Country_Covid_Stats from './components/FavCountry'
import Stats_Screen from './components/StatsBYCountry'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


// Import Custom Sidebar
import CustomSidebarMenu from './assets/CustomeSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Covid Worldometer">
      <Stack.Screen
        name="Covid Worldometer"
        component={World_Covid_Stats}
        options={{
          title: 'Covid Worldometer', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#2b8265', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="View by Country"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#2b8265', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="View by Country"
        component={Country_Covid_Stats}
        options={{
          title: 'View by Country', //Set Header Title
        }}
      />
      <Stack.Screen
        name="View by favourite Country"
        component={Favourite_Country_Covid_Stats}
        options={{
          title: 'View by favourite Country', //Set Header Title
        }}
      />
      
          <Stack.Screen name="Stats by country" component={Stats_Screen} options={{
        headerShown: false,
    }} />
    </Stack.Navigator>
  );
}

function thirdScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="View by Country"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#2b8265', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Favourite Countries"
        component={Favourite_Country_Covid_Stats}
        options={{
          title: ' Favourite Countries', //Set Header Title
        }}
      />
           <Stack.Screen name="Stats by country" component={Stats_Screen} options={{
        headerShown: false,
    }} />
        
      
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#2b8265', backgroundColor: "white",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="World Wide Covid Stats"
          options={{ drawerLabel: 'World Wide Covid Stats' }}
          component={firstScreenStack}
        />
        <Drawer.Screen
          name="Country Wise Covid Stats"
          options={{ drawerLabel: 'Country Wise Covid Stats' }}
          component={secondScreenStack}
        />
        <Drawer.Screen
          name="Favourite Countries "
          options={{ drawerLabel: 'Favourite Countries' }}
          component={thirdScreenStack}
        />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}

export default App;
