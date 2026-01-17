# RaahVia Backend API Documentation

## Overview

The RaahVia Backend is a **static data only** Express.js server that provides navigation metadata for the Expo mobile app. It is called ONLY after QR scanning and BEFORE offline navigation begins.

### Key Characteristics
- ✅ **Zero Databases**: All data is static config files
- ✅ **No Real-Time Tracking**: Predefined paths only
- ✅ **No Sensors**: All sensor processing in app
- ✅ **No Authentication**: Public endpoints
- ✅ **No GPS**: Indoor navigation only
- ✅ **Production Ready**: Latest stable Node.js + Express

---

## Installation & Setup

### Prerequisites
```bash
Node.js 18.0.0 or higher
npm 9.0.0 or higher
```

### Install Dependencies

```bash
cd backend
npm install
```

This installs:
- `express@4.18.2` - Web framework
- `cors@2.8.5` - CORS middleware
- `helmet@7.1.0` - Security headers
- `morgan@1.10.0` - HTTP request logging
- `dotenv@16.3.1` - Environment variables
- `nodemon@3.0.2` - Development auto-reload

### Environment Setup

```bash
# Copy example file
cp .env.example .env

# Edit .env with your settings (optional for development)
# Default PORT=5000 is usually fine
```

### Start Server

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

**Output**:
```
============================================================
🚀 RaahVia Backend Server Running
============================================================

📍 Environment: development
📡 Server: http://localhost:5000
💚 Health Check: http://localhost:5000/health

📱 Expo Mobile Client:
   1. Find your PC IP: ipconfig (Windows) | ifconfig (Mac/Linux)
   2. Update api.js: http://YOUR_IP:5000/api
   3. QR endpoint: http://YOUR_IP:5000/api/qr/aud_entrance

🔗 Available Endpoints:
   GET  /api/qr/:qrCode              - Scan QR code
   GET  /api/destinations/:building  - Get destinations
   GET  /api/path/:destinationId     - Get navigation path
   GET  /health                      - Health check

============================================================
```

---

## API Endpoints

### 1. QR Code Scanning
**GET /api/qr/:qrCode**

Scans QR code and returns building info + start node.

#### Request
```bash
curl http://localhost:5000/api/qr/aud_entrance
```

#### Response (200 OK)
```json
{
  "success": true,
  "status_code": 200,
  "timestamp": "2026-01-17T10:30:00.000Z",
  "message": "Successfully scanned QR at Auditorium Main Entrance",
  "data": {
    "qr_code": "aud_entrance",
    "location_name": "Auditorium Main Entrance",
    "building": {
      "id": "auditorium",
      "name": "GD Birla Auditorium",
      "floor": "Ground",
      "building_code": "AUD_G",
      "description": "Main auditorium venue on ground floor",
      "map_image": "auditorium_map.png",
      "map_dimensions": {
        "width": 300,
        "height": 300
      },
      "features": ["Main entrance", "Parking area", "Accessibility ramp"]
    },
    "start_node": {
      "x": 150,
      "y": 280,
      "label": "Main Gate"
    },
    "accessibility": {
      "wheelchair_accessible": true,
      "has_ramp": true,
      "has_elevator": false
    }
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "status_code": 404,
  "timestamp": "2026-01-17T10:30:00.000Z",
  "message": "QR code not recognized",
  "error": "QR code \"invalid_qr\" is not registered in RaahVia system"
}
```

#### Valid QR Codes
- `aud_entrance` - Auditorium Main Entrance
- `pharm_g_entrance` - Pharmacy Ground Floor
- `pharm_1_stairs` - Pharmacy 1st Floor
- `pharm_2_elevator` - Pharmacy 2nd Floor

---

### 2. List Destinations
**GET /api/destinations/:building**

Get all navigation destinations available in a building.

#### Request
```bash
curl http://localhost:5000/api/destinations/auditorium
```

#### Response (200 OK)
```json
{
  "success": true,
  "status_code": 200,
  "timestamp": "2026-01-17T10:30:00.000Z",
  "message": "Found 1 destination(s)",
  "data": {
    "building_id": "auditorium",
    "destination_count": 1,
    "destinations": [
      {
        "id": "aud_stage",
        "destination_name": "Auditorium Stage",
        "floor": "Ground",
        "description": "Main stage for performances",
        "category": "venue",
        "distance_meters": 32.0,
        "estimated_time_seconds": 45
      }
    ]
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "success": false,
  "status_code": 404,
  "message": "No destinations found"
}
```

#### Valid Building IDs
- `auditorium` - GD Birla Auditorium
- `pharmacy` - Pharmacy Block (future expansion)

---

### 3. Get Navigation Path
**GET /api/path/:destinationId**

Returns **COMPLETE** navigation data for offline operation.
This is the LAST backend call before app goes 100% offline.

#### Request
```bash
curl http://localhost:5000/api/path/aud_stage
```

#### Response (200 OK)
```json
{
  "success": true,
  "status_code": 200,
  "timestamp": "2026-01-17T10:30:00.000Z",
  "message": "Navigation path loaded. App will now run 100% offline.",
  "data": {
    "destination": {
      "id": "aud_stage",
      "destination_name": "Auditorium Stage",
      "floor": "Ground",
      "description": "Main stage for performances",
      "end_node": {
        "x": 150,
        "y": 40,
        "label": "Stage"
      }
    },
    "navigation": {
      "total_steps": 42,
      "distance_meters": 32.0,
      "step_length_meters": 0.75,
      "estimated_time_seconds": 45,
      "path_angle": 171,
      "max_heading_deviation": 25,
      "path_coordinates": [
        {"x": 150, "y": 280, "step": 0, "label": "Start"},
        {"x": 150, "y": 270, "step": 1},
        {"x": 150, "y": 260, "step": 2},
        ...
        {"x": 150, "y": 40, "step": 42, "label": "End - Stage"}
      ],
      "svg_path_string": "M150,280 L150,270 L150,260...",
      "clamp_bounds": {
        "min_x": 145,
        "max_x": 155,
        "min_y": 40,
        "max_y": 280
      },
      "path_drift_threshold": 5
    },
    "sensor_config": {
      "pedometer": {
        "is_primary": true,
        "step_length": 0.75,
        "update_interval": 100
      },
      "accelerometer": {
        "step_threshold": 0.5,
        "noise_filter": 0.1,
        "sampling_rate": 100
      },
      "gyroscope": {
        "smoothing": 0.8,
        "drift_compensation": true,
        "update_interval": 50
      },
      "magnetometer": {
        "use_for_heading": true,
        "smoothing": 0.9,
        "fusion_with_gyro": true,
        "update_interval": 100
      }
    },
    "voice_alerts": {
      "start": "Navigation to Auditorium Stage started. Walk 32 meters straight ahead.",
      "halfway": "You are halfway to the stage. Continue straight. 21 steps remaining.",
      "wrong_direction": "You are going in the wrong direction. Please move forward to reach the stage.",
      "almost_there": "Almost there. 10 steps remaining.",
      "arrival": "You have arrived at the Auditorium Stage. Navigation complete."
    },
    "accessibility": {
      "wheelchair_accessible": true,
      "has_ramp": true,
      "has_elevators": false,
      "has_handrails": true,
      "has_emergency_exit": true
    }
  }
}
```

---

### 4. Health Check
**GET /health**

Simple health check endpoint.

#### Request
```bash
curl http://localhost:5000/health
```

#### Response (200 OK)
```json
{
  "success": true,
  "status": "ONLINE",
  "service": "RaahVia Backend API",
  "version": "1.1.0",
  "environment": "development",
  "uptime": 123.456,
  "memory": {
    "rss": "45MB",
    "heapUsed": "32MB"
  },
  "timestamp": "2026-01-17T10:30:00.000Z"
}
```

---

## Expo Frontend Integration

### Update api.js

Edit `services/api.js` in frontend with your backend IP:

```javascript
const BACKEND_CONFIG = {
  BASE_URL: 'http://192.168.x.x:5000/api', // ← Your PC IP:5000
  TIMEOUT: 10000,
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000
};
```

### API Call Flow

```
1. User scans QR at location
   ↓
2. QRScanner.js calls: scanQrCode("aud_entrance")
   ↓
3. Frontend: GET /api/qr/aud_entrance
   Backend: Returns building + start node (0,0)
   ↓
4. User selects destination from popup
   ↓
5. App calls destinations API: GET /api/destinations/auditorium
   Backend: Returns list of destinations
   ↓
6. User selects "Auditorium Stage"
   ↓
7. App calls path API: GET /api/path/aud_stage
   Backend: Returns COMPLETE navigation data
   ↓
8. MapScreen received all data → Goes 100% OFFLINE
   No more backend calls during navigation
```

---

## Project Structure

```
backend/
├── server.js                    ← Main Express server
├── package.json                 ← Dependencies
├── .env.example                 ← Configuration template
├── config/
│   └── navigationData.js        ← Static navigation data (QR, destinations, paths)
├── routes/
│   └── qr-api.js               ← API route definitions
├── controllers/
│   ├── qrController.js         ← QR code logic
│   ├── destinationController.js ← Destination listing
│   └── pathController.js        ← Navigation path logic
└── utils/
    └── errorHandler.js         ← Error handling utilities
```

---

## Static Data Configuration

### Adding a New QR Code

Edit `backend/config/navigationData.js`:

```javascript
const QR_CODES = {
  // Existing...
  
  // Add new QR
  new_location_qr: {
    building_id: 'auditorium',
    location_name: 'New Location',
    start_node: { x: 100, y: 150, label: 'New Entrance' },
    accessibility: { ... }
  }
};
```

### Adding a New Destination

Edit `backend/config/navigationData.js`:

```javascript
const DESTINATIONS = {
  // Existing...
  
  // Add new destination
  new_destination: {
    id: 'new_destination',
    building_id: 'auditorium',
    destination_name: 'New Venue',
    floor: 'Ground',
    description: 'Description here',
    end_node: { x: 200, y: 100, label: 'New End' },
    navigation: {
      total_steps: 50,
      distance_meters: 40.0,
      step_length_meters: 0.75,
      path_angle: 90,
      path_coordinates: [ ... ],
      // ... all other required fields
    }
  }
};
```

---

## Deployment

### Local Testing
```bash
npm start
# Server runs on http://localhost:5000
```

### Docker (Future)
```bash
docker build -t raahvia-backend .
docker run -p 5000:5000 raahvia-backend
```

### Cloud Deployment

#### Heroku
```bash
heroku login
heroku create raahvia-backend
git push heroku main
```

#### AWS/GCP/Azure
```bash
# Build and push Docker image to cloud registry
# Setup environment variables
# Deploy
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Module not found` | Run `npm install` in backend folder |
| `EADDRINUSE: address already in use` | Change PORT in .env or kill process on port 5000 |
| `CORS errors from mobile app` | Verify CORS_ORIGIN in .env, check frontend IP |
| `QR code not found` | Verify QR code exists in navigationData.js |
| `Cannot find module './config/navigationData'` | Ensure config folder and file exist |
| App works offline but shows backend error | This is expected - app has offline fallback |

---

## Version History

### v1.1.0 (Current)
- ✅ RESTful API design
- ✅ Comprehensive error handling
- ✅ Production-ready code
- ✅ Latest stable dependencies
- ✅ Morgan logging
- ✅ Helmet security headers

### v1.0.0 (Legacy)
- ✅ Basic POST /api/qr-scan endpoint
- ✅ Static Auditorium data

---

## Future Enhancements

- [ ] Multi-floor navigation with elevator detection
- [ ] Floor plan SVG generation endpoint
- [ ] Visitor count tracking (anonymous)
- [ ] Accessibility routing options
- [ ] Real-time path updates
- [ ] Analytics dashboard
- [ ] Admin panel for editing paths
- [ ] Database integration (PostgreSQL)

---

## License

MIT License - Feel free to use and modify

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review console logs for error messages
3. Verify backend is running: `curl http://localhost:5000/health`
4. Verify Expo app can reach backend (correct IP in api.js)
5. Check CORS settings in server.js

---

**Last Updated**: January 17, 2026  
**Version**: 1.1.0  
**Status**: Production Ready ✅
