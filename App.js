import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your desired icon set
import HomeScreen from './components/HomeScreen';
import { CartProvider } from './components/context/CartContext';
import Cart from './components/Cart';


function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Settings screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          }} 
        />
          <Tab.Screen 
          name="Cart" 
          component={Cart} // Add the Cart component here
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="cart-outline" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings-outline" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
