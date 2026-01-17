export const SBU_DATA = [
  // --- AUDITORIUM SECTION ---
  {
    id: 'aud_stage',
    title: 'Auditorium Stage',
    block: 'Auditorium',
    floor: 'Ground',
    image: require('./assets/auditorium_map.png'),
    maxSteps: 42,
    distanceInMeters: 32.0,
    angle: 171,
    targetCoord: { x: 0, y: 3.2 },
    voiceGuidance: "Origin Locked. Walk 32 meters straight to reach the stage."
  },
  {
    id: 'aud_washroom_boys',
    title: 'Boys Washroom (Left)',
    block: 'Auditorium',
    floor: 'Ground',
    image: require('./assets/auditorium_map.png'),
    maxSteps: 39,
    distanceInMeters: 29.7,
    angle: 81,
    targetCoord: { x: -1.2, y: 2.5 },
    voiceGuidance: "Go to Side Gate 2, then turn left 6 steps for Boys Washroom."
  },
  {
    id: 'aud_washroom_girls',
    title: 'Girls Washroom (Right)',
    block: 'Auditorium',
    floor: 'Ground',
    image: require('./assets/auditorium_map.png'),
    maxSteps: 39,
    distanceInMeters: 29.7,
    angle: 251,
    targetCoord: { x: 1.2, y: 2.5 },
    voiceGuidance: "Go to Side Gate 2, then turn right 6 steps for Girls Washroom."
  },
  {
    id: 'aud_green_left',
    title: 'Left Green Room',
    block: 'Auditorium',
    floor: 'Ground',
    image: require('./assets/auditorium_map.png'),
    maxSteps: 16,
    distanceInMeters: 12.2,
    angle: 81,
    targetCoord: { x: -0.9, y: 0.3 },
    voiceGuidance: "Walk 4 steps forward then turn left 12 steps for the Green Room."
  },
  {
    id: 'aud_emergency_exit',
    title: 'Emergency Exit',
    block: 'Auditorium',
    floor: 'Ground',
    image: require('./assets/auditorium_map.png'),
    maxSteps: 20,
    distanceInMeters: 15.2,
    angle: 251,
    targetCoord: { x: 1.2, y: 1.5 },
    voiceGuidance: "Emergency exit located on the right wall, 15 meters ahead."
  },

  // --- PHARMACY BLOCK ---
  {
    id: 'pharm_g',
    title: 'Pharmacy Ground',
    block: 'Pharmacy',
    floor: 'Ground',
    image: require('./assets/pharmacy_g.png'),
    maxSteps: 26,
    distanceInMeters: 20,
    angle: 0,
    targetCoord: { x: 0, y: 2.0 },
    voiceGuidance: "Pharmacy Ground floor loaded. Proceed 20 meters ahead."
  },
  {
    id: 'pharm_1',
    title: 'Pharmacy Floor 1',
    block: 'Pharmacy',
    floor: '1st Floor',
    image: require('./assets/pharmacy_1.png'),
    maxSteps: 33,
    distanceInMeters: 25,
    angle: 90,
    targetCoord: { x: 2.5, y: 0 },
    voiceGuidance: "First floor active. Target is 25 meters after the stairs."
  },
  {
    id: 'pharm_2',
    title: 'Pharmacy Floor 2',
    block: 'Pharmacy',
    floor: '2nd Floor',
    image: require('./assets/pharmacy_2.png'),
    maxSteps: 40,
    distanceInMeters: 30,
    angle: 180,
    targetCoord: { x: 0, y: -3.0 },
    voiceGuidance: "Second floor labs are 30 meters from this anchor."
  }
];


// ================= PERSONNEL DATABASE =================

export const PERSONNEL_DB = [
  // --- ADMIN BLOCK ---
  { name: "Smt. Jayashree Mohta", role: "Chairperson", block: "Admin Block", floor: "Ground", room: "Chairperson's Office" },
  { name: "CA B K Dalan", role: "Pro-Chancellor", block: "Admin Block", floor: "Ground", room: "Pro-Chancellor Office" },
  { name: "Prof. (Dr.) Gopal Pathak", role: "Director General", block: "Admin Block", floor: "1st Floor", room: "DG Office" },
  { name: "Prof. (Dr.) Jeganathan Chockalingam", role: "Vice Chancellor", block: "Admin Block", floor: "1st Floor", room: "VC Office" },
  { name: "Prof. S. B. Dandin", role: "Registrar", block: "Admin Block", floor: "Ground", room: "Registrar Office" },
  { name: "Mr. Praveen Kumar", role: "Personnel Admin Officer", block: "Admin Block", floor: "Ground", room: "Admin Section" },
  { name: "Mr. Satish Kumar", role: "Chief Finance & Accounts Officer", block: "Admin Block", floor: "Ground", room: "Finance Office" },
  { name: "Mr. Rahul Vats", role: "Controller of Examinations", block: "Admin Block", floor: "1st Floor", room: "COE Office" },
  { name: "Mr. Anubhav Ankit", role: "OSD to Vice Chancellor", block: "Admin Block", floor: "1st Floor", room: "VC Secretariat" },

  // --- ACADEMIC BLOCK 1 ---
  { name: "Dr. Pankaj Kr. Goswami", role: "Dean - Eng/Comp.Sci.", block: "Academic Block 1", floor: "1st Floor", room: "Dean CS Office" },
  { name: "Prof. (Dr.) Neelima Pathak", role: "Dean - Humanities", block: "Academic Block 1", floor: "2nd Floor", room: "Humanities Dept" },
  { name: "Dr. Sandeep Kumar", role: "Dean - Commerce", block: "Academic Block 1", floor: "1st Floor", room: "Commerce Faculty Room" },
  { name: "Mr. Ajay Kumar", role: "Dean - Journalism", block: "Academic Block 1", floor: "3rd Floor", room: "Media Studio" },
  { name: "Dr. Ashok Kr. Asthana", role: "Deputy Registrar", block: "Academic Block 1", floor: "Ground", room: "Academic Section" },
  { name: "Mr. Hari Babu Shukla", role: "Dean - Training & Placement", block: "Academic Block 1", floor: "Ground", room: "T&P Cell" },
  { name: "Dr. Pramod Kumar Hota", role: "Assistant Librarian", block: "Academic Block 1", floor: "Ground", room: "Central Library" }
];
