// ====================================================
// QR BACKEND SERVICE (Frontend - Update YOUR_IP)
// ====================================================

import { Platform } from 'react-native';

// IMPORTANT: Change 192.168.1.100 to YOUR computer's IP address
const BACKEND_CONFIG = {
  BASE_URL: 'http://192.168.249.147:5000/api', // ← CHANGE THIS!
  
  // Timeout settings
  TIMEOUT: 10000, // 10 seconds
  
  // Retry settings
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000
};

// Scan QR Code - Calls backend ONCE for metadata
export const scanQrCode = async (qrData) => {
  console.log(`📱 QR Scan: "${qrData}"`);
  console.log(`📡 Connecting to backend for auditorium_map.png metadata...`);
  
  try {
    // Call backend API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_CONFIG.TIMEOUT);
    
    const response = await fetch(`${BACKEND_CONFIG.BASE_URL}/qr-scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        qrData: qrData,
        deviceId: 'raahvia-mobile',
        platform: Platform.OS,
        appVersion: '1.0.0',
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Validate response has required data
    if (!result.success || !result.navigation || !result.navigation.mapImage) {
      throw new Error('Invalid response from backend');
    }
    
    console.log('✅ Backend metadata received successfully!');
    console.log(`   Map Image: ${result.navigation.mapImage}`);
    console.log(`   Total Steps: ${result.navigation.stageDestination?.totalSteps || 42}`);
    
    return result;
    
  } catch (error) {
    console.warn(`⚠️ Backend unavailable: ${error.message}`);
    console.log('🔄 Using offline fallback metadata for auditorium_map.png');
    
    // Return fallback data - App will work 100% offline
    return getOfflineFallbackData(qrData);
  }
};

// Offline fallback data (when backend is not reachable)
const getOfflineFallbackData = (qrData) => {
  return {
    success: true,
    scannedData: {
      qrCode: qrData,
      scannedLocation: "auditorium_main_gate",
      area: "Auditorium",
      targetZone: "auditorium",
      isValid: true,
      name: "GD Birla Auditorium Main Entrance",
      timestamp: new Date().toISOString(),
      mapImage: "auditorium_map.png" // Critical: Must match assets filename
    },
    navigation: {
      building: "Auditorium",
      mapImage: "auditorium_map.png", // Critical: Must match assets filename
      startNode: { x: 0, y: 0 },
      stageDestination: {
        id: "aud_stage",
        title: "Auditorium Stage",
        totalSteps: 42,
        distanceMeters: 32.0,
        pathAngle: 171,
        svgPath: {
          imageDimensions: { width: 300, height: 300 },
          points: Array.from({length: 13}, (_, i) => ({
            x: 150,
            y: 280 - (i * 20)
          })),
          pathString: "M150,280 L150,40",
          clampBounds: { minX: 145, maxX: 155, minY: 40, maxY: 280 },
          stepCalibration: 0.7619,
          pixelsPerMeter: 7.5,
          stepProgress: 5.714,
          allowedDeviation: 25
        }
      }
    },
    metadata: {
      backendUsed: false,
      source: "offline_fallback",
      note: "Navigation will use device sensors (pedometer, gyroscope, magnetometer)"
    }
  };
};

// Optional: Check backend status
export const checkBackendStatus = async () => {
  try {
    const response = await fetch(`${BACKEND_CONFIG.BASE_URL.replace('/api', '')}/health`);
    const data = await response.json();
    return { online: true, ...data };
  } catch (error) {
    return { 
      online: false, 
      message: "Backend offline - App will use fallback data",
      note: "Navigation will still work 100% offline after QR scan"
    };
  }
};

export default { scanQrCode, checkBackendStatus };
