# RaahVia Backend - Quick Reference

## Installation (30 seconds)

```bash
cd backend
npm install
npm start
```

Server runs on: `http://localhost:5000`

---

## API Endpoints

### 1. Scan QR Code
```bash
GET /api/qr/aud_entrance
```
**Returns**: Building info + start node (0,0)

### 2. List Destinations
```bash
GET /api/destinations/auditorium
```
**Returns**: Available destinations with distance/time

### 3. Get Navigation Path
```bash
GET /api/path/aud_stage
```
**Returns**: Complete path for offline navigation

### 4. Health Check
```bash
GET /health
```
**Returns**: Server status

---

## Frontend Integration

Edit `frontend/services/api.js`:
```javascript
BASE_URL: 'http://192.168.1.100:5000/api' // ← Your PC IP:5000
```

Find your IP:
- **Windows**: `ipconfig`
- **Mac**: `ifconfig`
- **Linux**: `ip addr`

---

## Static Data Config

Edit `backend/config/navigationData.js`:

```javascript
// Add QR codes
const QR_CODES = {
  qr_code_id: {
    building_id: 'auditorium',
    location_name: 'Location Name',
    start_node: { x: 150, y: 280 }
  }
};

// Add destinations
const DESTINATIONS = {
  destination_id: {
    destination_name: 'Venue Name',
    total_steps: 42,
    distance_meters: 32.0,
    path_coordinates: [ /* waypoints */ ]
  }
};
```

---

## Response Format

### Success
```json
{
  "success": true,
  "status_code": 200,
  "data": { /* response */ },
  "timestamp": "2026-01-17T10:30:00.000Z"
}
```

### Error
```json
{
  "success": false,
  "status_code": 404,
  "error": "QR code not found",
  "timestamp": "2026-01-17T10:30:00.000Z"
}
```

---

## File Structure

```
backend/
├── server.js                 ← Start here
├── package.json             ← Dependencies
├── config/
│   └── navigationData.js    ← Edit data here
├── routes/
│   └── qr-api.js
├── controllers/
│   ├── qrController.js
│   ├── destinationController.js
│   └── pathController.js
└── utils/
    └── errorHandler.js
```

---

## Common Tasks

### Add QR Code
1. Edit `config/navigationData.js`
2. Add to `QR_CODES` object
3. Restart: `npm start`

### Add Destination
1. Edit `config/navigationData.js`
2. Add to `DESTINATIONS` object
3. Restart: `npm start`

### Fix CORS Error
1. Edit `.env`
2. Set `CORS_ORIGIN=*` (development)
3. Restart: `npm start`

### Check Server Status
```bash
curl http://localhost:5000/health
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 5000 in use | Change PORT in .env |
| Cannot find module | Run `npm install` |
| QR not found | Check navigationData.js |
| Expo can't reach | Verify IP, same WiFi |
| CORS errors | Check .env CORS_ORIGIN |

---

## Environment Variables

```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*
LOG_LEVEL=info
```

---

## Valid QR Codes

- `aud_entrance` → Auditorium Main Entrance
- `pharm_g_entrance` → Pharmacy Ground Floor
- `pharm_1_stairs` → Pharmacy 1st Floor
- `pharm_2_elevator` → Pharmacy 2nd Floor

---

## Valid Destinations

- `aud_stage` → Auditorium Stage (42 steps, 32m)

---

## Scripts

```bash
npm start       # Production
npm run dev     # Development (auto-reload)
npm test        # Tests
```

---

## Tech Stack

- **Node.js** 18+
- **Express** 4.18
- **CORS** 2.8
- **Helmet** 7.1

---

## Important Notes

✅ **Zero Databases** - Static data only  
✅ **No Real-Time** - Predefined paths  
✅ **No Sensors** - Frontend only  
✅ **No GPS** - Indoor only  
✅ **Offline Ready** - App works 100% offline  

---

## Performance Targets

- Response time: <50ms
- Memory: 30-80MB
- Concurrent: 1000+ users

---

## Next Steps

1. ✅ `npm install`
2. ✅ `npm start`
3. ✅ Update frontend IP
4. ✅ Test QR endpoint
5. ✅ Test full flow
6. ✅ Deploy!

---

## Full Documentation

- `API_DOCUMENTATION.md` - Complete API reference
- `SETUP_GUIDE.md` - Detailed setup instructions
- `README.md` - Project overview

---

**Version**: 1.1.0  
**Status**: Production Ready ✅  
**Last Updated**: January 17, 2026
