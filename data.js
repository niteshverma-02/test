/* Sanjh prototype — icons, helpers and sample data. Loaded before app.js (shares global scope). */
'use strict';

/* ---------------- icons ---------------- */
const HP = 'M12 20.5S3 15 3 9a4.5 4.5 0 0 1 9-1.2A4.5 4.5 0 0 1 21 9c0 6-9 11.5-9 11.5z';
const P = {
  heart:`<path d="${HP}"/>`,
  star:'<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
  x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  explore:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  chat:'<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.2A2.5 2.5 0 0 1 4 14.5z"/>',
  trips:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M9 7V4.5h6V7M4 12.5h16"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.8 3.6-5.5 6.5-5.5s5.7 1.7 6.5 5.5M16 4.8a3.3 3.3 0 0 1 0 6.4M18 14.8c2 .6 3.2 2.3 3.6 5.2"/>',
  pin:'<path d="M12 21s-6.5-5.8-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.4"/>',
  cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8.5 3v4M15.5 3v4"/>',
  bell:'<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  right:'<path d="M9 5l7 7-7 7"/>',
  share:'<path d="M12 3.5v11M7.5 8L12 3.5 16.5 8M5 13.5v5A2 2 0 0 0 7 20.5h10a2 2 0 0 0 2-2v-5"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  plane:'<path d="M3 11.5L21 4l-7.5 17-2.6-6.9zM10.9 14.1L21 4"/>',
  sliders:'<path d="M4 7h9M19 7h1M4 17h3M11 17h9"/><circle cx="16" cy="7" r="2.5"/><circle cx="9" cy="17" r="2.5"/>',
  pool:'<path d="M3 17.5c1.5 0 2.2-1.2 4.5-1.2s3 1.2 4.5 1.2 2.2-1.2 4.5-1.2 3 1.2 4.5 1.2M3 21c1.5 0 2.2-1.2 4.5-1.2S10.5 21 12 21s2.2-1.2 4.5-1.2S19.5 21 21 21M8 14V6a2 2 0 0 1 2-2M15 14V6a2 2 0 0 1 2-2M8 8.5h7M8 12h7"/>',
  sun:'<path d="M3 18h18M7 21h10M7 15a5 5 0 0 1 10 0M12 4v2.5M5 8l1.7 1.7M19 8l-1.7 1.7"/>',
  cup:'<path d="M4.5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M15.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.8M8 3.5V6M12 3.5V6"/>',
  leaf:'<path d="M5 19.5C5 11 10.5 5 20 4.5c0 9.5-6 15-14.5 15z"/><path d="M5 19.5l7.5-7.5"/>',
  bed:'<path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="1.6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
  map:'<path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5zM9 4v13.5M15 6.5V20"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7v.5M12 17h.01"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  video:'<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5l5-3v9l-5-3"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  camera:'<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
  send:'<path d="M4 12L20 4l-6 16-2.5-6.5zM11.5 13.5L20 4"/>',
  more:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  block:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  rewind:'<path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z"/>',
  eyeoff:'<path d="M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 8.5 4 9.5 6-.4.8-1.2 2-2.4 3.2M6.6 7.6C4.6 8.9 3.2 10.7 2.5 12c1 2 4.5 6 9.5 6 1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  logout:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4M6 12h10"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wifi:'<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
  car:'<path d="M5 16v-5l2-5h10l2 5v5M3.5 11h17v5h-17z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/>',
  snow:'<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/>',
  gym:'<path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
  download:'<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
  dir:'<path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z"/><path d="M9 14.5V11h5.5M12.5 8.5L15 11l-2.5 2.5"/>',
  alert:'<path d="M12 3l9.5 17h-19zM12 10v4.5M12 17.5h.01"/>',
  crown:'<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
  sort:'<path d="M7 4v16M3.5 16.5L7 20l3.5-3.5M17 20V4M13.5 7.5L17 4l3.5 3.5"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
  card:'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h3"/>',
  bank:'<path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
  tag:'<path d="M3 12V4h8l10 10-8 8z"/><path d="M7.5 7.5h.01"/>',
  coins:'<ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
  invite:'<circle cx="9" cy="8" r="4"/><path d="M2 21c1-4.5 4-6.5 7-6.5s6 2 7 6.5M19 8v6M16 11h6"/>',
  pause:'<path d="M9 5v14M15 5v14"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  mount:'<path d="M3 20l6.5-11 4 6.5 2.5-4L21 20z"/><path d="M7.5 12.5l2 1.5 1.5-1"/>',
  home:'<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  grad:'<path d="M2.5 9L12 4.5 21.5 9 12 13.5zM6.5 11v5c3 2.5 8 2.5 11 0v-5"/>',
  ruler:'<path d="M4 16L16 4l4 4L8 20zM8 12l2 2M11 9l2 2M14 6l2 2"/>',
  lang:'<path d="M4 5h9M8.5 3v2M6 5c.5 3 3 6 6 7.5M11 5c-.5 3.5-3 7-7 9M13 21l4-10 4 10M14.5 17.5h5"/>',
  moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  sunny:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  auto:'<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17A8.5 8.5 0 0 0 12 3.5z" fill="currentColor"/>',
  wine:'<path d="M8 3h8l-.5 6a3.5 3.5 0 0 1-7 0zM12 12.5V20M8.5 20.5h7"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V4.5h6V7M3 12.5h18"/>',
};
const ic = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;
const STATUS_SVG = '<svg viewBox="0 0 54 12" aria-hidden="true"><g fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="1"/><rect x="9" y="3" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/><path d="M27 3.2a9 9 0 0 1 6.4 2.6l-1.3 1.3A7.2 7.2 0 0 0 27 5a7.2 7.2 0 0 0-5.1 2.1l-1.3-1.3A9 9 0 0 1 27 3.2zm0 3.6a5.4 5.4 0 0 1 3.8 1.6L27 12.2l-3.8-3.8A5.4 5.4 0 0 1 27 6.8z"/><rect x="37.5" y="1" width="14" height="10" rx="3" fill="none" stroke="currentColor" stroke-opacity=".45"/><rect x="39.5" y="3" width="10" height="6" rx="1.5"/><rect x="52.3" y="4" width="1.5" height="4" rx=".7" opacity=".45"/></g></svg>';

/* ---------------- helpers ---------------- */
const im = n => `img/${n}.jpg`;
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const on = b => (b ? ' on' : '');
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Day index 0 = Tue 1 Dec 2026; 31 = Fri 1 Jan 2027. "Today" in the demo is Thu 26 Nov 2026 (index -5).
const dparts = i => ({ dow: DOW[((2 + i) % 7 + 7) % 7], d: i < 31 ? i + 1 : i - 30, m: i < 31 ? 'Dec' : 'Jan' });
const dlabel = i => { const p = dparts(i); return `${p.dow}, ${p.d} ${p.m}`; };
const dshort = i => { const p = dparts(i); return `${p.d} ${p.m}`; };

/* ---------------- hotels ---------------- */
const HOT = {};
[
  ['saagar', 'Saagar Cove Resort', 'Vagator, North Goa', 'Goa', ['goa-pool', 'dusk-palms', 'pool-deck', 'sea-deck', 'room-deluxe', 'dinner'], 4.8, 312, 6400, 8200, '400 m from beach', 2, 'Resort', ['Couple-friendly', 'Free cancellation', 'Breakfast incl.'], 34, 26],
  ['drift', 'Driftwood Cottages', 'Morjim, North Goa', 'Goa', ['beach-cottage', 'pool-deck', 'room-classic'], 4.6, 241, 4800, 5400, 'Beachfront', 0, 'Cottage', ['Couple-friendly', 'Pay at hotel'], 26, 14],
  ['azure', 'Azure Bay Villas', 'Candolim, Goa', 'Goa', ['resort-night', 'room-suite', 'sea-deck'], 4.9, 87, 11200, 13800, 'Private pool villa', 1, 'Villa', ['Private pool', 'Free cancellation'], 46, 64],
  ['palm', 'Palm Grove Boutique', 'Calangute, Goa', 'Goa', ['dusk-palms', 'room-premium', 'dinner'], 4.5, 509, 3600, 4300, '650 m from beach', 0, 'Boutique', ['Couple-friendly', 'Breakfast incl.'], 40, 50],
  ['casa', 'Casa Azul Anjuna', 'Anjuna, Goa', 'Goa', ['pool-deck', 'room-classic', 'sea-deck'], 4.4, 188, 2900, 3500, '1.1 km from beach', 3, 'Homestay', ['Pay at hotel', 'Pet-friendly'], 64, 36],
  ['misty', 'Misty Palms Retreat', 'Vythiri, Wayanad', 'Wayanad', ['wayanad', 'hill-deck', 'room-classic'], 4.7, 198, 5200, 6100, 'Rainforest view', 0, 'Resort', ['Couple-friendly', 'Breakfast incl.'], 50, 40],
  ['cloud', 'Cloudline Hill Stay', 'Old Manali', 'Manali', ['mountains', 'hill-deck', 'room-premium'], 4.5, 156, 3900, 4600, 'Valley view', 0, 'Boutique', ['Free cancellation'], 50, 40],
  ['haveli', 'Rang Mahal Haveli', 'Old City, Jaipur', 'Jaipur', ['jaipur', 'rooftop', 'room-premium'], 4.7, 420, 5600, 6800, 'Near Hawa Mahal', 0, 'Heritage', ['Couple-friendly', 'Breakfast incl.'], 50, 40],
].forEach(([id, name, area, city, img, rating, reviews, price, old, dist, left, type, tags, x, y]) =>
  (HOT[id] = { id, name, area, city, img, rating, reviews, price, old, dist, left, type, tags, x, y }));

const roomsOf = h => [
  { id: 'classic', name: 'Classic Garden Room', img: 'room-classic', size: 28, bed: 'Queen bed', view: 'Garden view', price: Math.round(h.price * 0.8 / 100) * 100, left: 4 },
  { id: 'deluxe', name: 'Deluxe Sea View', img: 'room-deluxe', size: 34, bed: 'King bed', view: 'Sea-facing balcony', price: h.price, left: h.left || 3 },
  { id: 'suite', name: 'Premium Suite', img: 'room-suite', size: 52, bed: 'King bed + lounge', view: 'Private plunge pool', price: Math.round(h.price * 1.6 / 100) * 100, left: 1 },
];
const MEALS = { ro: ['Room only', 0], bf: ['With breakfast', 900], hb: ['Breakfast + dinner', 2100] };

/* ---------------- people ---------------- */
const PPL = {};
[
  ['ananya', 'Ananya', 26, 'Mumbai', 3, 'Goa · 13–15 Dec', 92, 'Product designer', 'NID Ahmedabad', "5'5\"", 'Hindi, English, Marathi', ['Beach sunsets', 'Trekking', 'Filter coffee', 'Indie music'], [['My perfect weekend', 'A sunrise trek, a long breakfast, then sunset on the beach.'], ['When I travel, I always', 'try the local food, however spicy it is.']], true, true, ['saagar', 'drift']],
  ['meera', 'Meera', 25, 'Pune', 8, 'Goa · 12–14 Dec', 88, 'Architect', 'CEPT University', "5'4\"", 'Hindi, English', ['Live music', 'Cafés', 'Scuba'], [['A green flag I love', 'Being just as polite to the waiter.'], ['My goal this year', 'Getting scuba certified in the Andamans.']], false, false, ['palm']],
  ['kavya', 'Kavya', 28, 'Bengaluru', 5, 'Goa · 12–15 Dec', 85, 'Data scientist', 'IISc Bengaluru', "5'6\"", 'Kannada, Hindi, English', ['Yoga', 'Photography', 'Seafood'], [['One thing I never skip', 'Sunrise photos. Alarm at 5:30.'], ['To impress me', 'tell me where to get the best fish thali.']], true, true, ['saagar']],
  ['riya', 'Riya', 27, 'Delhi', 12, 'Goa · 11–14 Dec', 81, 'Lawyer', 'NLU Delhi', "5'3\"", 'Hindi, English, Punjabi', ['Books', 'Kayaking', 'Wine bars'], [['My hidden talent', 'I never lose an argument. Professionally, too.'], ['Perfect date', 'Kayaking, then a good book at sunset.']], false, true, ['azure']],
  ['isha', 'Isha', 24, 'Mumbai', 6, 'Goa · 13–16 Dec', 79, 'Content creator', "St. Xavier's", "5'4\"", 'Hindi, English, Gujarati', ['Street food', 'Thrifting', 'Dance'], [["I'm the one who", 'makes a street-food vlog on every trip.'], ['Make me laugh', 'Bad puns allowed. Encouraged, even.']], true, false, ['casa']],
  ['zoya', 'Zoya', 26, 'Hyderabad', 9, 'Goa · 12–13 Dec', 76, 'Doctor', 'AIIMS Delhi', "5'5\"", 'Urdu, Hindi, English', ['Biryani', 'Badminton', 'Sunsets'], [['Weekend plan', 'A long sleep after my shift, then biryani.'], ['Dealbreaker', "Saying biryani shouldn't have potato."]], false, false, ['saagar']],
  ['nida', 'Nida', 25, 'Lucknow', 14, 'Goa · 12–14 Dec', 74, 'UX writer', 'Amity University', "5'2\"", 'Urdu, Hindi, English', ['Poetry', 'Chai', 'Museums'], [['Me in one line', 'Ghalib, chai and a little stubbornness.'], ['Travel style', 'Slow mornings, museums and home-style food.']], false, true, ['palm']],
  ['tara', 'Tara', 29, 'Chandigarh', 20, 'Goa · 13–15 Dec', 72, 'Pilot', 'IGRUA', "5'7\"", 'Punjabi, Hindi, English', ['Skiing', 'Road trips', 'Coffee'], [['My wildest travel story', 'Biked to Leh with no plan.'], ['Green flag', 'Owning the road-trip playlist.']], false, false, ['drift']],
  ['pooja', 'Pooja', 27, 'Ahmedabad', 4, 'Jaipur · 24–26 Jan', 70, 'Chartered accountant', 'ICAI', "5'3\"", 'Gujarati, Hindi, English', ['Food walks', 'Garba', 'Sketching'], [["I'll always", 'find the best food in any city.'], ['Ideal Sunday', 'A sketchbook, chai and an old haveli.']], false, true, []],
  ['neha', 'Neha', 28, 'Jaipur', 2, 'Jaipur · 24–26 Jan', 68, 'Teacher', 'Rajasthan University', "5'4\"", 'Hindi, English', ['Heritage walks', 'Baking', 'Cycling'], [['My favourite thing in Jaipur', 'An early cycle ride up to Nahargarh.'], ['I like people who', 'ask questions and listen to the answers.']], false, false, []],
  ['sara', 'Sara', 26, 'Kochi', 7, 'Goa · 12–14 Dec', 71, 'Marine biologist', 'CUSAT', "5'5\"", 'Malayalam, English, Hindi', ['Diving', 'Kayaking', 'Seafood'], [['My office', 'The Arabian Sea. Literally.'], ['On weekends', 'Coral reefs or backwaters, either works.']], true, true, ['drift']],
].forEach(([id, name, age, city, km, trip, match, job, edu, h, lang, tags, prompts, likesYou, online, saved]) =>
  (PPL[id] = { id, name, age, img: id, city, km, trip, match, job, edu, h, lang, tags, prompts, likesYou, online, saved }));

const DECK = ['ananya', 'meera', 'kavya', 'riya', 'isha', 'zoya', 'nida', 'tara'];
const ME = { name: 'Rahul', age: 29, img: 'rahul', city: 'Mumbai', job: 'Product manager' };

const REVIEWS = [
  ['Priya & Arjun', 'Couple · Nov 2026', 5, 'Loved the sea-view room. Staff set up cake and flowers for our anniversary without us asking. Genuinely couple-friendly.', 'ananya', 24],
  ['Siddharth M.', 'Solo · Oct 2026', 4, 'The infinity pool is best at sunset. Breakfast could use more Goan options.', 'rahul', 11],
  ['Fatima K.', 'Friends · Oct 2026', 5, 'Vagator beach is a 5-minute walk. The area felt safe even at night. Check-in took 10 minutes.', 'meera', 17],
  ['Rohan & Nisha', 'Couple · Sep 2026', 5, 'No issues checking in with a local ID. Clean room, great AC, and do try the spa.', 'kavya', 9],
  ['Ankit S.', 'Family · Aug 2026', 4, 'Great pool area for kids. Parking gets tight on weekends.', 'rahul', 5],
];

/* ---------------- local helpers (unlocked per trip) ---------------- */
const HELPERS = [
  { id: 'kiran', name: 'Kiran Naik', role: 'Local guide', img: 'hp-kiran', rating: 4.9, trips: 212, yrs: 7, langs: 'Konkani, Hindi, English', price: 1500, unit: 'half day',
    tags: ['Hidden beaches', 'Old Goa churches', 'Night markets'], services: [['Half-day North Goa tour', 1500], ['Full-day tour + lunch', 2600], ['Sunset walk, Chapora fort', 900]] },
  { id: 'arjun', name: 'Arjun Fernandes', role: 'Photographer', img: 'hp-arjun', rating: 4.8, trips: 164, yrs: 5, langs: 'English, Hindi', price: 2500, unit: '1 hr shoot',
    tags: ['Couple shoots', 'Drone', '48 hr delivery'], services: [['1 hr beach shoot · 40 edits', 2500], ['Sunset shoot · 60 edits', 3500], ['Full-day trip coverage', 9000]] },
  { id: 'imran', name: 'Imran Shaikh', role: 'Driver · own car', img: 'hp-imran', rating: 4.7, trips: 390, yrs: 9, langs: 'Hindi, English, Marathi', price: 2200, unit: '8 hr / 80 km',
    tags: ['Airport pickup', 'AC sedan', 'Late nights OK'], services: [['Mopa airport pickup', 1800], ['8 hr / 80 km local', 2200], ['South Goa day trip', 3400]] },
  { id: 'sneha', name: 'Sneha Kamat', role: 'Food & culture guide', img: 'hp-sneha', rating: 4.9, trips: 131, yrs: 4, langs: 'Konkani, English, Hindi', price: 1800, unit: '3 hr walk',
    tags: ['Goan food walk', 'Fontainhas', 'Women travellers'], services: [['Panjim food walk (3 hr)', 1800], ['Fontainhas heritage walk', 1200], ['Home kitchen cooking class', 2400]] },
  { id: 'rohit', name: 'Rohit Dsouza', role: 'Scuba instructor', img: 'hp-rohit', rating: 4.8, trips: 276, yrs: 6, langs: 'English, Hindi', price: 3500, unit: 'per dive',
    tags: ['PADI certified', 'Grande Island', 'Beginners'], services: [['Discover scuba (beginner)', 3500], ['Two fun dives', 5500], ['PADI Open Water, 3 days', 22000]] },
  { id: 'vikram', name: 'Vikram Rao', role: 'Trek & kayak guide', img: 'hp-vikram', rating: 4.6, trips: 98, yrs: 8, langs: 'Kannada, Hindi, English', price: 1400, unit: 'half day',
    tags: ['Mangrove kayak', 'Dudhsagar trek', 'Safety gear incl.'], services: [['Mangrove kayak (2 hr)', 1400], ['Dudhsagar trek day trip', 3200], ['Sunrise hill trek', 1100]] },
];
const HELPER_UNLOCK_PRICE = 99;

/* ---------------- prototype login gate ---------------- */
// shortcut: client-side demo gate only — anyone with these files can read the credentials; use a real auth backend before sharing publicly.
const DEMO_LOGIN = { phone: '7745963140', password: 'qwertyuiop' };
