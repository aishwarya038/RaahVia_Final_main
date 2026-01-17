import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

// Screen Imports
import Dashboard from './screens/Dashboard';
import { AiAssistant } from './screens/AiAssistant';
import FloorSelection from './screens/FloorSelection';
import MapScreen from './screens/MapScreen';
import QRScanner from './screens/QRScanner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [navigationParams, setNavigationParams] = useState(null);

  // Centralized Navigation Logic
  const navigateTo = (screen, params = null) => {
    setNavigationParams(params);
    setCurrentScreen(screen);
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Home': 
        return <Dashboard onNavigate={navigateTo} />;
      
      case 'ai': 
        return (
          <AiAssistant 
            onShowMap={(data) => navigateTo('MapScreen', data)} 
            onClose={() => setCurrentScreen('Home')} 
          />
        );

      case 'QRScanner': 
        return (
          <QRScanner 
            onScanSuccess={(scannedData) => {
              if (navigationParams?.targetData) {
                navigateTo('MapScreen', navigationParams.targetData);
              } else {
                navigateTo('FloorSelection', { targetZone: scannedData }); 
              }
            }} 
          />
        );

      case 'FloorSelection': 
        return (
          <FloorSelection 
            route={{ params: navigationParams }} 
            onSelect={(data) => navigateTo('MapScreen', data)} 
          />
        );

      case 'MapScreen': 
        return <MapScreen data={navigationParams} />;
        
      default: 
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    /* Wrap EVERYTHING in NavigationContainer to fix the Android/iOS Error */
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.screenContainer}>
          {renderActiveScreen()}
        </View>

        {/* GLOBAL PERSISTENT NAVIGATION BAR */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Home')}>
            <Ionicons name="home" size={24} color={currentScreen === 'Home' ? '#000000' : '#999'} />
            <Text style={[styles.navText, currentScreen === 'Home' && styles.activeText]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => {
            setNavigationParams(null); 
            setCurrentScreen('QRScanner');
          }}>
            <View style={styles.scanButton}>
              <MaterialCommunityIcons name="qrcode-scan" size={26} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('ai')}>
            <Ionicons name="sparkles" size={24} color={currentScreen === 'ai' ? '#000000' : '#999'} />
            <Text style={[styles.navText, currentScreen === 'ai' && styles.activeText]}>AI Bot</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  screenContainer: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, color: '#000000', marginTop: 4 },
  activeText: { color: '#000000' },
  scanButton: {
    backgroundColor: '#000000',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5
  }
});