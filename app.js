/* Sanjh — full mobile app prototype (hotel booking + dating).
   Each screen is a template function; one delegated event layer drives navigation + state. Needs data.js first. */
'use strict';

/* ================================================================ state */
const LIKERS = new Set(['ananya', 'kavya', 'isha', 'sara', 'zoya', 'nida', 'tara']);
const S = {
  stack: ['splash'], theme: 'auto', sheet: null,
  authed: (() => { try { return sessionStorage.getItem('sanjh-auth') === '1'; } catch (e) { return false; } })(), loginErr: '', otpErr: '', loginPhone: '', pendingPhone: '',
  slide: 0, intent: 'both', gender: 'Man', showme: 'Women', interests: new Set(['Travel', 'Trekking', 'Food']),
  dest: 'North Goa', ci: 11, co: 13, flex: 'Exact', g: { adults: 2, children: 0, rooms: 1 }, kidAges: [], pets: false,
  cat: 'Beach', wish: new Set(['saagar', 'azure', 'drift']),
  view: 'list', mapSel: 'saagar', sort: 'Recommended', price: [2000, 12000],
  fsel: new Set(['Couple-friendly']), ptype: new Set(), fstars: new Set(), grate: 'Any', amen: new Set(['Pool']),
  hotel: 'saagar', photo: 0, aboutOpen: false, galCat: 'All', revFilter: 'All', helpful: new Set(),
  room: 'deluxe', meal: 'bf', req: new Set(['Honeymoon decor']), coupon: false, coins: false, split: false, pay: 'gpay', other: false,
  bookings: [
    { id: 'SNJ-48213', h: 'haveli', ci: 54, co: 56, room: 'Heritage Room', meal: 'With breakfast', guests: '2 adults', paid: 11760, via: 'UPI · GPay', status: 'up' },
    { id: 'SNJ-39102', h: 'cloud', lab: ['Thu, 9 Oct', 'Sun, 12 Oct'], room: 'Valley Suite', meal: 'Room only', guests: '1 adult', paid: 12285, via: 'HDFC card', status: 'done', reviewed: false },
    { id: 'SNJ-30877', h: 'misty', lab: ['Fri, 15 Aug', 'Sun, 17 Aug'], room: 'Classic Garden', meal: 'With breakfast', guests: '2 adults', paid: 9880, via: 'UPI · PhonePe', status: 'done', reviewed: true },
    { id: 'SNJ-28750', h: 'palm', lab: ['Fri, 12 Sep', 'Sun, 14 Sep'], room: 'Deluxe Room', meal: 'Room only', guests: '2 adults', paid: 6720, via: 'UPI · GPay', status: 'cancel' },
  ],
  trip: 'SNJ-48213', tripsTab: 'up', cancelReason: 'Plans changed',
  stars: 0, rv: {}, rvTags: new Set(), reviewFor: 'SNJ-39102',
  deck: 0, person: 'ananya', matchWith: 'ananya', liked: new Set(), promptLiked: new Set(),
  chat: 'ananya', typing: null,
  chats: {
    ananya: [
      { t: 'Hey Rahul! Are you in Goa on the 13th too? 😄', time: '8:41 PM' },
      { me: 1, t: "Yes! I get in on the 12th. What's your plan?", time: '8:43 PM' },
      { t: "I'm thinking of staying near Vagator. Seen this one?", time: '8:44 PM' },
      { type: 'hotel', h: 'saagar', time: '8:44 PM' },
      { me: 1, t: 'Wait, I saved this one too 😍', time: '8:46 PM' },
      { type: 'voice', dur: '0:14', time: '8:47 PM' },
      { t: 'Sunset at Chapora Fort? 🌅', time: '8:48 PM' },
    ],
    riya: [{ t: 'Up for kayaking in Goa?', time: '7:10 PM' }],
    zoya: [{ me: 1, t: "Don't forget to bring biryani from Hyderabad 😂", time: 'Yesterday' }, { t: 'Deal! But the chai is on you', time: 'Yesterday' }],
    pooja: [{ me: 1, t: 'Best food spot in Ahmedabad?', time: 'Mon' }, { t: 'Manek Chowk, after 11 pm 🔥', time: 'Mon' }],
    neha: [{ t: 'Thanks for the Jaipur tips!', time: 'Sun' }],
  },
  unread: { ananya: 2, riya: 1 },
  newMatches: ['meera', 'kavya', 'isha'],
  call: { mute: false, cam: true, sec: 252 },
  plan: { vote: 'saagar', rooms: 'Separate rooms', split: '50 / 50', live: true },
  df: { age: [22, 32], dist: 25, travel: true, verified: true, show: 'Women', ints: new Set(['Beach sunsets', 'Trekking']), langs: new Set(['Hindi', 'English']) },
  premium: false, plan_tier: 'gold', dur: '3', likesTab: 'Likes you',
  verified: false, verifyStep: 0,
  coinsBal: 1250, lang: 'English', notifTab: 'All', offerTab: 'All',
  set: { pause: false, incog: false, discover: true, nMatch: true, nMsg: true, nBook: true, nPrice: true, nOffer: false, receipts: true, online: true, distance: true, live: true },
  helpersUnlocked: false, unlocking: false, unlockPay: 'gpay', helper: 'kiran', hsvc: 0, hday: 11, hrole: 'All', hbooked: {},
  readAll: false,
};

/* ================================================================ screen registry (sidebar + notes) */
const GROUPS = [
  ['Getting started', [
    ['splash', 'Splash', 'Brand screen on app launch.', ['Animated gradient logo', 'Get started / Login options'], { light: 1, cls: 'splash' }],
    ['onboard', 'Onboarding', '3 slides that explain the app.', ['Swipe-style slides + dots', 'Skip and Next'], { light: 1 }],
    ['login', 'Login', 'Private prototype login: mobile number + password, then OTP.', ['Only the approved number can log in', 'Password with show / hide', 'Clear error messages', 'OTP step next']],
    ['otp', 'OTP verify', '6-digit OTP with auto-advancing boxes.', ['Auto-advance boxes', 'Resend timer', 'Change number']],
    ['intent', 'Choose intent', 'User picks hotels only, dating only, or both.', ['3 clear options', 'Recommended badge']],
    ['setup', 'Profile setup', 'Photos, name, gender and interests.', ['Photo grid', 'Gender + "show me"', 'Interest chips', 'Progress bar']],
  ]],
  ['Find a stay', [
    ['home', 'Home', 'Main screen: search, categories, offers and top picks.', ['Destination / dates / guests search', 'Categories', 'Offer banner', 'Matches going to the same place', 'Trending + recently viewed'], { tab: 'home' }],
    ['search', 'Search', 'Search by place or hotel name.', ['Near me', 'Recent searches', 'Popular destinations']],
    ['dates', 'Date picker', 'Check-in / check-out calendar.', ['Range select', 'Price for each day', 'Flexible dates', 'Nights count']],
    ['guests', 'Guests & rooms', 'How many guests and rooms.', ['Adults / children / rooms steppers', "Children's ages", 'Pet-friendly toggle']],
    ['results', 'Search results', 'Hotel list with a map toggle.', ['Quick filter chips', 'Sort', 'Discount + rooms left', 'Wishlist heart', 'Map / list switch']],
    ['map', 'Map view', 'Hotels on a map with price pins.', ['Price pins', 'Pin tap → hotel card']],
    ['filters', 'Filters', 'All filters in one place.', ['Sort', 'Price range slider', 'Property type', 'Star + guest rating', 'Amenities', 'Couple-friendly / local ID / free cancellation']],
  ]],
  ['Hotel details', [
    ['hotel', 'Hotel detail', 'Everything about the hotel.', ['Photo gallery', 'Rating + badges', 'Amenities', 'About', 'Reviews summary', 'Location + nearby', 'House rules + cancellation', 'Saved by your matches'], { light: 1 }],
    ['gallery', 'Photos', 'All photos, by category.', ['Category chips', 'Photo grid']],
    ['reviews', 'Reviews', 'All reviews, with filters.', ['Score breakdown', 'Couple / family / solo filter', 'Helpful button']],
    ['rooms', 'Room select', 'Pick a room type and meal plan.', ['Room cards', 'Size, bed, view', 'Meal plans', 'Rooms left']],
  ]],
  ['Local helpers', [
    ['helpers', 'Helpers list', 'Verified local helpers near the hotel. Photos and names stay locked until you pay ₹99.', ['Blurred photo + hidden name', 'Rating, languages and price shown upfront', '₹99 unlock (free with Gold)', 'Role filter'], {}],
    ['helper', 'Helper profile', "A helper's full profile and booking, after unlocking.", ['Photo + full name', 'Services and prices', 'Pick a day', 'Reviews', 'Book'], { light: 1 }],
  ]],
  ['Booking & payment', [
    ['checkout', 'Checkout', 'Booking review and guest details.', ['Stay summary', 'Guest details', 'Special requests', 'Coupon apply', 'Sanjh Coins', 'Split with a match', 'Price breakdown']],
    ['payment', 'Payment', 'UPI, card, net banking or pay at hotel.', ['GPay / PhonePe / Paytm', 'UPI ID', 'Saved card', 'Net banking, EMI, pay at hotel']],
    ['processing', 'Processing', 'Payment in progress.', ['Loader', 'Auto-redirect']],
    ['success', 'Booking confirmed', 'Booking done.', ['Confetti', 'Booking ID + QR', 'Add to calendar', 'Share with a match']],
  ]],
  ['Trips & more', [
    ['trips', 'My trips', 'Upcoming, completed, cancelled bookings.', ['3 tabs', 'Status badges', 'Write a review', 'Plan trip together'], { tab: 'trips' }],
    ['trip', 'Booking detail', 'Full details of one booking.', ['QR check-in', 'Directions / call / chat / invoice', 'Modify dates', 'Cancel + refund'], { light: 1 }],
    ['review', 'Write review', 'Review your stay.', ['Star rating', 'Category ratings', 'Tags', 'Photos', '+50 coins']],
    ['wishlist', 'Wishlist', 'Saved hotels and collections.', ['Collections', 'Saved hotels list']],
    ['offers', 'Offers', 'Coupons and bank offers.', ['Coupon cards', 'Copy code', 'Category tabs']],
    ['notifications', 'Notifications', 'Booking, match and message updates.', ['Unread dots', 'Today / earlier', 'Mark all read']],
  ]],
  ['Dating', [
    ['discover', 'Discover', 'Swipe cards: only people who will be on your trip.', ['Drag to swipe', 'Rewind / pass / super / like / boost', 'Trip match %', 'Travel mode chip'], { tab: 'discover' }],
    ['dfilters', 'Dating filters', 'Age, distance, interests and languages.', ['Travel mode', 'Age range', 'Distance', 'Verified only', 'Premium filters (locked)']],
    ['person', 'Profile view', "Someone's full profile.", ['Prompts you can like', 'Basics', 'Upcoming trip', 'Hotels they saved', 'Report / block'], { light: 1 }],
    ['match', "It's a match", 'Celebration when you match.', ['Animated photos', 'Hotels you both saved', 'Quick replies', 'Plan trip together'], { light: 1, cls: 'matchv' }],
    ['likes', 'Likes you', 'Who liked you (Premium).', ['Blurred grid', 'Top picks', 'Upgrade CTA']],
  ]],
  ['Chat & together', [
    ['matches', 'Chats', 'Matches and conversations.', ['New matches row', 'Unread count', 'Online dot', 'Your turn badge'], { tab: 'matches' }],
    ['chat', 'Chat', 'Working chat: send a message and get a reply.', ['Hotel card share', 'Voice note', 'Icebreakers', 'Attach menu', 'Typing indicator', 'Call / video']],
    ['call', 'Video call', 'Safe video call; your number stays private.', ['Mute / camera / flip / end', 'Self view', 'Live timer'], { light: 1, cls: 'callv' }],
    ['plan', 'Plan trip together', 'Plan a trip with a match.', ['Dates overlap', 'Hotel voting', 'Separate / shared room', 'Bill split', 'Live location share']],
  ]],
  ['Profile & account', [
    ['me', 'My profile', 'Your profile and menu.', ['Completion ring', 'Premium card', 'Stats', 'All menu links'], { tab: 'me' }],
    ['edit', 'Edit profile', 'Photos, bio, prompts and interests.', ['6 photo slots', 'Bio', 'Prompts', 'Interests', 'Basics', 'Show-trips toggle']],
    ['verify', 'Verification', 'Get a blue tick with a selfie.', ['Steps', 'Face scan animation', 'Success state']],
    ['premium', 'Premium plans', 'Plus / Gold / Platinum.', ['Plan cards', 'Duration + savings', 'Feature comparison']],
    ['wallet', 'Sanjh Coins', 'Wallet plus refer & earn.', ['Balance', 'Referral code', 'History']],
    ['safety', 'Safety center', 'SOS and safety tools.', ['Hold-to-SOS', 'Live trip share', 'Emergency contacts', 'Safety tips']],
    ['settings', 'Settings', 'Account, theme, notifications and privacy.', ['Light / dark / auto', 'Language', 'Notification toggles', 'Privacy', 'Logout / delete']],
    ['help', 'Help center', 'FAQs and support.', ['Search', 'Topics', 'FAQ accordion', 'Chat / call / email']],
  ]],
];
const META = {}; const ORDER = [];
GROUPS.forEach(([g, items]) => items.forEach(([id, t, d, f, o = {}]) => { META[id] = { id, g, t, d, f, ...o }; ORDER.push(id); }));
const TABS = ['home', 'trips', 'discover', 'matches', 'me'];
const PARENT = { search: 'home', dates: 'home', guests: 'home', results: 'home', map: 'home', filters: 'home', hotel: 'home', gallery: 'home', reviews: 'home', rooms: 'home',
  checkout: 'home', payment: 'home', processing: 'home', success: 'home', trip: 'trips', review: 'trips', wishlist: 'me', offers: 'home', notifications: 'home',
  helpers: 'home', helper: 'home', dfilters: 'discover', person: 'discover', match: 'discover', likes: 'discover', chat: 'matches', call: 'matches', plan: 'matches',
  edit: 'me', verify: 'me', premium: 'me', wallet: 'me', safety: 'me', settings: 'me', help: 'me' };

/* ================================================================ shared bits */
const cur = () => S.stack[S.stack.length - 1];
const nights = () => Math.max(1, (S.co ?? S.ci + 1) - S.ci);
const guestsLabel = () => `${S.g.adults + S.g.children} guest${S.g.adults + S.g.children > 1 ? 's' : ''}${S.g.rooms > 1 ? ` · ${S.g.rooms} rooms` : ''}`;
const datesLabel = () => { if (S.co == null) return `${dshort(S.ci)} → ?`; const a = dparts(S.ci), b = dparts(S.co); return a.m === b.m ? `${a.d}–${b.d} ${a.m}` : `${dshort(S.ci)} – ${dshort(S.co)}`; };
const goaHotels = () => Object.values(HOT).filter(h => h.city === 'Goa');

function quote(hid = S.hotel) {
  const h = HOT[hid], r = roomsOf(h).find(x => x.id === S.room) || roomsOf(h)[1];
  const n = nights(), per = r.price + MEALS[S.meal][1];
  const base = per * n * S.g.rooms;
  const disc = S.coupon ? Math.min(Math.round(base * 0.2), 1500) : 0;
  const coins = S.coins ? 250 : 0;
  const tax = Math.round((base - disc) * (per <= 7500 ? 0.05 : 0.18)); // GST slab on room tariff
  const total = base - disc + tax - coins;
  return { h, r, n, per, base, disc, coins, tax, total, share: Math.round(total / 2) };
}

const abar = (title, o = {}) => `<div class="abar${o.center ? ' center' : ''}">${o.noBack ? '' : `<button class="ib" data-back aria-label="Back">${ic('back')}</button>`}<h2>${title}${o.sub ? `<small>${o.sub}</small>` : ''}</h2>${o.right || ''}</div>`;
const favBtn = (h, cls = 'glass') => `<button class="ib ${cls} fav${on(S.wish.has(h.id))}" data-a="fav" data-id="${h.id}" aria-label="Save ${esc(h.name)}" aria-pressed="${S.wish.has(h.id)}">${ic('heart')}</button>`;
const rateEl = r => `<span class="rate">${ic('star', 'f')}${r}</span>`;
const pct = h => Math.round((1 - h.price / h.old) * 100);
const dock = act => `<nav class="dock" aria-label="Main">
  <button class="${on(act === 'home')}" data-tab="home">${ic('explore')}Explore</button>
  <button class="${on(act === 'trips')}" data-tab="trips">${ic('trips')}Trips</button>
  <button class="${on(act === 'discover')}" data-tab="discover">${ic(act === 'discover' ? 'heart' : 'heart', act === 'discover' ? 'f' : '')}Connect</button>
  <button class="${on(act === 'matches')}" data-tab="matches">${ic('chat')}Chats${totalUnread() ? `<span class="cnt">${totalUnread()}</span>` : ''}</button>
  <button class="${on(act === 'me')}" data-tab="me">${ic('user')}Profile</button></nav>`;
const totalUnread = () => Object.values(S.unread).reduce((a, b) => a + b, 0);
const initials = n => n.split(/\s|&/).filter(Boolean).map(w => w[0]).slice(0, 2).join('');
const avatarTxt = (n, k) => `<span class="av s" style="display:grid;place-items:center;font-weight:800;font-size:12px;color:#fff;background:${['#E11D64', '#A86B00', '#3F3F46'][k % 3]}">${initials(n)}</span>`;
const hcard = h => `<div class="hcard" role="link" tabindex="0" data-go="hotel" data-s="hotel=${h.id}">
  <div class="ph"><img src="${im(h.img[0])}" alt="${esc(h.name)}" loading="lazy"><span class="gchip">${ic('star', 'f star')}${h.rating}</span>${favBtn(h)}</div>
  <div class="meta"><b>${h.name}</b><span class="muted small">${h.area}</span><span class="price"><strong>${inr(h.price)}</strong> / night</span></div></div>`;
const mini = (h, sub) => `<div class="mini" role="link" tabindex="0" data-go="hotel" data-s="hotel=${h.id}"><img src="${im(h.img[0])}" alt=""><div class="t"><b>${h.name}</b><small>${sub || `${inr(h.price)} / night · ${h.area}`}</small></div>${rateEl(h.rating)}</div>`;
const sw = (path, val, label) => `<label class="sw"><input type="checkbox" data-c="${path}" ${val ? 'checked' : ''} aria-label="${esc(label || path)}"><i></i></label>`;
const seg = (path, opts, val) => `<div class="seg">${opts.map(o => `<button class="${on(o === val)}" data-a="set" data-k="${path}" data-v="${esc(o)}">${o}</button>`).join('')}</div>`;
const chipTog = (setName, v, extra = '') => `<button class="chip${on(getPath(setName).has(v))}" data-a="tog" data-k="${setName}" data-v="${esc(v)}">${extra}${v}</button>`;
const li = (icon, tone, title, sub, right = ic('right'), attrs = '') => `<button class="li" ${attrs}><span class="ico ${tone}">${ic(icon)}</span><span class="t"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${right}</button>`;
const liStatic = (icon, tone, title, sub, right = '') => `<div class="li"><span class="ico ${tone}">${ic(icon)}</span><span class="t"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${right}</div>`;
const mapSvg = () => `<svg class="map" viewBox="0 0 375 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect width="375" height="800" fill="#BFDCEB"/>
  <path d="M120 0 C 95 90 140 150 110 230 C 85 300 130 360 105 440 C 85 520 140 590 115 680 C 105 740 120 780 115 800 L375 800 L375 0Z" fill="#EEF1E6"/>
  <path d="M160 0 C 150 120 200 200 180 300 C 165 380 220 460 200 560 C 190 640 240 720 230 800" stroke="#fff" stroke-width="10" fill="none"/>
  <path d="M110 230 C 200 250 260 230 375 260 M105 440 C 190 470 280 430 375 470 M115 680 C 200 660 300 700 375 690" stroke="#fff" stroke-width="6" fill="none"/>
  <path d="M375 120 C 300 150 260 120 230 170 C 200 220 160 210 120 260" stroke="#A9D2E4" stroke-width="8" fill="none"/>
  <circle cx="280" cy="380" r="46" fill="#D8E9C8"/><circle cx="300" cy="600" r="60" fill="#D8E9C8"/><circle cx="250" cy="110" r="36" fill="#D8E9C8"/>
  <text x="60" y="380" fill="#7FA9BF" font-size="13" font-weight="700" font-family="sans-serif" transform="rotate(-80 60 380)">ARABIAN SEA</text>
  <text x="215" y="300" fill="#8B8FA3" font-size="11" font-weight="700" font-family="sans-serif">Anjuna</text>
  <text x="225" y="520" fill="#8B8FA3" font-size="11" font-weight="700" font-family="sans-serif">Calangute</text>
  <text x="200" y="190" fill="#8B8FA3" font-size="11" font-weight="700" font-family="sans-serif">Morjim</text></svg>`;

/* ================================================================ screens */
const SC = {};

/* ---------- onboarding ---------- */
SC.splash = () => `<div><div class="logo-mark">${ic('heart', 'f')}</div><h1>sanjh.</h1><p>Stay · Connect · Together</p></div>
  <div class="bottom"><button class="btn white" data-go="onboard">Get started</button>
  <button class="btn line" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.3)" data-go="login">I have an account · Log in</button></div>`;

const SLIDES = [
  ['goa-pool', 'Dream stays at<br><span class="gt">the best price</span>', 'Verified hotels from Goa to Manali, with couple-friendly and local ID filters.'],
  ['ananya', 'Meet people going<br><span class="gt">where you are</span>', 'Discover only shows people who will be in the same city on your dates.'],
  ['dusk-palms', 'Matched?<br><span class="gt">Plan the trip</span> together', 'Vote on saved hotels and split the bill, with Safe Stay built in.'],
];
SC.onboard = () => { const s = SLIDES[S.slide]; return `
  <div class="ob-img"><img src="${im(s[0])}" alt=""><button class="gchip" style="position:absolute;z-index:3;top:calc(var(--st) + 10px);right:18px" data-go="login">Skip</button></div>
  <div class="ob-body"><div class="dots">${SLIDES.map((_, k) => `<i class="${on(k === S.slide)}"></i>`).join('')}</div>
  <h2 class="title-xl">${s[1]}</h2><p class="sub">${s[2]}</p><div style="flex:1"></div>
  <div class="row">${S.slide ? `<button class="btn line auto" style="padding:15px 20px" data-a="slide" data-v="${S.slide - 1}" aria-label="Previous">${ic('back')}</button>` : ''}
  <button class="btn" data-a="slide" data-v="${S.slide + 1}">${S.slide === 2 ? 'Get started' : 'Next'} ${ic('right')}</button></div></div>`; };

SC.login = () => `<div class="vs">${abar('')}
  <h2 class="title-xl">Log in to<br>Sanjh</h2><p class="sub">Enter your mobile number and password. We'll send an OTP next.</p>
  <div class="field"><label for="ph">Mobile number</label><div class="inp"><span class="pre">IN +91</span><input id="ph" type="tel" inputmode="numeric" maxlength="14" placeholder="10-digit number" autocomplete="tel" value="${esc(S.loginPhone)}"></div></div>
  <div class="field"><label for="pw">Password</label><div class="inp">${ic('lock')}<input id="pw" type="password" placeholder="Password" autocomplete="current-password"><button class="ib ghost" style="width:36px;height:36px" data-a="togglePw" aria-label="Show password">${ic('eyeoff')}</button></div></div>
  ${S.loginErr ? `<div class="loginerr" role="alert">${ic('alert')}<span>${S.loginErr}</span></div>` : ''}
  <button class="btn" data-a="login">Continue</button>
  <button class="link small" style="align-self:center" data-a="toast" data-v="Password reset isn't available in this prototype">Forgot password?</button>
  <div class="row" style="gap:12px"><hr class="hr grow"><span class="small faint b">or</span><hr class="hr grow"></div>
  <button class="social-btn" data-a="toast" data-v="Only phone login is enabled in this prototype"><span class="gl">G</span>Continue with Google</button>
  <button class="social-btn" data-a="toast" data-v="Only phone login is enabled in this prototype">${ic('user')}Continue with Apple</button>
  <p class="small muted" style="text-align:center;margin-top:auto">Private prototype. Only the approved number can log in.</p></div>`;

const fmtPhone = p => p.replace(/(\d{5})(\d{5})/, '$1 $2');
SC.otp = () => `<div class="vs">${abar('')}
  <h2 class="title-xl">Enter OTP</h2><p class="sub">We sent a 6-digit code to +91 ${fmtPhone(S.pendingPhone)}. <button class="link" data-back>Change number</button></p>
  <div class="otp">${[0, 1, 2, 3, 4, 5].map(k => `<input id="otp${k}" inputmode="numeric" maxlength="1" data-in="otp" aria-label="Digit ${k + 1}" autocomplete="${k ? 'off' : 'one-time-code'}">`).join('')}</div>
  ${S.otpErr ? `<div class="loginerr" role="alert">${ic('alert')}<span>${S.otpErr}</span></div>` : ''}
  <p class="small muted">${ic('clock')} Resend code in <b class="num">0:24</b></p>
  <button class="btn" data-a="verifyOtp">Verify & continue</button>
  <div class="card soft p row">${ic('info')}<span class="small muted">Prototype: any 6-digit code works.</span></div></div>`;

SC.intent = () => `<div class="vs">${abar('', { right: '<span class="small muted b">Step 1 / 3</span>' })}
  <div class="progress"><i style="width:33%"></i></div>
  <h2 class="title-xl">What are you<br>looking for?</h2><p class="sub">You can change this anytime in Settings.</p>
  <div class="intent">${[['stay', 'bed', 'Hotel booking only', 'Great stays, deals and easy booking'], ['date', 'heart', 'Dating only', 'Meet new people who love to travel'], ['both', 'spark', 'Both', 'Find a travel partner and stay together']].map(([v, i, t, d]) =>
    `<button class="opt${on(S.intent === v)}" data-a="set" data-k="intent" data-v="${v}"><span class="big-ico">${ic(i)}</span><span class="t"><b>${t} ${v === 'both' ? '<span class="badge rose">Recommended</span>' : ''}</b><small>${d}</small></span><span class="radio"></span></button>`).join('')}</div>
  <div style="flex:1"></div><button class="btn" data-go="setup">Continue</button></div>`;

SC.setup = () => `<div class="vs footed">${abar('', { right: '<span class="small muted b">Step 2 / 3</span>' })}
  <div class="progress"><i style="width:66%"></i></div>
  <h2 class="title-l">Create your profile</h2>
  <div class="photos6"><div class="main"><img src="${im('rahul')}" alt="Your main photo"><span class="badge rose tagm">Main photo</span></div>
    <div><img src="${im('mountains')}" alt=""><button class="x" data-a="toast" data-v="Photo removed" aria-label="Remove photo">${ic('x')}</button></div>
    ${[1, 2, 3, 4].map(() => `<button data-a="toast" data-v="Opens gallery (demo)" aria-label="Add photo">${ic('plus')}</button>`).join('')}</div>
  <div class="field"><label for="nm">Name</label><div class="inp"><input id="nm" value="Rahul Sharma"></div></div>
  <div class="field"><label for="dob">Birthday</label><div class="inp">${ic('cal')}<input id="dob" value="14 / 08 / 1997"></div><small class="faint small">Only your age is shown, not your birthday.</small></div>
  <div class="field"><span class="lbl">I am</span>${seg('gender', ['Man', 'Woman', 'Non-binary'], S.gender)}</div>
  <div class="field"><span class="lbl">Show me</span>${seg('showme', ['Women', 'Men', 'Everyone'], S.showme)}</div>
  <div class="field"><span class="lbl">Interests (pick at least 3)</span><div class="chips wrap">${['Travel', 'Trekking', 'Food', 'Music', 'Beaches', 'Photography', 'Cafés', 'Yoga', 'Books', 'Road trips'].map(v => chipTog('interests', v)).join('')}</div></div>
  </div><div class="foot"><button class="btn full" data-a="finishSetup">Finish ${ic('check')}</button></div>`;

/* ---------- hotel discovery ---------- */
SC.home = () => `<div class="vs tabbed">
  <div class="hello"><span class="ring"><img class="av" src="${im('rahul')}" alt="Rahul"></span><div class="grow"><small>Good evening</small><b>${ME.name}</b></div>
    <button class="ib" data-go="offers" aria-label="Offers">${ic('tag')}</button>
    <button class="ib" data-go="notifications" aria-label="Notifications">${ic('bell')}${S.readAll ? '' : '<span class="dot"></span>'}</button></div>
  <h2 class="title-xl">Where to<br>this <span class="gt">weekend?</span></h2>
  <div class="searchcard">
    <button class="sf" data-go="search">${ic('pin')}<span><small>Destination</small><b>${S.dest}</b></span></button>
    <div class="two"><button class="sf" data-go="dates">${ic('cal')}<span><small>Dates</small><b>${datesLabel()}</b></span></button>
    <button class="sf" data-go="guests">${ic('users')}<span><small>Guests</small><b>${guestsLabel()}</b></span></button></div>
    <button class="btn" data-go="results">${ic('search')}Search stays</button></div>
  <div class="cats">${[['Beach', 'sun'], ['Hills', 'mount'], ['Heritage', 'bank'], ['Villas', 'home']].map(([v, i]) => `<button class="${on(S.cat === v)}" data-a="set" data-k="cat" data-v="${v}">${ic(i)}${v}</button>`).join('')}</div>
  <div class="promo" role="link" tabindex="0" data-go="offers"><img src="${im('dusk-palms')}" alt=""><small>Winter sale · till 31 Dec</small><b>20% off couple stays</b><span class="code">SANJH20</span></div>
  <button class="fusion" data-tab="discover"><span class="avs">${['ananya', 'meera', 'kavya'].map(p => `<img src="${im(p)}" alt="">`).join('')}</span><span class="grow"><b>8 people in Goa on your dates</b><small>See who's going in Discover</small></span>${ic('right')}</button>
  <div class="sh"><h3>Top picks for couples</h3><button data-go="results">See all</button></div>
  <div class="hscroll">${['saagar', 'azure', 'drift', 'palm', 'casa'].map(id => hcard(HOT[id])).join('')}</div>
  <div class="sh"><h3>Trending destinations</h3></div>
  <div class="dests">${[['Goa', 'goa-beach'], ['Jaipur', 'jaipur'], ['Manali', 'mountains'], ['Agra', 'agra'], ['Jaisalmer', 'jaisalmer'], ['Wayanad', 'wayanad'], ['Kashmir', 'lake']].map(([n, i]) => `<button class="${on(S.dest.includes(n))}" data-a="dest" data-v="${n}"><img src="${im(i)}" alt="">${n}</button>`).join('')}</div>
  <div class="sh"><h3>Recently viewed</h3></div>
  <div class="stack">${mini(HOT.haveli)}${mini(HOT.cloud)}</div>
  </div>${dock('home')}`;

SC.search = () => `<div class="vs">${abar('Where to?')}
  <label class="sbox">${ic('search')}<input id="q" placeholder="City, area or hotel name" aria-label="Search" data-in="q"></label>
  <div class="list">${li('pin', 'rose', 'Near me', 'Use current location', ic('right'), 'data-a="dest" data-v="Near me"')}</div>
  <div class="sh"><h3>Recent searches</h3><button data-a="toast" data-v="History cleared">Clear</button></div>
  <div class="list">${li('clock', '', 'North Goa', '12–14 Dec · 2 guests', ic('right'), 'data-a="dest" data-v="North Goa"')}${li('clock', '', 'Jaipur', '24–26 Jan · 2 guests', ic('right'), 'data-a="dest" data-v="Jaipur"')}${li('clock', '', 'Old Manali', 'Oct · 1 guest', ic('right'), 'data-a="dest" data-v="Manali"')}</div>
  <div class="sh"><h3>Popular destinations</h3></div>
  <div class="dgrid" id="dgrid">${[['Goa', 'goa-beach', '1,240 stays'], ['Jaipur', 'jaipur', '860 stays'], ['Manali', 'mountains', '640 stays'], ['Agra', 'agra', '410 stays'], ['Jaisalmer', 'jaisalmer', '290 stays'], ['Wayanad', 'wayanad', '350 stays']].map(([n, i, c]) =>
    `<button class="dtile" data-a="dest" data-v="${n}" data-name="${n.toLowerCase()}"><img src="${im(i)}" alt=""><span><b>${n}</b><small>${c}</small></span></button>`).join('')}</div></div>`;

const calMonth = (base, name, first, len) => {
  let cells = '';
  for (let k = 0; k < first; k++) cells += '<span></span>';
  for (let d = 0; d < len; d++) {
    const i = base + d, p = dparts(i), wk = p.dow === 'Fri' || p.dow === 'Sat';
    const s = i === S.ci, e = i === S.co, inr_ = S.co != null && i > S.ci && i < S.co;
    cells += `<button class="${s ? 's' : ''}${e ? ' e' : ''}${inr_ ? ' in' : ''}" data-a="day" data-v="${i}" aria-label="${dlabel(i)}">${d + 1}<span class="p" style="${wk ? 'color:var(--muted)' : ''}">${wk ? '7.1k' : '5.9k'}</span></button>`;
  }
  return `<div class="cal"><h4>${name}</h4><div class="wk">${'SMTWTFS'.split('').map(c => `<span>${c}</span>`).join('')}</div><div class="days">${cells}</div></div>`;
};
SC.dates = () => `<div class="vs footed">${abar('Select dates', { sub: S.co == null ? 'Select a check-out date' : `${nights()} night${nights() > 1 ? 's' : ''}` })}
  ${seg('flex', ['Exact', '± 1 day', '± 3 days'], S.flex)}
  <div class="row small muted">${ic('info')}<span>Lowest nightly price under each date. Weekdays are cheaper.</span></div>
  ${calMonth(0, 'December 2026', 2, 31)}${calMonth(31, 'January 2027', 5, 31)}
  </div><div class="foot"><div class="grow"><strong>${datesLabel()}</strong><small>${S.co == null ? 'Select check-out' : `${nights()} nights from ${dlabel(S.ci)}`}</small></div>
  <button class="btn" data-back ${S.co == null ? 'disabled' : ''}>Apply</button></div>`;

const stepRow = (k, t, s, min) => `<div class="li"><span class="t"><b>${t}</b><small>${s}</small></span><div class="stepper">
  <button data-a="step" data-k="${k}" data-v="-1" ${S.g[k] <= min ? 'disabled' : ''} aria-label="Decrease">${ic('minus')}</button><b>${S.g[k]}</b>
  <button data-a="step" data-k="${k}" data-v="1" ${S.g[k] >= 8 ? 'disabled' : ''} aria-label="Increase">${ic('plus')}</button></div></div>`;
SC.guests = () => `<div class="vs footed">${abar('Guests & rooms')}
  <div class="list">${stepRow('adults', 'Adults', '13 or older', 1)}${stepRow('children', 'Children', 'Ages 0–12', 0)}${stepRow('rooms', 'Rooms', 'Max 3 guests per room', 1)}</div>
  ${S.g.children ? `<div class="card p stack"><span class="lbl">Children's ages (for accurate pricing)</span>${Array.from({ length: S.g.children }, (_, k) => `<div class="inp"><span class="b">Child ${k + 1}</span><select id="kid${k}" aria-label="Child ${k + 1} age">${Array.from({ length: 13 }, (_, a) => `<option ${a === 5 ? 'selected' : ''}>${a} yrs</option>`).join('')}</select></div>`).join('')}</div>` : ''}
  <div class="list">${liStatic('leaf', 'ok', 'Pet-friendly stays only', 'Travelling with a pet?', sw('pets', S.pets, 'Pet-friendly'))}</div>
  <div class="card violet p row">${ic('shield')}<span class="small"><b>Tip for couples:</b> the "Local ID accepted" and "Couple-friendly" filters are already on for unmarried couples.</span></div>
  </div><div class="foot"><div class="grow"><strong>${guestsLabel()}</strong><small>${S.g.rooms} room${S.g.rooms > 1 ? 's' : ''}</small></div><button class="btn" data-back>Apply</button></div>`;

const resultList = () => { const list = Object.values(HOT).filter(h => S.dest.includes(h.city) || (S.dest === 'Near me' && h.city === 'Goa'));
  const arr = list.length ? list : goaHotels();
  const sorted = [...arr];
  if (S.sort.startsWith('Price: low')) sorted.sort((a, b) => a.price - b.price);
  else if (S.sort.startsWith('Price: high')) sorted.sort((a, b) => b.price - a.price);
  else if (S.sort === 'Rating') sorted.sort((a, b) => b.rating - a.rating);
  return sorted; };
const rcard = h => `<div class="rcard" role="link" tabindex="0" data-go="hotel" data-s="hotel=${h.id}">
  <div class="ph"><img src="${im(h.img[0])}" alt="${esc(h.name)}" loading="lazy"><span class="gchip">${h.tags[0]}</span>${favBtn(h)}<span class="pd">${h.img.slice(0, 5).map(() => '<i></i>').join('')}</span></div>
  <div class="bd"><div class="row between"><h4 class="ell">${h.name}</h4>${rateEl(h.rating)}<span class="small muted">(${h.reviews})</span></div>
  <span class="small muted">${h.area} · ${h.dist}</span>
  <div class="chips wrap">${h.tags.slice(1).map(t => `<span class="badge ${t.includes('cancel') ? 'ok' : ''}">${t.includes('cancel') ? ic('check') : ''}${t}</span>`).join('')}</div>
  <div class="row between"><span class="price"><span class="strike">${inr(h.old)}</span> <strong>${inr(h.price)}</strong> / night</span><span class="badge rose">${pct(h)}% off</span></div>
  ${h.left ? `<span class="left">Only ${h.left} room${h.left > 1 ? 's' : ''} left</span>` : ''}</div></div>`;
SC.results = () => { const list = resultList(); return `<div class="vs footed">
  <div class="row"><button class="ib" data-back aria-label="Back">${ic('back')}</button>
    <button class="sumbar grow" data-go="search"><span class="grow"><b class="ell">${S.dest}</b><small>${datesLabel()} · ${guestsLabel()}</small></span><span class="ib ghost">${ic('edit')}</span></button></div>
  <div class="chips"><button class="chip on" data-go="filters">${ic('sliders')}Filters${S.fsel.size + S.amen.size ? ` · ${S.fsel.size + S.amen.size}` : ''}</button>
    <button class="chip" data-a="sheet" data-v="sort">${ic('sort')}${S.sort}</button>
    ${['Couple-friendly', 'Free cancellation', 'Pool', '4.5+ rating', 'Pay at hotel'].map(v => chipTog('fsel', v)).join('')}</div>
  <div class="row between"><span class="small muted"><b class="num" style="color:var(--ink)">${list.length * 21 + 2} stays</b> · prices incl. taxes</span><span class="badge gold">${ic('crown')}Gold members: extra 10% off</span></div>
  ${list.map(rcard).join('')}
  </div><button class="floatbtn" style="bottom:34px" data-go="map">${ic('map')}Map</button>`; };

SC.map = () => { const list = goaHotels(), sel = HOT[S.mapSel] || list[0]; return `<div class="mapview">${mapSvg()}
  ${list.map(h => `<button class="pinp${on(h.id === sel.id)}" style="left:${h.x}%;top:${h.y + 18}%" data-a="set" data-k="mapSel" data-v="${h.id}">${inr(h.price)}</button>`).join('')}
  <div class="maptop"><button class="ib" data-back aria-label="Back">${ic('back')}</button><button class="sumbar" data-go="search"><span class="grow"><b class="ell">${S.dest}</b><small>${datesLabel()} · ${guestsLabel()}</small></span></button><button class="ib" data-go="filters" aria-label="Filters">${ic('sliders')}</button></div>
  <div class="mapcard" style="bottom:96px">${mini(sel, `${inr(sel.price)} / night · ${sel.dist}`)}</div>
  <button class="floatbtn" style="bottom:34px" data-back>${ic('list')}List</button></div>`; };

const hist = () => { const bars = [3, 5, 8, 12, 16, 20, 18, 22, 17, 14, 12, 10, 8, 9, 6, 5, 4, 3, 2, 2]; return `<div style="display:flex;align-items:flex-end;gap:3px;height:56px">${bars.map((b, k) => { const v = 1000 + k * 1000; const inR = v >= S.price[0] && v <= S.price[1]; return `<i style="flex:1;height:${b * 2.4}px;border-radius:3px;background:${inR ? 'var(--rose-bright)' : 'var(--surface-3)'};opacity:${inR ? .75 : 1}"></i>`; }).join('')}</div>`; };
SC.filters = () => `<div class="vs footed">${abar('Filters', { right: '<button class="link small" data-a="resetFilters">Reset</button>' })}
  <div class="sh"><h3>Sort by</h3></div>
  <div class="list">${['Recommended', 'Price: low to high', 'Price: high to low', 'Rating', 'Distance from beach'].map(v => `<button class="li${on(S.sort === v)}" data-a="set" data-k="sort" data-v="${v}"><span class="t"><b>${v}</b></span><span class="radio${on(S.sort === v)}"></span></button>`).join('')}</div>
  <div class="sh"><h3>Price per night</h3><span class="small b num" id="plabel">${inr(S.price[0])} – ${inr(S.price[1])}${S.price[1] >= 20000 ? '+' : ''}</span></div>
  <div class="card p stack">${hist()}<div class="range2"><span class="track"></span><span class="fill" id="pfill" style="left:${(S.price[0] - 1000) / 190}%;right:${100 - (S.price[1] - 1000) / 190}%"></span>
    <input type="range" min="1000" max="20000" step="500" value="${S.price[0]}" data-in="price" data-k="0" aria-label="Min price"><input type="range" min="1000" max="20000" step="500" value="${S.price[1]}" data-in="price" data-k="1" aria-label="Max price"></div></div>
  <div class="sh"><h3>Property type</h3></div><div class="chips wrap">${['Hotel', 'Resort', 'Villa', 'Homestay', 'Boutique', 'Cottage', 'Heritage'].map(v => chipTog('ptype', v)).join('')}</div>
  <div class="sh"><h3>Star rating</h3></div><div class="chips wrap">${['3', '4', '5'].map(v => chipTog('fstars', v + '★')).join('')}</div>
  <div class="sh"><h3>Guest rating</h3></div>${seg('grate', ['Any', '4.0+', '4.5+'], S.grate)}
  <div class="sh"><h3>Amenities</h3></div>
  <div class="list">${[['Pool', 'pool'], ['Free WiFi', 'wifi'], ['Breakfast', 'cup'], ['Spa', 'leaf'], ['Parking', 'car'], ['AC', 'snow'], ['Gym', 'gym']].map(([v, i]) => `<button class="li${on(S.amen.has(v))}" data-a="tog" data-k="amen" data-v="${v}"><span class="ico violet">${ic(i)}</span><span class="t"><b>${v}</b></span><span class="cbox">${ic('check')}</span></button>`).join('')}</div>
  <div class="sh"><h3>Couples & booking</h3></div>
  <div class="list">${[['Couple-friendly', 'heart', 'rose', 'Unmarried couples welcome'], ['Local ID accepted', 'user', 'violet', 'Same-city ID accepted'], ['Free cancellation', 'shield', 'ok', 'Full refund before check-in'], ['Pay at hotel', 'bank', 'gold', 'Nothing to pay now']].map(([v, i, t, s]) =>
    liStatic(i, t, v, s, `<label class="sw"><input type="checkbox" data-a="tog" data-k="fsel" data-v="${v}" ${S.fsel.has(v) ? 'checked' : ''} aria-label="${v}"><i></i></label>`)).join('')}</div>
  </div><div class="foot"><button class="btn line auto" data-a="resetFilters">Reset</button><button class="btn full" data-back>Show ${Math.max(12, 128 - (S.fsel.size + S.amen.size + S.ptype.size + S.fstars.size) * 9)} stays</button></div>`;

/* ---------- hotel detail ---------- */
SC.hotel = () => { const h = HOT[S.hotel], q = quote(); const goa = h.city === 'Goa'; return `<div class="vs footed" style="padding:0 0 112px;gap:0">
  <div class="hero"><img src="${im(h.img[S.photo % h.img.length])}" alt="${esc(h.name)}">
    <div class="tools"><button class="ib glass" data-back aria-label="Back">${ic('back')}</button><div><button class="ib glass" data-a="sheet" data-v="share" aria-label="Share">${ic('share')}</button>${favBtn(h)}</div></div>
    <div class="thumbs">${h.img.slice(0, 4).map((p, k) => `<button class="${on(k === S.photo)}" data-a="set" data-k="photo" data-v="${k}" data-num aria-label="Photo ${k + 1}"><img src="${im(p)}" alt=""></button>`).join('')}</div>
    <button class="gchip cnt" data-go="gallery">${ic('image')}${h.img.length * 4} photos</button></div>
  <div class="sheetbody">
    <div><span class="badge violet">${h.type}</span><h2 class="title-l" style="margin-top:8px">${h.name}</h2><div class="row small muted" style="margin-top:6px">${ic('pin')}${h.area} · ${h.dist}</div></div>
    <div class="row" style="flex-wrap:wrap;gap:8px"><button class="badge gold" data-go="reviews">${ic('star', 'f')}${h.rating} · ${h.reviews} reviews</button>${h.tags.map(t => `<span class="badge ${t === 'Couple-friendly' ? 'rose' : t.includes('cancel') ? 'ok' : ''}">${t}</span>`).join('')}</div>
    ${goa ? `<button class="card violet p row" style="text-align:left" data-tab="discover"><span class="avs">${['ananya', 'meera', 'kavya'].map(p => `<img src="${im(p)}" alt="">`).join('')}</span><span class="grow small"><b style="display:block;font-size:14px">3 of your matches saved this</b><span class="muted">Going to Goa on the same dates</span></span>${ic('right')}</button>` : ''}
    ${helperTeaser(h.area.split(',')[0])}
    <div class="sh"><h3>Amenities</h3><button data-a="toast" data-v="24 amenities (demo)">See all 24</button></div>
    <div class="amen">${[['pool', 'Pool'], ['sun', 'Sea view'], ['cup', 'Breakfast'], ['leaf', 'Spa'], ['wifi', 'Free WiFi'], ['car', 'Parking'], ['snow', 'AC'], ['gym', 'Gym']].map(([i, t]) => `<span>${ic(i)}${t}</span>`).join('')}</div>
    <div class="sh"><h3>About</h3></div>
    <div><p class="readmore${S.aboutOpen ? ' open' : ''}">${h.name} is an adults-friendly ${h.type.toLowerCase()} in ${h.area}. Every room has a sunset view, and the infinity pool looks straight out to sea. Expect poolside Goan dinners, a morning yoga deck and live acoustic music on weekends. Couples get honeymoon decor, private candle-lit dinners and late check-out when available. The front desk is open 24x7, and airport pickup is one tap away.</p>
    <button class="link small" data-a="tog1" data-k="aboutOpen">${S.aboutOpen ? 'Show less' : 'Read more'}</button></div>
    <div class="sh"><h3>Rooms</h3><button data-go="rooms">3 types</button></div>
    ${roomsOf(h).slice(0, 2).map(r => `<div class="mini" role="link" tabindex="0" data-go="rooms" data-s="room=${r.id}"><img src="${im(r.img)}" alt=""><div class="t"><b>${r.name}</b><small>${r.size} m² · ${r.bed} · ${r.view}</small></div><span class="b num">${inr(r.price)}</span></div>`).join('')}
    <div class="sh"><h3>Reviews</h3><button data-go="reviews">See all ${h.reviews}</button></div>
    <div class="score"><div class="big"><span><b>${h.rating}</b><small>Excellent</small></span></div><div class="bars">${[['Cleanliness', 4.9], ['Location', 4.8], ['Staff', 4.7], ['Value', 4.5]].map(([k, v]) => `<div class="bar"><span>${k}</span><i style="--w:${(v / 5) * 100}%"></i><b>${v}</b></div>`).join('')}</div></div>
    ${reviewCard(REVIEWS[0], 0)}
    <div class="sh"><h3>Location</h3><button data-a="toast" data-v="Google Maps khulega (demo)">Directions</button></div>
    <div class="minimap">${mapSvg()}<span class="me">${ic('bed')}</span></div>
    <div class="list">${liStatic('sun', 'gold', 'Vagator Beach', '5 min walk', '<span class="val">400 m</span>')}${liStatic('flag', 'violet', 'Chapora Fort', 'Sunset point', '<span class="val">1.2 km</span>')}${liStatic('plane', 'rose', 'Mopa Airport (GOX)', 'Airport pickup available', '<span class="val">32 km</span>')}</div>
    <div class="sh"><h3>House rules</h3></div>
    <div class="policy"><div><small>Check-in</small><b>From 2:00 PM</b></div><div><small>Check-out</small><b>Until 11:00 AM</b></div><div><small>Couples</small><b>Welcome · Local ID OK</b></div><div><small>ID proof</small><b>Aadhaar / passport</b></div></div>
    <div class="applied">${ic('shield')}Free cancellation until ${dshort(Math.max(0, S.ci - 2))} · 1 night charged after that</div>
    <div class="list">${li('chat', 'violet', 'Chat with the hotel', 'Usually replies in 10 min', ic('right'), 'data-a="toast" data-v="Opens hotel chat (demo)"')}</div>
  </div></div>
  <div class="foot"><div class="grow"><strong>${inr(q.r.price)}</strong> <span class="muted small">/ night</span><small>${datesLabel()} · ${nights()} nights</small></div><button class="btn" data-go="rooms">Choose room</button></div>`; };

const reviewCard = (r, k) => `<div class="review"><div class="row">${avatarTxt(r[0], k)}<div class="grow"><b style="font-size:14px">${r[0]}</b><div class="small muted">${r[1]}</div></div><div class="stars">${Array.from({ length: 5 }, (_, s) => ic('star', 'f' + (s < r[2] ? '' : ' faint'))).join('')}</div></div>
  <p>${r[3]}</p><button class="chip soft" style="align-self:flex-start" data-a="tog" data-k="helpful" data-v="${k}">${ic('check')}Helpful · ${r[5] + (S.helpful.has(String(k)) ? 1 : 0)}</button></div>`;

SC.gallery = () => { const h = HOT[S.hotel]; const pics = [...h.img, 'room-classic', 'room-premium', 'room-suite', 'pool-deck', 'dinner', 'sea-deck']; return `<div class="vs">${abar('Photos', { sub: `${h.name} · ${h.img.length * 4} photos` })}
  <div class="chips">${['All', 'Rooms', 'Pool', 'Dining', 'Views'].map(v => `<button class="chip${on(S.galCat === v)}" data-a="set" data-k="galCat" data-v="${v}">${v}</button>`).join('')}</div>
  <div class="galgrid">${pics.map((p, k) => `<img class="${k % 5 === 0 ? 'w' : ''}" src="${im(p)}" alt="" loading="lazy">`).join('')}</div></div>`; };

SC.reviews = () => { const h = HOT[S.hotel]; return `<div class="vs">${abar('Reviews', { sub: `${h.reviews} verified stays` })}
  <div class="score"><div class="big"><span><b>${h.rating}</b><small>Excellent</small></span></div><div class="bars">${[['Cleanliness', 4.9], ['Location', 4.8], ['Staff', 4.7], ['Value', 4.5], ['Couples', 4.9]].map(([k, v]) => `<div class="bar"><span>${k}</span><i style="--w:${(v / 5) * 100}%"></i><b>${v}</b></div>`).join('')}</div></div>
  <div class="chips">${['All', 'Couples', 'Family', 'Solo', 'Friends', 'With photos'].map(v => `<button class="chip${on(S.revFilter === v)}" data-a="set" data-k="revFilter" data-v="${v}">${v}</button>`).join('')}</div>
  ${REVIEWS.filter(r => S.revFilter === 'All' || S.revFilter === 'With photos' || r[1].startsWith(S.revFilter.replace(/s$/, ''))).map((r, k) => reviewCard(r, k)).join('') || '<p class="sub">No reviews for this filter yet.</p>'}</div>`; };

SC.rooms = () => { const h = HOT[S.hotel]; return `<div class="vs footed">${abar('Choose room', { sub: `${datesLabel()} · ${guestsLabel()}` })}
  ${roomsOf(h).map(r => `<div class="room${on(S.room === r.id)}"><img src="${im(r.img)}" alt="${r.name}"><div class="bd">
    <div class="row between"><h4>${r.name}</h4>${r.left <= 2 ? `<span class="left">Only ${r.left} left</span>` : ''}</div>
    <div class="feat"><span>${ic('ruler')}${r.size} m²</span><span>${ic('bed')}${r.bed}</span><span>${ic('sun')}${r.view}</span><span>${ic('users')}Max 3</span></div>
    ${Object.entries(MEALS).map(([k, [t, add]]) => `<button class="plan${on(S.room === r.id && S.meal === k)}" data-a="pickRoom" data-r="${r.id}" data-m="${k}"><span class="radio${on(S.room === r.id && S.meal === k)}"></span><span class="t"><b>${t}</b><small>${k === 'ro' ? 'Free cancellation' : k === 'bf' ? 'Buffet breakfast for 2' : 'Breakfast + 3-course dinner'}</small></span><b class="num">${inr(r.price + add)}</b></button>`).join('')}
  </div></div>`).join('')}
  </div><div class="foot"><div class="grow"><strong>${inr(quote().base)}</strong><small>${nights()} nights · ${S.g.rooms} room · excl. taxes</small></div><button class="btn" data-go="checkout">Continue</button></div>`; };

/* ---------- booking ---------- */
SC.checkout = () => { const q = quote(); return `<div class="vs footed">${abar('Review & pay')}
  <div class="sumcard"><img src="${im(q.h.img[0])}" alt=""><div class="t"><b class="ell">${q.h.name}</b><span class="small muted">${q.r.name} · ${MEALS[S.meal][0]}</span>
    <span class="small b">${dlabel(S.ci)} → ${dlabel(S.co ?? S.ci + 1)}</span><span class="small muted">${q.n} nights · ${guestsLabel()}</span></div><button class="link small" data-back>Edit</button></div>
  <div class="sh"><h3>Guest details</h3></div>
  <div class="field"><label for="gn">Full name (as on ID)</label><div class="inp"><input id="gn" value="Rahul Sharma" autocomplete="name"></div></div>
  <div class="two"><div class="field"><label for="gp">Mobile</label><div class="inp"><input id="gp" value="98765 43210" inputmode="tel"></div></div>
  <div class="field"><label for="ge">Email</label><div class="inp"><input id="ge" value="rahul.s@example.com" type="email"></div></div></div>
  <div class="list">${liStatic('users', 'violet', 'Booking for someone else', 'Their name is needed at check-in', sw('other', S.other, 'Booking for someone else'))}</div>
  <div class="sh"><h3>Special requests</h3><span class="small faint">We'll pass these to the hotel</span></div>
  <div class="chips wrap">${['Early check-in', 'Late check-out', 'Honeymoon decor', 'Airport pickup', 'Extra pillows', 'High floor'].map(v => chipTog('req', v)).join('')}</div>
  <div class="sh"><h3>Offers</h3><button data-go="offers">All offers</button></div>
  ${S.coupon ? `<div class="applied">${ic('tag')}<span class="grow">SANJH20 applied · you save ${inr(q.disc)}</span><button class="link small" data-a="tog1" data-k="coupon">Remove</button></div>`
    : `<div class="coupon"><div class="inp"><input id="cp" placeholder="Coupon code" value="SANJH20" aria-label="Coupon code"></div><button class="btn auto sm" style="padding:0 18px" data-a="applyCoupon">Apply</button></div>`}
  <div class="list">${liStatic('coins', 'gold', 'Use 250 Sanjh Coins', `Balance: ${S.coinsBal.toLocaleString('en-IN')} coins`, sw('coins', S.coins, 'Use coins'))}
  ${liStatic('users', 'rose', 'Split with Ananya', S.split ? `Your share ${inr(q.share)} · we'll send her a request` : 'Split 50/50 right in the app', sw('split', S.split, 'Split payment'))}</div>
  <div class="sh"><h3>Price details</h3></div>
  <div class="card p"><div class="kv"><span>${inr(q.per)} × ${q.n} nights${S.g.rooms > 1 ? ` × ${S.g.rooms}` : ''}</span><span>${inr(q.base)}</span></div>
    ${q.disc ? `<div class="kv green"><span>Coupon (SANJH20)</span><span>− ${inr(q.disc)}</span></div>` : ''}
    ${q.coins ? `<div class="kv green"><span>Sanjh Coins</span><span>− ${inr(q.coins)}</span></div>` : ''}
    <div class="kv"><span>Taxes & fees (GST)</span><span>${inr(q.tax)}</span></div>
    <div class="kv total"><span>Total</span><span>${inr(q.total)}</span></div>
    ${S.split ? `<div class="kv"><span>Your share (50%)</span><span>${inr(q.share)}</span></div>` : ''}</div>
  <div class="row small muted">${ic('shield')}<span>Free cancellation until ${dshort(Math.max(0, S.ci - 2))}, 11:59 PM. After that, 1 night is charged.</span></div>
  </div><div class="foot"><div class="grow"><strong>${inr(S.split ? q.share : q.total)}</strong><small>${S.split ? 'Your share' : 'Total incl. taxes'}</small></div><button class="btn" data-go="payment">Pay</button></div>`; };

const UPI = [['gpay', 'GPay', '#1A73E8', 'G'], ['phonepe', 'PhonePe', '#5F259F', 'Pe'], ['paytm', 'Paytm', '#00B9F1', 'P'], ['bhim', 'BHIM', '#F37021', 'B']];
SC.payment = () => { const q = quote(), amt = S.split ? q.share : q.total; return `<div class="vs footed">${abar('Payment', { sub: 'Secure · 256-bit encrypted' })}
  <div class="card p row between"><div><span class="small muted b">Pay to ${q.h.name}</span><div style="font-size:30px;font-weight:800;letter-spacing:-.03em" class="num">${inr(amt)}</div></div><span class="badge warn">${ic('clock')}09:42</span></div>
  <div class="sh"><h3>UPI</h3><span class="badge ok">Fastest</span></div>
  <div class="upis">${UPI.map(([k, n, c, l]) => `<button class="${on(S.pay === k)}" data-a="set" data-k="pay" data-v="${k}"><span class="lg" style="background:${c}">${l}</span>${n}</button>`).join('')}</div>
  <div class="inp">${ic('send')}<input id="upi" placeholder="UPI ID, e.g. name@okaxis" value="rahul@okaxis" aria-label="UPI ID"><button class="link small" data-a="toast" data-v="UPI ID verified: Rahul Sharma">Verify</button></div>
  <div class="sh"><h3>Cards</h3></div>
  <button class="opt${on(S.pay === 'card')}" data-a="set" data-k="pay" data-v="card"><span class="radio"></span><span class="t"><b>HDFC Bank •••• 4821</b><small>Credit card · expires 08/29</small></span>${ic('card')}</button>
  ${S.pay === 'card' ? `<div class="ccard"><small>Sanjh Platinum card</small><b>4821 •••• •••• 4821</b><div class="row between"><small>Rahul Sharma</small><small>08/29</small></div></div><div class="inp"><input id="cvv" placeholder="CVV" inputmode="numeric" maxlength="3" aria-label="CVV"></div>` : ''}
  <div class="list">${li('plus', 'violet', 'Add a new card', 'Visa, Mastercard, RuPay, Amex')}</div>
  <div class="sh"><h3>More options</h3></div>
  <div class="list">${[['netbank', 'bank', 'Net banking', 'All major banks'], ['wallet', 'coins', 'Wallets', 'Amazon Pay, Mobikwik'], ['emi', 'card', 'No-cost EMI', 'On bookings above ₹3,000'], ['hotel', 'home', 'Pay at hotel', '₹0 now · pay at check-in']].map(([k, i, t, s]) => `<button class="li${on(S.pay === k)}" data-a="set" data-k="pay" data-v="${k}"><span class="ico">${ic(i)}</span><span class="t"><b>${t}</b><small>${s}</small></span><span class="radio${on(S.pay === k)}"></span></button>`).join('')}</div>
  </div><div class="foot"><button class="btn full" data-a="payNow">${ic('lock')}${S.pay === 'hotel' ? 'Confirm booking' : `Pay ${inr(amt)}`}</button></div>`; };

SC.processing = () => `<div class="center-col"><div class="spinner"></div><h2 class="title-l">Processing payment…</h2><p class="sub">Please don't go back or refresh. This takes a few seconds.</p></div>`;

const qr = seed => { let s = seed, out = ''; for (let k = 0; k < 225; k++) { s = (s * 9301 + 49297) % 233280; const r = Math.floor(k / 15), c = k % 15; const finder = (r < 4 && c < 4) || (r < 4 && c > 10) || (r > 10 && c < 4); const ring = finder && (r % 15 === 0 || c % 15 === 0 || r === 3 || c === 3 || c === 11 || r === 11 || c === 14 || r === 14 || (r > 0 && r < 3 && c > 0 && c < 3) || (r > 0 && r < 3 && c > 11 && c < 14) || (r > 11 && r < 14 && c > 0 && c < 3)); out += `<i class="${finder ? (ring ? '' : 'o') : (s / 233280 > .5 ? '' : 'o')}"></i>`; } return `<div class="qr" aria-label="Check-in QR code">${out}</div>`; };
SC.success = () => { const b = S.bookings.find(x => x.id === S.trip) || S.bookings[0]; const h = HOT[b.h];
  const colors = ['#E11D64', '#6D3BEA', '#FFB938', '#FF6B95', '#4F8BFF'];
  return `<div class="confetti">${Array.from({ length: 36 }, (_, k) => `<i style="left:${(k * 29) % 100}%;background:${colors[k % 5]};animation-delay:${(k % 9) * 0.12}s;animation-duration:${2 + (k % 5) * 0.3}s"></i>`).join('')}</div>
  <div class="vs" style="align-items:center;text-align:center">
  <div class="okmark" style="margin-top:20px">${ic('check')}</div><h2 class="title-l">Booking confirmed!</h2>
  <p class="sub">Booking ID <b style="color:var(--ink)">${b.id}</b> · sent by SMS and email</p>
  <div class="ticket"><img src="${im(h.img[0])}" alt=""><div class="bd"><b style="font-size:16px">${h.name}</b>
    <div class="row between small"><div><span class="muted b">CHECK-IN</span><br><b>${dlabel(b.ci)}</b></div><span class="badge">${b.co - b.ci}N</span><div style="text-align:right"><span class="muted b">CHECK-OUT</span><br><b>${dlabel(b.co)}</b></div></div>
    <span class="small muted">${b.room} · ${b.meal} · ${b.guests}</span></div><div class="cut"></div>
    <div class="bd row">${qr(b.id.length * 977 + 13)}<span class="small muted" style="text-align:left">Show this QR at reception for a 2-minute check-in.</span></div></div>
  <div style="width:100%;text-align:left">${helperTeaser(h.area.split(',')[0], `data-s="hotel=${b.h}"`)}</div>
  <button class="btn" data-a="openTrip" data-v="${b.id}">View booking</button>
  <div class="two" style="width:100%"><button class="btn line" data-a="shareToChat" data-v="${b.h}">${ic('share')}Share</button><button class="btn line" data-a="toast" data-v="Added to calendar">${ic('cal')}Calendar</button></div>
  <button class="link small" data-tab="home">Go to home</button></div>`; };

/* ---------- trips ---------- */
const tripDates = b => b.lab || [dlabel(b.ci), dlabel(b.co)];
const statusBadge = b => b.status === 'up' ? `<span class="badge ok">${ic('check')}Confirmed</span>` : b.status === 'done' ? `<span class="badge violet">${ic('check')}Completed</span>` : `<span class="badge bad">${ic('x')}Cancelled</span>`;
SC.trips = () => { const tabs = { up: 'Upcoming', done: 'Completed', cancel: 'Cancelled' }; const list = S.bookings.filter(b => b.status === S.tripsTab); return `<div class="vs tabbed">
  ${abar('My trips', { noBack: 1, right: `<button class="ib" data-go="wishlist" aria-label="Wishlist">${ic('heart')}</button>` })}
  <div class="seg">${Object.entries(tabs).map(([k, v]) => `<button class="${on(S.tripsTab === k)}" data-a="set" data-k="tripsTab" data-v="${k}">${v} (${S.bookings.filter(b => b.status === k).length})</button>`).join('')}</div>
  ${list.map(b => { const h = HOT[b.h], [a, z] = tripDates(b); return `<div class="tcard" role="link" tabindex="0" data-a="openTrip" data-v="${b.id}">
    <div class="top"><img src="${im(h.img[0])}" alt=""><div class="grow stack" style="gap:4px"><div class="row between">${statusBadge(b)}<span class="small faint b">${b.id}</span></div><b style="font-size:15px">${h.name}</b><span class="small muted">${h.area}</span></div></div>
    <div class="dates"><div><small>Check-in</small><b>${a}</b></div><span class="n">${b.ci != null ? b.co - b.ci : 2}N</span><div style="text-align:right"><small>Check-out</small><b>${z}</b></div></div>
    ${b.status === 'up' ? `<div class="row between" style="padding:12px 14px"><span class="small b" style="color:var(--rose-text)">${b.ci + 5} days to go</span><span class="small muted">${inr(b.paid)} paid</span></div>` : ''}
    ${b.status === 'done' ? `<div style="padding:12px 14px">${b.reviewed ? '<span class="small muted">Review posted · +50 coins earned</span>' : `<button class="btn sm soft" data-a="writeReview" data-v="${b.id}">${ic('star')}Write a review, earn 50 coins</button>`}</div>` : ''}
    ${b.status === 'cancel' ? `<div style="padding:12px 14px"><span class="small b" style="color:var(--ok)">Refund of ${inr(b.paid)} credited</span></div>` : ''}
  </div>`; }).join('') || `<div class="center-col"><span class="okmark" style="background:var(--surface-2);color:var(--muted);box-shadow:none">${ic('trips')}</span><b>Nothing here yet</b><button class="btn auto" data-tab="home">Find a stay</button></div>`}
  ${S.tripsTab === 'up' ? `<button class="fusion" data-go="plan"><span class="avs"><img src="${im('rahul')}" alt=""><img src="${im('ananya')}" alt=""></span><span class="grow"><b>Goa trip with Ananya</b><small>13–14 Dec · hotel vote pending</small></span>${ic('right')}</button>` : ''}
  </div>${dock('trips')}`; };

SC.trip = () => { const b = S.bookings.find(x => x.id === S.trip) || S.bookings[0], h = HOT[b.h], [a, z] = tripDates(b); return `<div class="vs" style="padding:0 0 30px;gap:0">
  <div class="hero" style="height:250px"><img src="${im(h.img[0])}" alt=""><div class="tools"><button class="ib glass" data-back aria-label="Back">${ic('back')}</button><button class="ib glass" data-a="sheet" data-v="share" aria-label="Share">${ic('share')}</button></div></div>
  <div class="sheetbody">
    <div class="row between">${statusBadge(b)}<button class="badge" data-a="copy" data-v="${b.id}">${ic('copy')}${b.id}</button></div>
    <h2 class="title-l">${h.name}</h2>
    <div class="tcard"><div class="dates"><div><small>Check-in · 2 PM</small><b>${a}</b></div><span class="n">${b.ci != null ? b.co - b.ci : 2}N</span><div style="text-align:right"><small>Check-out · 11 AM</small><b>${z}</b></div></div></div>
    ${b.status === 'up' ? `<div class="card p row">${qr(b.id.length * 977 + 13)}<div class="stack" style="gap:4px"><b>QR check-in</b><span class="small muted">Show it at reception. Bring your ID.</span><button class="link small" style="text-align:left" data-a="toast" data-v="QR saved to your phone">Save QR</button></div></div>` : ''}
    <div class="actgrid">${[['dir', 'Directions', 'Opens Maps (demo)'], ['phone', 'Call', 'Hotel: +91 832 000 0000'], ['chat', 'Chat', 'Hotel chat (demo)'], ['download', 'Invoice', 'Invoice downloaded']].map(([i, t, m]) => `<button data-a="toast" data-v="${m}">${ic(i)}${t}</button>`).join('')}</div>
    <div class="list">${liStatic('bed', 'violet', b.room, b.meal)}${liStatic('users', '', 'Guests', b.guests)}${liStatic('card', 'ok', `${inr(b.paid)} paid`, b.via)}${liStatic('heart', 'rose', 'Shared with Ananya', 'She can see this booking too')}</div>
    ${b.status === 'up' ? `<div class="list">${li('users', 'rose', 'Local helpers', Object.keys(S.hbooked).length ? Object.entries(S.hbooked).map(([id, v]) => `${HELPERS.find(y => y.id === id).name.split(' ')[0]} · ${dshort(v.day)}`).join(', ') : `${HELPERS.length} available${S.helpersUnlocked ? '' : ` · ${inr(HELPER_UNLOCK_PRICE)} to unlock`}`, ic('right'), `data-go="helpers" data-s="hotel=${b.h}"`)}${li('cal', '', 'Change dates', 'Same price, subject to availability', ic('right'), 'data-go="dates"')}${li('help', '', 'Need help?', '24x7 support', ic('right'), 'data-go="help"')}</div>
    <button class="btn danger" data-a="sheet" data-v="cancel">${ic('x')}Cancel booking</button>` : ''}
  </div></div>`; };

SC.review = () => { const b = S.bookings.find(x => x.id === S.reviewFor) || S.bookings[1], h = HOT[b.h]; const labels = ['How was it?', 'Poor', 'Okay', 'Good', 'Very good', 'Excellent!']; return `<div class="vs footed">${abar('Write a review', { sub: h.name })}
  ${mini(h, `${tripDates(b).join(' → ')}`)}
  <div class="card p stack" style="align-items:center;text-align:center"><b>Overall stay</b><div class="starpick">${[1, 2, 3, 4, 5].map(n => `<button class="${on(n <= S.stars)}" data-a="set" data-k="stars" data-v="${n}" data-num aria-label="${n} star">${ic('star')}</button>`).join('')}</div><span class="b" style="color:var(--rose-text)">${labels[S.stars]}</span></div>
  <div class="list">${['Cleanliness', 'Staff', 'Location', 'Value for money'].map(c => `<div class="li"><span class="t"><b>${c}</b></span><div class="smallstars">${[1, 2, 3, 4, 5].map(n => `<button class="${on(n <= (S.rv[c] || 0))}" data-a="rv" data-k="${c}" data-v="${n}" aria-label="${c} ${n}">${ic('star')}</button>`).join('')}</div></div>`).join('')}</div>
  <div class="sh"><h3>What did you like?</h3></div>
  <div class="chips wrap">${['Clean rooms', 'Great view', 'Friendly staff', 'Tasty food', 'Couple-friendly', 'Quiet', 'Value for money'].map(v => chipTog('rvTags', v)).join('')}</div>
  <div class="field"><label for="rvt">Describe your stay</label><div class="inp"><textarea id="rvt" placeholder="Rooms, staff, food, location… help other travellers"></textarea></div></div>
  <div class="photos6" style="grid-template-columns:repeat(4,1fr)">${[0, 1, 2, 3].map(k => k === 0 ? `<div><img src="${im(h.img[1] || h.img[0])}" alt=""></div>` : `<button data-a="toast" data-v="Photo picker (demo)" aria-label="Add photo">${ic('camera')}</button>`).join('')}</div>
  <div class="list">${liStatic('eyeoff', '', 'Post anonymously', 'Only your initials are shown', `<label class="sw"><input type="checkbox" aria-label="Anonymous"><i></i></label>`)}</div>
  </div><div class="foot"><button class="btn full" data-a="submitReview" ${S.stars ? '' : 'disabled'}>Post review · +50 coins</button></div>`; };

SC.wishlist = () => { const saved = [...S.wish].map(id => HOT[id]); return `<div class="vs">${abar('Wishlist', { right: `<button class="ib" data-a="toast" data-v="Nayi collection bani" aria-label="New collection">${ic('plus')}</button>` })}
  <div class="coll">${[['Goa with Ananya', ['goa-pool', 'dusk-palms', 'sea-deck'], 3], ['Honeymoon ideas', ['resort-night', 'room-suite', 'pool-deck'], 5], ['Weekend getaways', ['mountains', 'hill-deck', 'lake'], 4], ['Heritage stays', ['jaipur', 'jaisalmer', 'agra'], 6]].map(([n, imgs, c]) =>
    `<button data-go="results"><span class="cover">${imgs.map(i => `<img src="${im(i)}" alt="">`).join('')}</span><b>${n}</b><span class="small muted">${c} saved${n.includes('Ananya') ? ' · shared' : ''}</span></button>`).join('')}</div>
  <div class="sh"><h3>All saved (${saved.length})</h3></div>
  ${saved.map(h => `<div class="row">${mini(h)}${favBtn(h, '')}</div>`).join('') || '<p class="sub">No saved hotels yet. Tap ❤ to save one.</p>'}</div>`; };

SC.offers = () => `<div class="vs">${abar('Offers & coupons')}
  <div class="chips">${['All', 'Hotels', 'Premium', 'Bank offers'].map(v => `<button class="chip${on(S.offerTab === v)}" data-a="set" data-k="offerTab" data-v="${v}">${v}</button>`).join('')}</div>
  ${[['20%', 'OFF', 'SANJH20', '20% off couple stays', 'Up to ₹1,500 · till 31 Dec', 'Hotels'], ['₹500', 'FLAT', 'FIRSTSTAY', 'Flat ₹500 off your first booking', 'On bookings above ₹3,000', 'Hotels'], ['10%', 'BANK', 'HDFC10', 'Extra 10% off with HDFC cards', 'Up to ₹1,000 · every Friday', 'Bank offers'], ['50%', 'OFF', 'GOLD50', 'Half price on your first month of Gold', 'For new members', 'Premium'], ['₹300', 'CASH', 'UPI300', '₹300 cashback when you pay by UPI', 'On bookings above ₹5,000', 'Bank offers']]
    .filter(o => S.offerTab === 'All' || o[5] === S.offerTab).map(([a, b, code, t, s]) => `<div class="coupon-card"><div class="l"><span>${a}<small>${b}</small></span></div><div class="r"><b>${t}</b><span class="small muted">${s}</span><button class="code" data-a="copy" data-v="${code}">${code}${ic('copy')}</button></div></div>`).join('')}
  <div class="card rose p row">${ic('gift')}<span class="small"><b>Refer & earn:</b> invite a friend and you both get ₹500 in coins. <button class="link" data-go="wallet">See code</button></span></div></div>`;

SC.notifications = () => { const N = [
  ['Today', 'ok', 'check', 'Booking confirmed', 'Rang Mahal Haveli · 24–26 Jan', '2m', 'trips', 'Bookings'],
  ['Today', 'img', 'ananya', 'New message from Ananya', '"Sunset at Chapora Fort? 🌅"', '18m', 'chat', 'Dating'],
  ['Today', 'img', 'meera', 'New match: Meera', "She's in Goa 12–14 Dec too", '1h', 'matches', 'Dating'],
  ['Today', 'gold', 'tag', 'Price drop', 'Azure Bay Villas is now ₹11,200 (was ₹13,800)', '3h', 'hotel', 'Bookings'],
  ['Earlier', 'img', 'kavya', 'Kavya liked your prompt', '"My perfect weekend…"', '1d', 'likes', 'Dating'],
  ['Earlier', 'violet', 'star', 'Write a review, earn 50 coins', 'How was Cloudline Hill Stay?', '2d', 'trips', 'Bookings'],
  ['Earlier', 'rose', 'shield', 'Safety tip', 'Always meet somewhere public for a first date', '3d', 'safety', 'All'],
].filter(n => S.notifTab === 'All' || n[7] === S.notifTab || n[7] === 'All');
  let last = ''; return `<div class="vs">${abar('Notifications', { right: '<button class="link small" data-a="readAll">Mark all read</button>' })}
  ${seg('notifTab', ['All', 'Bookings', 'Dating'], S.notifTab)}
  <div>${N.map(([g, tone, i, t, s, tm, go]) => { const head = g !== last ? `<div class="small faint b" style="padding:14px 4px 4px;text-transform:uppercase;letter-spacing:.08em">${g}</div>` : ''; last = g;
    return head + `<button class="notif${S.readAll || g === 'Earlier' ? '' : ' isnew'}" style="width:100%;text-align:left" ${TABS.includes(go) ? `data-tab="${go}"` : go === 'hotel' ? 'data-go="hotel" data-s="hotel=azure"' : `data-go="${go}"`}>${tone === 'img' ? `<img class="av" src="${im(i)}" alt="">` : `<span class="nico badge ${tone}" style="border-radius:50%">${ic(i)}</span>`}<span class="t"><b>${t}</b><br><span class="muted">${s}</span><small>${tm} ago</small></span></button>`; }).join('')}</div></div>`; };

/* ---------- dating ---------- */
const pcard = (p, top) => `<div class="pcard ${top ? 'top' : 'under'}" ${top ? `data-pid="${p.id}"` : 'aria-hidden="true"'}>
  <img src="${im(p.img)}" alt="${top ? esc(p.name) : ''}">
  ${top ? `<span class="stamp like">LIKE</span><span class="stamp nope">NOPE</span>` : ''}
  <span class="gchip tm">${ic('star', 'f')}${p.match}% trip match</span>
  <div class="pinfo"><h4>${p.name}, ${p.age}<span class="vb">${ic('check')}</span></h4><span class="wh">${ic('pin')}${p.city} · ${p.km} km away · ${p.job}</span>
    <span class="trip">${ic('plane')}${p.trip}</span><div class="chips wrap">${p.tags.slice(0, 3).map(t => `<span class="gchip">${t}</span>`).join('')}</div>
    ${top ? `<button class="info-btn" data-go="person" data-s="person=${p.id}" aria-label="Full profile">${ic('info')}</button>` : ''}</div></div>`;
SC.discover = () => { const p = PPL[DECK[S.deck]], nx = PPL[DECK[S.deck + 1]]; return `<div class="vs tabbed" style="gap:12px">
  <div class="abar"><h2 style="font-size:26px;letter-spacing:-.04em">Discover<small>${S.df.travel ? 'In Goa on your dates' : 'Near you'}</small></h2>
    <button class="ib" data-go="likes" aria-label="Likes you">${ic('heart')}<span class="dot"></span></button><button class="ib" data-go="dfilters" aria-label="Filters">${ic('sliders')}</button></div>
  <div class="chips"><button class="chip grad" data-go="dfilters">${ic('plane')}${S.df.travel ? 'Goa · 12–14 Dec' : 'Travel mode off'}</button><span class="chip">${S.df.age[0]}–${S.df.age[1]} yrs</span>${S.df.verified ? `<span class="chip">${ic('check')}Verified</span>` : ''}<span class="chip">${S.df.dist} km</span></div>
  <div class="deck">${p ? (nx ? pcard(nx, false) : '') + pcard(p, true) : `<div class="center-col card" style="height:100%"><span class="okmark">${ic('spark')}</span><h3 class="title-l">That's everyone for today</h3><p class="sub">Change your filters or check back tomorrow. A Boost puts you at the top.</p><button class="btn auto" data-a="resetDeck">Start over</button></div>`}</div>
  <div class="acts">
    <button class="act sm rw" data-a="rewind">${'<i>' + ic('rewind') + '</i>'}Undo</button>
    <button class="act pass" data-a="decide" data-v="pass">${'<i>' + ic('x') + '</i>'}Pass</button>
    <button class="act sup" data-a="decide" data-v="super">${'<i>' + ic('star', 'f') + '</i>'}Super</button>
    <button class="act like" data-a="decide" data-v="like">${'<i>' + ic('heart', 'f') + '</i>'}Like</button>
    <button class="act sm bst" data-a="sheet" data-v="boost">${'<i>' + ic('bolt') + '</i>'}Boost</button></div>
  </div>${dock('discover')}`; };

const range2 = (key, min, max, val, label, unit = '') => `<div class="range2"><span class="track"></span><span class="fill" id="${key}fill" style="left:${(val[0] - min) / (max - min) * 100}%;right:${100 - (val[1] - min) / (max - min) * 100}%"></span>
  <input type="range" min="${min}" max="${max}" value="${val[0]}" data-in="r2" data-key="${key}" data-k="0" aria-label="${label} min"><input type="range" min="${min}" max="${max}" value="${val[1]}" data-in="r2" data-key="${key}" data-k="1" aria-label="${label} max"></div>`;
SC.dfilters = () => `<div class="vs footed">${abar('Dating filters', { right: '<button class="link small" data-a="toast" data-v="Filters reset">Reset</button>' })}
  <div class="card rose p stack"><div class="row"><span class="ico" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--grad);color:#fff">${ic('plane')}</span><div class="grow"><b>Travel mode</b><div class="small muted">Only people who'll be in Goa on 12–14 Dec</div></div>${sw('df.travel', S.df.travel, 'Travel mode')}</div></div>
  <div class="sh"><h3>Age</h3><span class="small b num" id="agelabel">${S.df.age[0]} – ${S.df.age[1]}</span></div><div class="card p">${range2('age', 18, 50, S.df.age, 'Age')}</div>
  <div class="sh"><h3>Distance</h3><span class="small b num" id="distlabel">${S.df.dist} km</span></div><div class="card p"><input type="range" min="1" max="100" value="${S.df.dist}" data-in="dist" aria-label="Distance"></div>
  <div class="sh"><h3>Show me</h3></div>${seg('df.show', ['Women', 'Men', 'Everyone'], S.df.show)}
  <div class="list">${liStatic('check', 'ok', 'Verified profiles only', 'People with a blue tick', sw('df.verified', S.df.verified, 'Verified only'))}</div>
  <div class="sh"><h3>Interests</h3></div><div class="chips wrap">${['Beach sunsets', 'Trekking', 'Live music', 'Cafés', 'Yoga', 'Photography', 'Street food', 'Books'].map(v => chipTog('df.ints', v)).join('')}</div>
  <div class="sh"><h3>Languages</h3></div><div class="chips wrap">${['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali', 'Punjabi', 'Gujarati'].map(v => chipTog('df.langs', v)).join('')}</div>
  <div class="sh"><h3>Advanced filters</h3><span class="badge gold">${ic('crown')}Gold</span></div>
  <div class="list">${[['ruler', 'Height'], ['grad', 'Education'], ['wine', 'Drinking'], ['briefcase', 'Profession'], ['heart', 'Looking for']].map(([i, t]) => li(i, '', t, 'For Gold members', ic('lock'), 'data-go="premium"')).join('')}</div>
  </div><div class="foot"><button class="btn full" data-a="applyDf">Apply filters</button></div>`;

SC.person = () => { const p = PPL[S.person]; return `<div class="vs" style="padding:0 0 120px;gap:0">
  <div class="pgal"><img src="${im(p.img)}" alt="${esc(p.name)}"><div class="tools"><button class="ib glass" data-back aria-label="Back">${ic('back')}</button><button class="ib glass" data-a="sheet" data-v="report" aria-label="More">${ic('more')}</button></div>
    <div class="pinfo"><span class="gchip" style="align-self:flex-start;background:rgba(255,185,56,.24);border-color:rgba(255,185,56,.5);color:#FFD98A">${ic('star', 'f')}${p.match}% trip match</span><h4>${p.name}, ${p.age}<span class="vb">${ic('check')}</span></h4><span class="wh">${ic('pin')}${p.city} · ${p.km} km away</span></div></div>
  <div class="sheetbody" style="margin-top:-24px">
    ${prompt(p, 0)}
    <div class="sh"><h3>Basics</h3></div>
    <div class="basics"><span>${ic('ruler')}${p.h}</span><span>${ic('briefcase')}${p.job}</span><span>${ic('grad')}${p.edu}</span><span>${ic('home')}${p.city}</span><span>${ic('lang')}${p.lang}</span><span>${ic('wine')}Kabhi-kabhi</span><span>${ic('heart')}Long-term</span></div>
    <div class="sh"><h3>Interests</h3><span class="small muted">${p.tags.filter(t => S.df.ints.has(t)).length} common</span></div>
    <div class="chips wrap">${p.tags.map(t => `<span class="chip${S.df.ints.has(t) ? ' grad' : ''}">${t}</span>`).join('')}</div>
    ${prompt(p, 1)}
    <div class="sh"><h3>Upcoming trip</h3></div>
    <div class="dtile" style="height:130px;width:100%"><img src="${im('goa-beach')}" alt=""><span><b>${p.trip}</b><small>${p.trip.includes('Goa') ? '2 days overlap with your dates' : 'Not on your dates'}</small></span></div>
    ${p.saved.length ? `<div class="sh"><h3>Hotels ${p.name} saved</h3></div>${p.saved.map(id => mini(HOT[id], S.wish.has(id) ? 'You saved this too' : `${inr(HOT[id].price)} / night`)).join('')}` : ''}
    <div class="row" style="justify-content:center;gap:18px;padding:8px 0"><button class="link small" data-a="sheet" data-v="report">Report ${p.name}</button><button class="link small" data-a="sheet" data-v="report">Block</button></div>
  </div></div>
  <div class="foot" style="justify-content:center;gap:20px"><button class="act pass" data-a="personDecide" data-v="pass"><i>${ic('x')}</i>Pass</button><button class="act sup" data-a="personDecide" data-v="super"><i>${ic('star', 'f')}</i>Super</button><button class="act like" data-a="personDecide" data-v="like"><i>${ic('heart', 'f')}</i>Like</button></div>`; };
const prompt = (p, k) => `<div class="prompt"><small>${p.prompts[k][0]}</small><p>${p.prompts[k][1]}</p><button class="ib${on(S.promptLiked.has(p.id + k))}" data-a="promptLike" data-v="${p.id + k}" aria-label="Like this prompt">${ic('heart', S.promptLiked.has(p.id + k) ? 'f' : '')}</button></div>`;

SC.match = () => { const p = PPL[S.matchWith]; const both = p.saved.length ? p.saved : ['saagar']; return `<div class="vs" style="gap:16px;padding-bottom:30px">
  <div class="row between"><button class="ib glass" data-a="closeMatch" aria-label="Close">${ic('x')}</button><span class="gchip">New match · ${p.match}% trip match</span></div>
  <div class="pair"><img src="${im(ME.img)}" alt="You"><img src="${im(p.img)}" alt="${esc(p.name)}"><span class="hb">${ic('heart', 'f')}</span></div>
  <h1>It's a match!</h1>
  <p style="margin:0;text-align:center;color:rgba(255,255,255,.8)">You and ${p.name} are both in ${p.trip.split('·')[0]}around <b style="color:#fff">${p.trip.split('·')[1] || ''}</b></p>
  <b style="font-size:15px">Hotels ${p.name} saved</b>
  ${both.map(id => `<button class="glassrow" data-go="hotel" data-s="hotel=${id}"><img src="${im(HOT[id].img[0])}" alt=""><span class="grow"><b style="display:block">${HOT[id].name}</b><small>${inr(HOT[id].price)} / night${S.wish.has(id) ? ' · you saved it too' : ''}</small></span>${rateEl(HOT[id].rating)}</button>`).join('')}
  <div class="quick">${["Hey! What's your plan in Goa? 🌴", 'Want to catch the sunset?', 'Which hotel did you like?'].map(m => `<button data-a="quickMsg" data-v="${esc(m)}">${m}</button>`).join('')}</div>
  <button class="btn" data-go="plan">${ic('plane')}Plan the trip together</button>
  <button class="btn line" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.3)" data-a="openChat" data-v="${p.id}">${ic('chat')}Chat</button></div>`; };

SC.likes = () => { const ids = ['kavya', 'isha', 'sara', 'zoya', 'nida', 'tara']; const top = ['riya', 'meera', 'pooja', 'neha']; return `<div class="vs">${abar('Likes', { sub: S.premium ? 'Gold active' : '12 people like you' })}
  ${seg('likesTab', ['Likes you', 'Top picks'], S.likesTab)}
  ${S.likesTab === 'Likes you' ? `${S.premium ? '' : `<div class="gold-card"><b>See who liked you</b><p>With Gold, see every like and match instantly.</p><button class="btn white sm auto" data-go="premium">${ic('crown')}Get Gold · 50% off</button></div>`}
  <div class="lgrid">${ids.map(id => { const p = PPL[id]; return `<div class="lcard${S.premium ? '' : ' blur'}" role="link" tabindex="0" ${S.premium ? `data-go="person" data-s="person=${id}"` : 'data-go="premium"'}><img src="${im(p.img)}" alt=""><span class="gchip">${ic('plane')}${p.trip.split(' · ')[0]}</span>${S.premium ? `<span class="nm">${p.name}, ${p.age}</span>` : `<span class="lock">${ic('lock')}</span>`}</div>`; }).join('')}</div>`
  : `<p class="sub">Today's 4 best matches based on your interests and trip. New every day.</p><div class="lgrid">${top.map(id => { const p = PPL[id]; return `<div class="lcard" role="link" tabindex="0" data-go="person" data-s="person=${id}"><img src="${im(p.img)}" alt=""><span class="gchip">${ic('spark')}Top pick</span><span class="nm">${p.name}, ${p.age}</span></div>`; }).join('')}</div>`}</div>`; };

/* ---------- chats ---------- */
const lastMsg = id => { const m = (S.chats[id] || []).slice(-1)[0]; if (!m) return 'Say hi 👋'; const pre = m.me ? 'You: ' : ''; return pre + (m.type === 'hotel' ? `🏨 ${HOT[m.h].name}` : m.type === 'voice' ? '🎤 Voice note' : m.type === 'plan' ? '✈️ Trip plan' : m.t); };
SC.matches = () => `<div class="vs tabbed">
  ${abar('Chats', { noBack: 1, right: `<button class="ib" data-go="safety" aria-label="Safety">${ic('shield')}</button>` })}
  <label class="inp" style="min-height:46px">${ic('search')}<input id="cq" placeholder="Search matches" aria-label="Search matches"></label>
  <div class="sh"><h3>New matches</h3><span class="small muted">${S.newMatches.length + 1}</span></div>
  <div class="newm"><button data-go="likes"><span class="likes"><img src="${im('kavya')}" alt=""><b>12</b></span>Likes</button>
    ${S.newMatches.map(id => `<button data-a="openChat" data-v="${id}"><span class="ring"><img src="${im(PPL[id].img)}" alt=""></span>${PPL[id].name}</button>`).join('')}</div>
  <div class="sh"><h3>Messages</h3></div>
  <div>${Object.keys(S.chats).map(id => { const p = PPL[id], u = S.unread[id], m = S.chats[id].slice(-1)[0]; const typing = S.typing === id || id === 'riya';
    return `<button class="conv" data-a="openChat" data-v="${id}"><span class="${p.online ? 'online' : ''}"><img class="av l" src="${im(p.img)}" alt=""></span><span class="t"><b>${p.name}</b><small class="${typing ? 'typing' : ''}">${typing ? 'typing…' : esc(lastMsg(id))}</small></span><span class="r">${m ? m.time : ''}${u ? `<span class="unread">${u}</span>` : (m && !m.me ? '<span class="your-turn">Your turn</span>' : '')}</span></button>`; }).join('')}</div>
  </div>${dock('matches')}`;

const msgEl = m => {
  if (m.type === 'hotel') { const h = HOT[m.h]; return `<div class="msg hotel${m.me ? ' me' : ''}" role="link" tabindex="0" data-go="hotel" data-s="hotel=${h.id}"><img src="${im(h.img[0])}" alt=""><div class="bd"><b>${h.name}</b><span class="small" style="opacity:.8">${inr(h.price)} / night · ★ ${h.rating}</span></div><span class="tm">${m.time}</span></div>`; }
  if (m.type === 'voice') return `<div class="msg voice${m.me ? ' me' : ''}"><button class="ib round" style="width:34px;height:34px" data-a="toast" data-v="Playing voice note (demo)" aria-label="Play">${ic('right')}</button><span class="wave">${[6, 12, 18, 10, 22, 14, 8, 16, 20, 9, 13, 7, 17, 11].map(h => `<i style="height:${h}px"></i>`).join('')}</span><span class="small">${m.dur}</span></div>`;
  if (m.type === 'plan') return `<div class="msg me" role="link" tabindex="0" data-go="plan"><b>✈️ Trip plan sent</b><br>${HOT[S.plan.vote].name} · 13–14 Dec · ${S.plan.rooms} · ${S.plan.split}<span class="tm">${m.time}</span></div>`;
  return `<div class="msg${m.me ? ' me' : ''}">${esc(m.t)}<span class="tm">${m.time}${m.me ? ' · Seen' : ''}</span></div>`;
};
SC.chat = () => { const p = PPL[S.chat], msgs = S.chats[S.chat] || []; return `
  <div class="chathead"><button class="ib ghost" data-back aria-label="Back">${ic('back')}</button>
    <button class="row grow" style="min-width:0" data-go="person" data-s="person=${p.id}"><span class="${p.online ? 'online' : ''}"><img class="av" src="${im(p.img)}" alt=""></span><span class="t"><b>${p.name} <span class="vb" style="width:16px;height:16px">${ic('check')}</span></b><small style="color:${p.online ? 'var(--ok)' : 'var(--muted)'}">${S.typing === p.id ? 'typing…' : p.online ? 'Online' : 'Last seen 2h ago'}</small></span></button>
    <button class="ib ghost" data-go="call" aria-label="Voice call">${ic('phone')}</button><button class="ib ghost" data-go="call" aria-label="Video call">${ic('video')}</button><button class="ib ghost" data-a="sheet" data-v="chatMore" aria-label="More">${ic('more')}</button></div>
  <div class="msgs" id="msgs"><span class="daysep">${msgs.length ? 'Today' : `You matched on 25 Nov`}</span>
    ${msgs.length ? '' : `<div class="center-col" style="flex:none;padding:20px 0"><span class="ring"><img class="av l" src="${im(p.img)}" alt=""></span><b>Start a conversation with ${p.name}</b><span class="small muted">${p.trip} · ${p.tags.slice(0, 2).join(', ')}</span></div>`}
    ${msgs.map(msgEl).join('')}${S.typing === p.id ? '<div class="typing-b"><i></i><i></i><i></i></div>' : ''}</div>
  <div class="ice">${['Plan the Goa trip?', 'Share a hotel', 'Sunset plans?', 'Best beach?'].map(t => `<button data-a="ice" data-v="${t}">${ic('spark')}${t}</button>`).join('')}</div>
  <div class="composer"><button class="ib round" data-a="sheet" data-v="attach" aria-label="Attach">${ic('plus')}</button>
    <label class="inp"><input id="msg" placeholder="Message…" autocomplete="off" aria-label="Message"><button class="ib ghost" style="width:36px;height:36px" data-a="toast" data-v="Hold to record a voice note" aria-label="Voice note">${ic('mic')}</button></label>
    <button class="send" data-a="send" aria-label="Send">${ic('send')}</button></div>`; };

SC.call = () => { const p = PPL[S.chat]; const mm = String(Math.floor(S.call.sec / 60)).padStart(2, '0'), ss = String(S.call.sec % 60).padStart(2, '0'); return `
  <img src="${im(p.img)}" alt="">
  <div class="ct"><b>${p.name}</b><small id="ctime">${mm}:${ss}</small><div style="margin-top:8px"><span class="gchip">${ic('shield')}Safe call · your number stays private</span></div></div>
  <div class="selfv">${S.call.cam ? `<img src="${im(ME.img)}" alt="You">` : `<div style="width:100%;height:100%;display:grid;place-items:center;background:#222">${ic('eyeoff')}</div>`}</div>
  <div class="cctl"><button class="${on(S.call.mute)}" data-a="callTog" data-v="mute" aria-label="Mute">${ic('mic')}</button><button class="${on(!S.call.cam)}" data-a="callTog" data-v="cam" aria-label="Camera">${ic('video')}</button>
  <button data-a="toast" data-v="Camera flip" aria-label="Flip camera">${ic('rewind')}</button><button class="end" data-back aria-label="End call">${ic('phone')}</button></div>`; };

SC.plan = () => { const q = quote(S.plan.vote); return `<div class="vs footed">${abar('Trip with Ananya', { sub: 'Goa · December' })}
  <div class="overlap"><div class="bars2"><div class="small b">Dates overlap</div>
    <div class="ln"><i style="left:0;width:66%;background:var(--violet)">You · 12–14 Dec</i></div><div class="ln"><i style="left:33%;width:67%;background:var(--rose)">Ananya · 13–15 Dec</i></div></div>
    <div style="text-align:center"><b style="font-size:26px" class="gt">2</b><div class="small muted b">days together</div></div></div>
  <div class="sh"><h3>Vote on a hotel</h3><span class="small muted">Ananya has voted</span></div>
  ${['saagar', 'drift', 'azure'].map(id => { const h = HOT[id], mine = S.plan.vote === id; const hers = id === 'saagar'; return `<button class="vote${on(mine)}" data-a="set" data-k="plan.vote" data-v="${id}"><img src="${im(h.img[0])}" alt=""><span class="t"><b>${h.name}</b><span class="small muted">${inr(h.price)} / night · ★ ${h.rating}</span><span class="avs" style="margin-top:4px">${mine ? `<img src="${im('rahul')}" alt="">` : ''}${hers ? `<img src="${im('ananya')}" alt="">` : ''}</span></span><span class="radio${on(mine)}"></span></button>`; }).join('')}
  <div class="sh"><h3>Rooms</h3></div>${seg('plan.rooms', ['Separate rooms', 'Shared room'], S.plan.rooms)}
  <div class="row small muted">${ic('shield')}<span>Separate rooms are recommended for a first trip. Ananya sees the same setting.</span></div>
  <div class="sh"><h3>How will you split the bill?</h3></div>${seg('plan.split', ['50 / 50', 'I pay', 'Each pays own'], S.plan.split)}
  <div class="card p"><div class="kv"><span>${HOT[S.plan.vote].name} · ${S.plan.rooms === 'Separate rooms' ? '2 rooms' : '1 room'} × 1 night</span><span>${inr(q.per * (S.plan.rooms === 'Separate rooms' ? 2 : 1))}</span></div>
    <div class="kv total"><span>Your share</span><span>${inr(S.plan.split === 'I pay' ? q.per * (S.plan.rooms === 'Separate rooms' ? 2 : 1) : q.per * (S.plan.rooms === 'Separate rooms' ? 2 : 1) / 2)}</span></div></div>
  <div class="list">${liStatic('pin', 'rose', 'Live location sharing', 'Aman (friend) can see it during the trip', sw('plan.live', S.plan.live, 'Live location'))}${liStatic('shield', 'ok', 'Verified hotels only', 'Safe Stay always on', '<span class="badge ok">On</span>')}</div>
  </div><div class="foot"><button class="btn full" data-a="sendPlan">${ic('send')}Send plan to Ananya</button></div>`; };

/* ---------- local helpers ---------- */
const HROLES = { All: () => true, Guide: x => /guide/i.test(x.role), Photographer: x => /Photo/.test(x.role), Driver: x => /Driver/.test(x.role), Scuba: x => /Scuba/.test(x.role) };
const maskName = n => n.split(' ').map(w => w[0] + '•••').join(' ');
const tripDays = () => { const out = []; for (let d = S.ci; d <= (S.co ?? S.ci + 1); d++) out.push(d); return out; };
const helperReviews = x => [['Neha & Karan', 'Couple · Nov 2026', 5, `${x.name.split(' ')[0]} was on time and knew every spot. We'd book again.`, '', 6],
  ['Aditya P.', 'Solo · Oct 2026', 5, 'Clear pricing upfront, no extra charges. Safe and friendly.', '', 3]];
const helperTeaser = (where, extra = '') => `<div class="unlockbox" role="link" tabindex="0" data-go="helpers" ${extra}>
  <div class="uhead"><span class="blurrow${on(S.helpersUnlocked)}">${HELPERS.slice(0, 3).map(x => `<span><img src="${im(x.img)}" alt=""></span>`).join('')}</span>
  <div class="grow"><b>Local helpers · ${where}</b><div class="small muted">Guides, drivers, photographers, scuba · ${HELPERS.length} available</div></div>${ic('right')}</div>
  ${S.helpersUnlocked ? '' : `<div class="row small muted">${ic('lock')}<span>Photos and names locked · unlock for ${inr(HELPER_UNLOCK_PRICE)}</span></div>`}</div>`;

SC.helpers = () => { const h = HOT[S.hotel], U = S.helpersUnlocked, list = HELPERS.filter(HROLES[S.hrole] || HROLES.All); return `<div class="vs${U ? '' : ' footed'}">${abar('Local helpers', { sub: `${h.area.split(',')[0]} · ${datesLabel()}` })}
  ${U ? `<div class="applied">${ic('check')}Unlocked for your ${datesLabel()} trip</div>`
    : `<div class="unlockbox"><div class="uhead"><span class="uico">${ic('lock')}</span><div class="grow"><b>${HELPERS.length} verified helpers available</b><div class="small muted">Unlock to see photos, full names, reviews and chat.</div></div></div></div>`}
  <div class="chips">${Object.keys(HROLES).map(r => `<button class="chip${on(S.hrole === r)}" data-a="set" data-k="hrole" data-v="${r}">${r}</button>`).join('')}</div>
  ${list.map(x => { const b = S.hbooked[x.id]; return `<div class="hrow${U ? '' : ' locked'}" role="link" tabindex="0" data-a="openHelper" data-v="${x.id}">
    <span class="hph"><img src="${im(x.img)}" alt="${U ? esc(x.name) : ''}">${U ? '' : `<span class="lk">${ic('lock')}</span>`}</span>
    <span class="t"><span class="row between"><span class="nm">${U ? x.name : maskName(x.name)}</span>${b ? '<span class="badge ok">Booked</span>' : rateEl(x.rating)}</span>
      <span class="small muted">${x.role} · ${x.yrs} yrs · ${x.trips} trips</span><span class="small muted">${x.langs}</span>
      <span class="row between"><span class="price">from <strong>${inr(x.price)}</strong> / ${x.unit}</span>${U ? ic('right') : ''}</span></span></div>`; }).join('')}
  <div class="row small muted" style="align-items:flex-start">${ic('shield')}<span>Every helper is ID and police verified. Sanjh holds your payment and releases it after the service.</span></div>
  </div>${U ? '' : `<div class="foot"><div class="grow"><strong>${S.premium ? '₹0' : inr(HELPER_UNLOCK_PRICE)}</strong><small>${S.premium ? 'Free for Gold members' : 'One-time · for this trip'}</small></div><button class="btn" data-a="sheet" data-v="unlock">${ic('lock')}Unlock all ${HELPERS.length}</button></div>`}`; };

SC.helper = () => { const x = HELPERS.find(y => y.id === S.helper) || HELPERS[0], U = S.helpersUnlocked, days = tripDays();
  if (!days.includes(S.hday)) S.hday = days[0];
  const svc = x.services[S.hsvc] || x.services[0];
  return `<div class="vs${U ? ' footed' : ''}" style="padding:0 0 ${U ? 112 : 30}px;gap:0">
  <div class="hero${U ? '' : ' locked'}" style="height:330px"><img src="${im(x.img)}" alt="${U ? esc(x.name) : 'Locked photo'}">
    <div class="tools"><button class="ib glass" data-back aria-label="Back">${ic('back')}</button>${U ? `<button class="ib glass" data-a="toast" data-v="${x.name.split(' ')[0]} : chat opens here (demo)" aria-label="Message">${ic('chat')}</button>` : ''}</div>
    ${U ? '' : `<div class="lockover"><span class="uico" style="background:#fff">${ic('lock')}</span><b style="font-size:17px">Profile locked</b><span class="small">${inr(HELPER_UNLOCK_PRICE)} unlocks all ${HELPERS.length} helpers</span><button class="btn sm auto white" data-a="sheet" data-v="unlock">Unlock</button></div>`}</div>
  <div class="sheetbody">
    <div><span class="badge ok">${ic('shield')}ID + police verified</span><h2 class="title-l" style="margin-top:8px">${U ? x.name : maskName(x.name)}</h2><div class="small muted" style="margin-top:4px">${x.role} · North Goa</div></div>
    <div class="stats"><div><b>${x.rating}</b><small>Rating</small></div><div><b>${x.trips}</b><small>Trips</small></div><div><b>${x.yrs} yrs</b><small>Experience</small></div></div>
    <div class="chips wrap">${x.tags.map(t => `<span class="chip soft">${t}</span>`).join('')}</div>
    <div class="list">${liStatic('lang', '', 'Languages', x.langs)}</div>
    ${U ? `<div class="sh"><h3>Choose a service</h3></div>
    <div class="stack">${x.services.map(([t, p], k) => `<button class="opt${on(S.hsvc === k)}" data-a="set" data-k="hsvc" data-v="${k}" data-num><span class="radio"></span><span class="t"><b>${t}</b></span><b class="num">${inr(p)}</b></button>`).join('')}</div>
    <div class="sh"><h3>Which day?</h3></div>
    <div class="chips wrap">${days.map(d => `<button class="chip${on(S.hday === d)}" data-a="set" data-k="hday" data-v="${d}" data-num>${dlabel(d)}</button>`).join('')}</div>
    <div class="sh"><h3>Reviews</h3><span class="small muted">${x.trips} trips</span></div>
    ${helperReviews(x).map((r, k) => reviewCard(r, 20 + k)).join('')}`
    : `<div class="card soft p small muted">After unlocking: services and prices, day selection, reviews and in-app chat.</div>`}
  </div></div>
  ${U ? `<div class="foot"><div class="grow"><strong>${inr(svc[1])}</strong><small>${dlabel(S.hday)} · ${svc[0]}</small></div><button class="btn" data-a="bookHelper">${S.hbooked[x.id] ? 'Update booking' : 'Book'}</button></div>` : ''}`; };

/* ---------- profile & account ---------- */
SC.me = () => { const c = 2 * Math.PI * 54, done = S.verified ? .9 : .8; return `<div class="vs tabbed">
  ${abar('Profile', { noBack: 1, right: `<button class="ib" data-go="settings" aria-label="Settings">${ic('gear')}</button>` })}
  <div class="mehead"><div class="cring"><svg viewBox="0 0 116 116"><circle cx="58" cy="58" r="54" stroke="var(--surface-3)" stroke-width="6" fill="none"/><circle cx="58" cy="58" r="54" style="stroke:var(--rose)" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - done)}"/></svg><img src="${im(ME.img)}" alt="Rahul"><span class="pct">${Math.round(done * 100)}%</span></div>
    <h2 class="title-l" style="display:flex;align-items:center;gap:8px;margin-top:6px">${ME.name}, ${ME.age}${S.verified ? `<span class="vb">${ic('check')}</span>` : ''}</h2><span class="small muted">${ME.job} · ${ME.city}</span>
    <div class="row"><button class="btn sm line auto" data-go="edit">${ic('edit')}Edit profile</button>${S.verified ? '' : `<button class="btn sm soft auto" data-go="verify">${ic('check')}Verify</button>`}</div></div>
  ${S.premium ? `<div class="card p row"><span class="badge gold">${ic('crown')}Gold</span><span class="small grow">Active until 26 Feb 2027</span><button class="link small" data-go="premium">Manage</button></div>`
    : `<div class="gold-card"><b>${ic('crown')} Sanjh Gold</b><p>See who liked you, unlimited likes, and member prices on hotels (10% off).</p><button class="btn white sm auto" data-go="premium">Upgrade · 50% off</button></div>`}
  <div class="stats"><div><b>${S.bookings.filter(b => b.status !== 'cancel').length}</b><small>Trips</small></div><div><b>24</b><small>Matches</small></div><div><b>${S.coinsBal.toLocaleString('en-IN')}</b><small>Coins</small></div></div>
  <div class="list">${li('heart', 'rose', 'Wishlist', `${S.wish.size} saved stays`, ic('right'), 'data-go="wishlist"')}${li('tag', 'gold', 'Offers & coupons', '5 active', ic('right'), 'data-go="offers"')}${li('coins', 'gold', 'Sanjh Coins', 'Refer & earn ₹500', ic('right'), 'data-go="wallet"')}${li('bell', 'violet', 'Notifications', '', ic('right'), 'data-go="notifications"')}</div>
  <div class="list">${li('shield', 'ok', 'Safety center', 'SOS, live location, block list', ic('right'), 'data-go="safety"')}${li('check', 'violet', 'Photo verification', S.verified ? 'Verified ✓' : 'Pending', ic('right'), 'data-go="verify"')}${li('help', '', 'Help center', '', ic('right'), 'data-go="help"')}${li('gear', '', 'Settings', '', ic('right'), 'data-go="settings"')}</div>
  </div>${dock('me')}`; };

SC.edit = () => `<div class="vs">${abar('Edit profile', { right: '<button class="link small" data-a="saveProfile">Done</button>' })}
  <div class="photos6"><div class="main"><img src="${im('rahul')}" alt="Main photo"><span class="badge rose tagm">Main</span></div>
    ${['mountains', 'goa-beach'].map(p => `<div><img src="${im(p)}" alt=""><button class="x" data-a="toast" data-v="Photo removed" aria-label="Remove">${ic('x')}</button></div>`).join('')}
    ${[1, 2, 3].map(() => `<button data-a="toast" data-v="Photo picker (demo)" aria-label="Add photo">${ic('plus')}</button>`).join('')}</div>
  <p class="small muted" style="margin:-8px 0 0">Hold and drag to reorder. 4+ photos get more matches.</p>
  <div class="field"><label for="bio">About me</label><div class="inp"><textarea id="bio" maxlength="300">Treks on weekends, spreadsheets on weekdays. The best chai is in Jaipur, fight me.</textarea></div></div>
  <div class="sh"><h3>Prompts</h3><span class="small muted">2 / 3</span></div>
  <div class="list">${li('edit', 'rose', 'My perfect weekend', 'A sunrise trek, then a long nap.')}${li('edit', 'rose', 'When I travel, I always', 'find the local dhaba.')}${li('plus', 'violet', 'Add a prompt', 'Choose from 50+ prompts')}</div>
  <div class="sh"><h3>Interests</h3></div><div class="chips wrap">${['Travel', 'Trekking', 'Food', 'Music', 'Beaches', 'Photography', 'Cafés', 'Yoga', 'Books', 'Road trips'].map(v => chipTog('interests', v)).join('')}</div>
  <div class="sh"><h3>Basics</h3></div>
  <div class="list">${[['ruler', 'Height', "5'11\""], ['briefcase', 'Work', 'Product manager'], ['grad', 'Education', 'IIT Bombay'], ['lang', 'Languages', 'Hindi, English'], ['wine', 'Drinks', 'Socially'], ['heart', 'Looking for', 'Long-term']].map(([i, t, v]) => li(i, '', t, '', `<span class="val">${v}</span>`)).join('')}</div>
  <div class="sh"><h3>Travel</h3></div>
  <div class="list">${liStatic('plane', 'rose', 'Show upcoming trips on profile', 'This gets you trip matches', sw('set.live', true, 'Show trips'))}</div>
  <div class="chips wrap">${['Beach', 'Mountains', 'Backpacker', 'Luxury', 'Heritage'].map(v => chipTog('interests', v)).join('')}</div></div>`;

SC.verify = () => `<div class="vs footed">${abar('Photo verification')}
  ${S.verifyStep === 2 ? `<div class="center-col"><div class="okmark">${ic('check')}</div><h2 class="title-l">You're verified!</h2><p class="sub">Your profile now shows a blue tick. People trust verified profiles more.</p></div>`
  : `<h2 class="title-l">Get a blue tick</h2><p class="sub">Take a selfie and we'll check that your photos are really you. Nobody else sees it.</p>
  <div class="selfie">${S.verifyStep === 1 ? '<span class="scanline"></span>' : ''}<img src="${im('rahul')}" alt="Selfie preview"></div>
  <p class="small b" style="text-align:center;margin:0">${S.verifyStep === 1 ? 'Scanning your face…' : 'Pose: make a ✌️ and keep your face in the frame'}</p>
  <div class="list">${liStatic('sunny', 'gold', 'Find good light', 'Facing a window works best')}${liStatic('eyeoff', 'violet', 'Remove glasses or mask', '')}${liStatic('lock', 'ok', 'Kept private', 'Used only for verification')}</div>`}
  </div><div class="foot"><button class="btn full" data-a="verify" ${S.verifyStep === 1 ? 'disabled' : ''}>${S.verifyStep === 2 ? 'Go to profile' : S.verifyStep === 1 ? 'Checking…' : `${ic('camera')}Take selfie`}</button></div>`;

const TIERS = { plus: ['Plus', 'plus', 1], gold: ['Gold', 'gold', 1.6], plat: ['Platinum', 'plat', 2.4] };
const DURS = { '1': [1, 499, ''], '3': [3, 999, 'Save 33%'], '6': [6, 1499, 'Save 50%'] };
const tierPrice = () => Math.round(DURS[S.dur][1] * TIERS[S.plan_tier][2] / 10) * 10 - 1;
SC.premium = () => `<div class="vs footed">${abar('', { right: S.premium ? '<span class="badge gold">Active</span>' : '' })}
  <h2 class="title-xl" style="margin-top:-6px">Sanjh <span class="gt">Premium</span></h2><p class="sub">More matches, better stays. Cancel anytime.</p>
  <div class="plans">${Object.entries(TIERS).map(([k, [n, cls]]) => `<button class="plancard ${cls}${on(S.plan_tier === k)}" data-a="set" data-k="plan_tier" data-v="${k}"><h4>${k === 'plat' ? ic('crown') : k === 'gold' ? ic('star', 'f') : ic('heart', 'f')}${n}</h4>
    <ul>${({ plus: ['Unlimited likes', 'Undo swipe', '1 Boost / month'], gold: ['Everything in Plus', 'See who liked you', '5 Super likes / week', 'Travel mode anywhere'], plat: ['Everything in Gold', 'Message before matching', '10% member price on hotels', 'Priority support'] })[k].map(f => `<li>${ic('check')}${f}</li>`).join('')}</ul></button>`).join('')}</div>
  <div class="durs">${Object.entries(DURS).map(([k, [m, p, s]]) => `<button class="${on(S.dur === k)}" data-a="set" data-k="dur" data-v="${k}">${s ? `<span class="save">${s}</span>` : ''}<b>${m}</b><small>month${m > 1 ? 's' : ''}</small><small class="num" style="color:var(--ink);font-weight:800;margin-top:4px">${inr(Math.round(p * TIERS[S.plan_tier][2] / 10) * 10 - 1)}</small></button>`).join('')}</div>
  <div class="card p" style="overflow-x:auto"><table class="cmp"><thead><tr><th>Feature</th><th>Free</th><th>Plus</th><th>Gold</th><th>Plat</th></tr></thead><tbody>
    ${[['Unlimited likes', 0, 1, 1, 1], ['See who liked you', 0, 0, 1, 1], ['Super likes / week', 1, 1, 5, 10], ['Travel mode anywhere', 0, 0, 1, 1], ['Hotel member price', 0, 0, 0, 1], ['Message before match', 0, 0, 0, 1]].map(([f, ...v]) => `<tr><td>${f}</td>${v.map(x => `<td>${x === 0 ? '<span class="no">—</span>' : x === 1 ? ic('check') : `<b>${x}</b>`}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <p class="small muted" style="text-align:center;margin:0">Renews automatically. Turn it off anytime in Settings.</p>
  </div><div class="foot"><div class="grow"><strong>${inr(tierPrice())}</strong><small>${TIERS[S.plan_tier][0]} · ${S.dur} month${S.dur > 1 ? 's' : ''}</small></div><button class="btn" data-a="buyPremium">Continue</button></div>`;

SC.wallet = () => `<div class="vs">${abar('Sanjh Coins')}
  <div class="wallet"><span class="small b" style="opacity:.85">Balance</span><div><b>${S.coinsBal.toLocaleString('en-IN')}</b> <span class="b">coins</span></div><span class="small" style="opacity:.9">1 coin = ₹1 · use on hotel bookings</span><div class="row" style="margin-top:14px"><button class="btn white sm auto" data-tab="home">Use on a booking</button></div></div>
  <div class="card rose p stack"><b>Invite a friend, you both get ₹500</b><span class="small muted">When your friend makes their first booking, you both get 500 coins.</span>
    <div class="row"><button class="coupon-card grow" style="padding:12px 14px;justify-content:space-between;align-items:center" data-a="copy" data-v="RAHUL500"><b style="letter-spacing:.1em">RAHUL500</b>${ic('copy')}</button><button class="btn auto sm" data-a="sheet" data-v="share">${ic('share')}Share</button></div></div>
  <div class="sh"><h3>History</h3></div>
  <div class="list">${[['star', 'ok', 'Wrote a review', 'Cloudline Hill Stay · 14 Oct', '+50'], ['tag', 'bad', 'Used on a booking', 'SNJ-39102 · 9 Oct', '−250'], ['invite', 'ok', 'Referral bonus', 'Aman joined · 2 Oct', '+500'], ['check', 'ok', 'Profile verified', '28 Sep', '+100']].map(([i, t, a, s, v]) => liStatic(i, t, a, s, `<b class="num" style="color:var(--${t === 'ok' ? 'ok' : 'bad'})">${v}</b>`)).join('')}</div></div>`;

SC.safety = () => `<div class="vs">${abar('Safety center')}
  <div class="card p stack" style="align-items:center;text-align:center;padding:22px">
    <button class="sos${S.sosHold ? ' hold' : ''}" data-hold="sos" aria-label="SOS: hold for 2 seconds"><span class="fillc"></span><span style="position:relative">SOS<small>Hold 2 sec</small></span></button>
    <span class="small muted" style="margin-top:12px">Alerts your emergency contacts with your live location and shows the 112 helpline.</span></div>
  <div class="list">${liStatic('pin', 'rose', 'Live location on dates', 'Aman and Priya can see it', sw('set.live', S.set.live, 'Live location'))}${li('users', 'violet', 'Emergency contacts', '2 contacts added')}${li('shield', 'ok', 'Safe Stay', 'Verified hotels, separate rooms by default')}${li('check', 'violet', 'Photo verification', S.verified ? 'Verified' : 'Pending', ic('right'), 'data-go="verify"')}${li('block', 'bad', 'Blocked profiles', '3 people')}${li('flag', '', 'My reports', '1 report · resolved')}</div>
  <div class="sh"><h3>Safety tips</h3></div>
  <div class="hscroll">${[['Meet in public first', 'A café, beach shack or mall. Not a home or hotel room.'], ['Video call first', 'Sanjh calls never share your number.'], ['Never send money', 'Whatever the reason, never send UPI or gift cards.'], ['Book your own room', 'Always keep the booking in your own name.']].map(([t, s]) => `<div class="card p" style="width:230px;flex:none;scroll-snap-align:start"><span class="badge rose" style="margin-bottom:8px">${ic('shield')}Tip</span><b style="display:block">${t}</b><span class="small muted">${s}</span></div>`).join('')}</div></div>`;

SC.settings = () => `<div class="vs">${abar('Settings')}
  <div class="sh"><h3>Account</h3></div>
  <div class="list">${li('phone', '', 'Phone number', '+91 98765 43210')}${li('mail', '', 'Email', 'rahul.s@example.com')}${li('globe', '', 'Connected accounts', 'Google')}</div>
  <div class="sh"><h3>Appearance</h3></div>
  <div class="seg">${[['light', 'Light'], ['dark', 'Dark'], ['auto', 'Auto']].map(([k, v]) => `<button class="${on(S.theme === k)}" data-a="theme" data-v="${k}">${v}</button>`).join('')}</div>
  <div class="sh"><h3>Language</h3></div>${seg('lang', ['English', 'हिंदी', 'Hinglish'], S.lang)}
  <div class="sh"><h3>Discovery</h3></div>
  <div class="list">${liStatic('pause', '', 'Pause profile', "You won't appear in Discover; chats continue", sw('set.pause', S.set.pause, 'Pause'))}${liStatic('eyeoff', 'gold', 'Incognito mode', 'Only people you like can see you · Gold', sw('set.incog', S.set.incog, 'Incognito'))}${liStatic('pin', '', 'Show distance', '', sw('set.distance', S.set.distance, 'Show distance'))}</div>
  <div class="sh"><h3>Notifications</h3></div>
  <div class="list">${[['nMatch', 'New matches'], ['nMsg', 'Messages'], ['nBook', 'Booking updates'], ['nPrice', 'Price drops on saved hotels'], ['nOffer', 'Offers & sales']].map(([k, t]) => liStatic('bell', '', t, '', sw('set.' + k, S.set[k], t))).join('')}</div>
  <div class="sh"><h3>Privacy</h3></div>
  <div class="list">${liStatic('check', '', 'Read receipts', '', sw('set.receipts', S.set.receipts, 'Read receipts'))}${liStatic('user', '', 'Show online status', '', sw('set.online', S.set.online, 'Online status'))}${li('lock', '', 'Data & privacy', 'Download your data')}</div>
  <div class="sh"><h3>Payments</h3></div>
  <div class="list">${li('card', '', 'Saved cards & UPI', '1 card · 1 UPI')}${li('coins', '', 'Currency', '', '<span class="val">INR ₹</span>')}</div>
  <div class="list">${li('help', '', 'Help center', '', ic('right'), 'data-go="help"')}${li('info', '', 'Terms & privacy policy', '')}</div>
  <button class="btn line" data-a="logout">${ic('logout')}Log out</button>
  <button class="btn danger" data-a="sheet" data-v="delete">${ic('trash')}Delete account</button>
  <p class="small faint" style="text-align:center;margin:0">Sanjh v1.0 · demo prototype</p></div>`;

SC.help = () => `<div class="vs">${abar('Help center')}
  <label class="sbox" style="border-color:var(--line)">${ic('search')}<input id="hq" placeholder="What do you need help with?" aria-label="Search help"></label>
  <div class="two">${[['trips', 'Booking & refunds'], ['card', 'Payments'], ['shield', 'Account & safety'], ['heart', 'Dating & matches']].map(([i, t]) => `<button class="card p stack" style="gap:8px;text-align:left"><span class="badge violet" style="align-self:flex-start;padding:8px">${ic(i)}</span><b style="font-size:14px">${t}</b></button>`).join('')}</div>
  <div class="sh"><h3>FAQs</h3></div>
  ${[['How do I cancel a booking?', 'Go to My trips → open the booking → "Cancel booking". You get a full refund during the free cancellation period.'], ['When will I get my refund?', '1–2 days for UPI, 5–7 working days for cards. Track it in My trips.'], ['What does "Couple-friendly" mean?', 'Unmarried couples can check in with valid ID, and local IDs are accepted where stated.'], ['How do I plan a trip with a match?', 'In chat, tap + → "Trip plan", or tap "Plan the trip together" on the match screen. You both vote and split the bill.'], ['How do I report someone?', 'Tap ••• on their profile or chat → Report. Our team acts within 24 hours, and they never see your name.']].map(([q, a]) => `<details class="faq"><summary>${q}${ic('right')}</summary><p>${a}</p></details>`).join('')}
  <div class="sh"><h3>Contact us</h3></div>
  <div class="list">${li('chat', 'ok', 'Chat with us', '24x7 · replies in ~2 min', ic('right'), 'data-a="toast" data-v="Opening support chat (demo)"')}${liStatic('phone', 'violet', 'Call', '1800 000 0000 (toll free)')}${liStatic('mail', '', 'Email', 'support@sanjh.example')}</div></div>`;

/* ================================================================ sheets */
const SH = {
  sort: () => `<h3 class="title-l" style="font-size:20px">Sort by</h3><div class="list">${['Recommended', 'Price: low to high', 'Price: high to low', 'Rating', 'Distance from beach'].map(v => `<button class="li${on(S.sort === v)}" data-a="set" data-k="sort" data-v="${v}" data-close><span class="t"><b>${v}</b></span><span class="radio${on(S.sort === v)}"></span></button>`).join('')}</div>`,
  share: () => `<h3 class="title-l" style="font-size:20px">Share</h3><div class="attach">${[['heart', 'Ananya', 'var(--grad)'], ['chat', 'WhatsApp', '#25D366'], ['copy', 'Link copy', 'var(--violet)'], ['more', 'More', 'var(--surface-3)']].map(([i, t, c]) => `<button data-a="${t === 'Ananya' ? 'shareToChat' : 'toast'}" data-v="${t === 'Ananya' ? S.hotel : t === 'Link copy' ? 'Link copied' : `Opening ${t} (demo)`}"><span style="background:${c};color:#fff">${ic(i)}</span>${t}</button>`).join('')}</div>`,
  cancel: () => { const b = S.bookings.find(x => x.id === S.trip); return `<h3 class="title-l" style="font-size:20px">Cancel this booking?</h3>
    <div class="applied">${ic('shield')}You're within free cancellation. Full refund of ${inr(b.paid)} in 1–2 days.</div>
    <span class="lbl">Reason (optional)</span><div class="stack">${['Plans changed', 'Found a cheaper option', 'Picked the wrong dates', 'Something else'].map(r => `<button class="opt${on(S.cancelReason === r)}" data-a="set" data-k="cancelReason" data-v="${r}"><span class="radio"></span><span class="t"><b>${r}</b></span></button>`).join('')}</div>
    <div class="two"><button class="btn line" data-a="closeSheet">Keep booking</button><button class="btn danger" data-a="cancelBooking">Cancel booking</button></div>`; },
  report: () => { const p = PPL[S.person]; return `<h3 class="title-l" style="font-size:20px">${p.name} · report or block</h3><p class="sub">They won't know who reported them.</p>
    <div class="list">${['Fake profile or photos', 'Abusive messages', 'Spam or asking for money', 'Seems underage', 'Something else'].map(r => li('flag', 'bad', r, '', ic('right'), `data-a="report" data-v="${r}"`)).join('')}</div>
    <button class="btn line" data-a="report" data-v="block">${ic('block')}Block only</button>`; },
  boost: () => `<div class="center-col" style="padding:6px 0"><span class="okmark">${ic('bolt')}</span><h3 class="title-l" style="font-size:22px">Be a top profile for 30 min</h3><p class="sub">During a Boost, people on Goa trips see your profile first. Usually 5x more views.</p></div>
    <div class="durs">${[['1', '₹149'], ['5', '₹599'], ['10', '₹999']].map(([n, p], k) => `<button class="${on(k === 1)}" data-a="toast" data-v="${n} boost selected">${k === 1 ? '<span class="save">Popular</span>' : ''}<b>${n}</b><small>boost${n > 1 ? 's' : ''}</small><small class="b" style="color:var(--ink)">${p}</small></button>`).join('')}</div>
    <button class="btn" data-a="boostNow">${ic('bolt')}Boost now · 1 free left</button>`,
  attach: () => `<h3 class="title-l" style="font-size:20px">Share</h3><div class="attach">${[['image', 'Photo', '#4F8BFF', 'toast', 'Gallery (demo)'], ['bed', 'Hotel', 'var(--rose)', 'sendHotel', 'saagar'], ['plane', 'Trip plan', 'var(--violet)', 'goPlan', ''], ['pin', 'Location', '#0B8A5A', 'toast', 'Live location shared for 1 hour']].map(([i, t, c, a, v]) => `<button data-a="${a}" data-v="${v}"><span style="background:${c};color:#fff">${ic(i)}</span>${t}</button>`).join('')}</div>`,
  chatMore: () => { const p = PPL[S.chat]; return `<div class="list">${li('user', '', 'View profile', '', ic('right'), `data-go="person" data-s="person=${p.id}"`)}${li('plane', 'violet', 'Plan a trip', '', ic('right'), 'data-go="plan"')}${li('pin', 'rose', 'Share live location', 'For 1 hour', ic('right'), 'data-a="toast" data-v="Live location shared"')}${li('bell', '', 'Mute chat', '', ic('right'), 'data-a="toast" data-v="Chat muted"')}</div>
    <div class="list">${li('flag', 'bad', 'Report', '', ic('right'), `data-a="sheet" data-v="report" data-s="person=${p.id}"`)}${li('block', 'bad', 'Unmatch', 'This chat will be removed for good', ic('right'), 'data-a="toast" data-v="Unmatch (demo)"')}</div>`; },
  unlock: () => S.unlocking ? `<div class="center-col" style="padding:34px 0"><div class="spinner"></div><b>Processing payment…</b><span class="small muted">Please keep this open</span></div>`
    : `<h3 class="title-l" style="font-size:20px">Unlock local helpers</h3>
    <div class="row"><span class="blurrow">${HELPERS.map(x => `<span><img src="${im(x.img)}" alt=""></span>`).join('')}</span><span class="small muted">${HELPERS.length} helpers · ${HOT[S.hotel].area.split(',')[0]}</span></div>
    <div class="list">${['Photos and full names', 'Services, prices and reviews', 'In-app chat and booking', `Valid for your ${datesLabel()} trip`].map(t => liStatic('check', 'ok', t, '')).join('')}</div>
    ${S.premium ? '' : `<div class="upis">${UPI.slice(0, 3).map(([k, n, c, l]) => `<button class="${on(S.unlockPay === k)}" data-a="set" data-k="unlockPay" data-v="${k}"><span class="lg" style="background:${c}">${l}</span>${n}</button>`).join('')}<button class="${on(S.unlockPay === 'card')}" data-a="set" data-k="unlockPay" data-v="card"><span class="lg" style="background:#3F3F46">${ic('card')}</span>Card</button></div>`}
    <button class="btn" data-a="unlockPay">${S.premium ? 'Unlock free with Gold' : `${ic('lock')}Pay ${inr(HELPER_UNLOCK_PRICE)} to unlock`}</button>
    <p class="small muted" style="text-align:center;margin:0">Full refund if no helper is available within 24 hours.</p>`,
  delete: () => `<h3 class="title-l" style="font-size:20px">Delete your account?</h3><p class="sub">All your matches, chats and ${S.coinsBal.toLocaleString('en-IN')} coins will be permanently deleted. Upcoming bookings won't be cancelled.</p>
    <div class="list">${liStatic('pause', 'violet', 'Pause instead?', 'Your profile is hidden and your data is kept')}</div>
    <div class="two"><button class="btn line" data-a="closeSheet">Keep account</button><button class="btn danger" data-a="logout">Delete</button></div>`,
};

/* ================================================================ router + render */
const root = document.getElementById('screen');
let timers = [];
function clearTimers() { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; }
function go(id) { S.stack.push(id); S.sheet = null; render('fwd'); }
function back() { if (S.stack.length > 1) { S.stack.pop(); S.sheet = null; render('back'); } else if (cur() !== 'home') tab('home'); }
function tab(id) { S.stack = [id]; S.sheet = null; render('fade'); }
function replace(id) { S.stack[S.stack.length - 1] = id; S.sheet = null; render('fade'); }
function jump(id) { S.sheet = null; S.stack = TABS.includes(id) || !PARENT[id] ? [id] : [PARENT[id], id]; render('fade'); }
const rr = () => render('same');

// Static chrome (island, status bar, toast) lives outside #vroot so toasts survive re-renders.
root.innerHTML = `<div class="island"></div><div class="sbar" id="sbar"><span>9:41</span>${STATUS_SVG}</div><div id="vroot"></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
const vroot = document.getElementById('vroot');
const PUBLIC = new Set(['splash', 'onboard', 'login', 'otp']);
function render(anim) {
  let gated = false;
  if (!S.authed && (!PUBLIC.has(cur()) || (cur() === 'otp' && !S.pendingPhone))) { S.stack = ['login']; S.sheet = null; gated = true; }
  const id = cur(), m = META[id];
  const vs = vroot.querySelector('.vs'), keep = anim === 'same' && vs ? vs.scrollTop : 0;
  clearTimers();
  document.getElementById('sbar').className = 'sbar' + (m.light ? ' light' : '');
  vroot.innerHTML = `<div class="view ${m.cls || ''} ${anim === 'back' ? 'back-anim' : anim === 'fade' ? 'fade' : ''}" ${anim === 'same' ? 'style="animation:none"' : ''}>${SC[id]()}</div>
    ${S.sheet ? `<div class="scrim" data-scrim><div class="sheet" role="dialog" aria-modal="true">${SH[S.sheet]()}</div></div>` : ''}`;
  if (anim === 'same') { const n = vroot.querySelector('.vs'); if (n) n.scrollTop = keep; }
  const msgs = root.querySelector('#msgs'); if (msgs) msgs.scrollTop = msgs.scrollHeight;
  AFTER[id] && AFTER[id]();
  syncChrome(id);
  if (gated) toast('Log in to view the prototype');
}
const AFTER = {
  splash: () => {},
  processing: () => timers.push(setTimeout(() => { completeBooking(); S.stack = ['trips', 'success']; render('fade'); }, 1800)),
  call: () => timers.push(setInterval(() => { S.call.sec++; const el = document.getElementById('ctime'); if (el) el.textContent = `${String(Math.floor(S.call.sec / 60)).padStart(2, '0')}:${String(S.call.sec % 60).padStart(2, '0')}`; }, 1000)),
};

let toastT;
function toast(msg) {
  const t = document.getElementById('toast'); if (!t) return;
  t.innerHTML = ic('check') + esc(msg); t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- state path helpers ---------- */
const getPath = p => p.split('.').reduce((o, k) => o[k], S);
const setPath = (p, v) => { const ks = p.split('.'), last = ks.pop(); ks.reduce((o, k) => o[k], S)[last] = v; };

/* ---------- actions ---------- */
function completeBooking() {
  const q = quote(), id = 'SNJ-' + (51000 + Math.floor(Math.random() * 8999));
  S.bookings.unshift({ id, h: S.hotel, ci: S.ci, co: S.co ?? S.ci + 1, room: q.r.name, meal: MEALS[S.meal][0], guests: `${S.g.adults} adults${S.g.children ? ` + ${S.g.children} kids` : ''}`, paid: S.split ? q.share : q.total, via: { gpay: 'UPI · GPay', phonepe: 'UPI · PhonePe', paytm: 'UPI · Paytm', bhim: 'UPI · BHIM', card: 'HDFC card', hotel: 'Pay at hotel' }[S.pay] || 'Net banking', status: 'up' });
  S.trip = id; S.tripsTab = 'up'; if (S.coins) S.coinsBal -= 250; S.coupon = false; S.coins = false;
}
function now() { const d = new Date(); return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }).toUpperCase(); }
function pushMsg(pid, m) { (S.chats[pid] = S.chats[pid] || []).push({ time: now(), ...m }); S.newMatches = S.newMatches.filter(x => x !== pid); }
const REPLIES = ['Haha, true! 😄', 'I really liked the pool at Saagar Cove!', 'I get in on the morning of the 13th. You?', "Done, let's lock the plan ✨", 'Sunset at Chapora Fort, then dinner? 🌅'];
// Not in `timers`: a reply must still arrive after the screen re-renders or the user navigates away.
function autoReply(pid) {
  setTimeout(() => { S.typing = pid; if (cur() === 'chat' && S.chat === pid) rr(); }, 700);
  setTimeout(() => { S.typing = null; pushMsg(pid, { t: REPLIES[(S.chats[pid].length) % REPLIES.length] });
    if (cur() === 'chat' && S.chat === pid) rr(); else { S.unread[pid] = (S.unread[pid] || 0) + 1; if (cur() === 'matches') rr(); } }, 2300);
}
function decide(kind, fromPerson) {
  const pid = fromPerson ? S.person : DECK[S.deck]; if (!pid) return;
  const after = () => {
    if (!fromPerson || DECK[S.deck] === pid) S.deck++;
    if (kind !== 'pass' && LIKERS.has(pid)) { S.matchWith = pid; if (!S.newMatches.includes(pid) && !S.chats[pid]) S.newMatches.unshift(pid); S.stack = ['discover', 'match']; render('fade'); return; }
    if (fromPerson) { back(); } else rr();
    if (kind === 'super') toast(`Super like sent to ${PPL[pid].name}`);
    else if (kind === 'like') toast(`You liked ${PPL[pid].name}`);
  };
  const card = root.querySelector('.pcard.top');
  if (card && !fromPerson) { card.style.transform = kind === 'pass' ? 'translateX(-150%) rotate(-24deg)' : kind === 'super' ? 'translateY(-150%)' : 'translateX(150%) rotate(24deg)'; card.querySelector('.stamp.' + (kind === 'pass' ? 'nope' : 'like')).style.opacity = 1; setTimeout(after, 300); }
  else after();
}
function sendText(text) {
  const t = text.trim(); if (!t) return;
  pushMsg(S.chat, { me: 1, t: t.slice(0, 500) }); rr(); autoReply(S.chat);
}

const A = {
  set(el) { let v = el.dataset.v; if ('num' in el.dataset) v = Number(v); setPath(el.dataset.k, v); if ('close' in el.dataset) S.sheet = null; rr(); },
  tog(el) { const s = getPath(el.dataset.k); s.has(el.dataset.v) ? s.delete(el.dataset.v) : s.add(el.dataset.v); if (el.tagName !== 'INPUT') rr(); },
  tog1(el) { setPath(el.dataset.k, !getPath(el.dataset.k)); rr(); },
  toast(el) { toast(el.dataset.v); },
  sheet(el) { S.sheet = el.dataset.v; rr(); },
  closeSheet() { S.sheet = null; rr(); },
  copy(el) { const v = el.dataset.v; try { navigator.clipboard.writeText(v).catch(() => {}); } catch (e) { /* clipboard blocked: still confirm */ } toast(`Copied ${v}`); },
  fav(el) { const id = el.dataset.id; if (S.wish.has(id)) { S.wish.delete(id); toast('Removed from wishlist'); } else { S.wish.add(id); toast(`Saved ${HOT[id].name}`); } rr(); },
  slide(el) { const v = +el.dataset.v; if (v > 2) go('login'); else { S.slide = v; render('fade'); } },
  finishSetup() { S.stack = ['home']; render('fade'); setTimeout(() => toast('Welcome to Sanjh, Rahul'), 300); },
  dest(el) { S.dest = el.dataset.v === 'Goa' ? 'North Goa' : el.dataset.v; S.stack = ['home', 'results']; render('fwd'); },
  day(el) { const d = +el.dataset.v; if (S.co != null || d <= S.ci) { S.ci = d; S.co = null; } else S.co = d; rr(); },
  step(el) { const k = el.dataset.k; S.g[k] = Math.max(0, S.g[k] + Number(el.dataset.v)); rr(); },
  resetFilters() { S.fsel = new Set(); S.amen = new Set(); S.ptype = new Set(); S.fstars = new Set(); S.price = [1000, 20000]; S.sort = 'Recommended'; S.grate = 'Any'; rr(); toast('Filters reset'); },
  pickRoom(el) { S.room = el.dataset.r; S.meal = el.dataset.m; rr(); },
  applyCoupon() { const v = (document.getElementById('cp')?.value || '').trim().toUpperCase(); if (v === 'SANJH20') { S.coupon = true; rr(); toast('SANJH20 applied'); } else toast("That code isn't valid. Try SANJH20."); },
  payNow() { S.stack[S.stack.length - 1] = 'payment'; go('processing'); },
  openTrip(el) { S.trip = el.dataset.v; const tgt = cur() === 'success' ? (S.stack = ['trips'], 'trip') : 'trip'; go(tgt); },
  cancelBooking() { const b = S.bookings.find(x => x.id === S.trip); b.status = 'cancel'; S.sheet = null; S.tripsTab = 'cancel'; S.stack = ['trips']; render('back'); toast(`Cancelled · ${inr(b.paid)} refund started`); },
  writeReview(el) { S.reviewFor = el.dataset.v; S.stars = 0; S.rv = {}; S.rvTags = new Set(); go('review'); },
  rv(el) { S.rv[el.dataset.k] = +el.dataset.v; rr(); },
  submitReview() { const b = S.bookings.find(x => x.id === S.reviewFor); if (b) b.reviewed = true; S.coinsBal += 50; S.tripsTab = 'done'; back(); toast('Review posted · +50 coins'); },
  readAll() { S.readAll = true; rr(); toast('All marked as read'); },
  decide(el) { decide(el.dataset.v); },
  personDecide(el) { decide(el.dataset.v, true); },
  rewind() { if (S.deck > 0) { S.deck--; rr(); toast('Previous profile is back'); } else toast('No profile to bring back'); },
  resetDeck() { S.deck = 0; rr(); },
  boostNow() { S.sheet = null; rr(); toast("Boost on · you're at the top for 30 min"); },
  applyDf() { S.deck = 0; back(); toast('Filters applied'); },
  promptLike(el) { const k = el.dataset.v; S.promptLiked.has(k) ? S.promptLiked.delete(k) : (S.promptLiked.add(k), toast('Liked their prompt')); rr(); },
  report(el) { S.sheet = null; S.stack = S.stack.filter(x => x !== 'person' && x !== 'chat'); if (!S.stack.length) S.stack = ['discover']; if (S.chats[S.person] && el.dataset.v !== 'x') { delete S.chats[S.person]; delete S.unread[S.person]; } render('back'); toast(el.dataset.v === 'block' ? "Blocked. They can't see you anymore." : 'Report received. Our team will review it within 24 hours.'); },
  closeMatch() { tab('discover'); },
  openChat(el) { S.chat = el.dataset.v; delete S.unread[S.chat]; if (cur() === 'match') S.stack = ['matches']; go('chat'); },
  quickMsg(el) { const pid = S.matchWith; S.chat = pid; pushMsg(pid, { me: 1, t: el.dataset.v }); S.stack = ['matches']; go('chat'); autoReply(pid); },
  send() { const i = document.getElementById('msg'); if (!i) return; const v = i.value; i.value = ''; sendText(v); },
  ice(el) { sendText(el.dataset.v); },
  sendHotel(el) { S.sheet = null; pushMsg(S.chat, { me: 1, type: 'hotel', h: el.dataset.v }); rr(); autoReply(S.chat); },
  shareToChat(el) { S.sheet = null; S.chat = 'ananya'; pushMsg('ananya', { me: 1, type: 'hotel', h: el.dataset.v || S.hotel }); S.stack = ['matches']; go('chat'); toast('Sent to Ananya'); autoReply('ananya'); },
  goPlan() { S.sheet = null; go('plan'); },
  sendPlan() { S.chat = 'ananya'; pushMsg('ananya', { me: 1, type: 'plan' }); S.stack = ['matches']; go('chat'); toast('Plan sent to Ananya'); autoReply('ananya'); },
  callTog(el) { const k = el.dataset.v; if (k === 'mute') S.call.mute = !S.call.mute; else S.call.cam = !S.call.cam; rr(); },
  buyPremium() { S.premium = true; back(); toast(`${TIERS[S.plan_tier][0]} is now active`); },
  verify() { if (S.verifyStep === 2) { back(); return; } S.verifyStep = 1; rr(); setTimeout(() => { S.verifyStep = 2; S.verified = true; if (cur() === 'verify') rr(); }, 2200); },
  theme(el) { setTheme(el.dataset.v); },
  saveProfile() { back(); toast('Profile saved'); },
  openHelper(el) { S.helper = el.dataset.v; S.hsvc = 0; if (!S.helpersUnlocked) { S.sheet = 'unlock'; rr(); } else go('helper'); },
  unlockPay() { if (S.unlocking) return; S.unlocking = true; rr();
    setTimeout(() => { S.unlocking = false; S.helpersUnlocked = true; S.sheet = null; rr(); toast('Helpers unlocked'); }, S.premium ? 300 : 1500); },
  bookHelper() { const x = HELPERS.find(y => y.id === S.helper), [t, p] = x.services[S.hsvc]; S.hbooked[x.id] = { svc: t, day: S.hday, price: p }; back(); toast(`Booked ${x.name.split(' ')[0]} for ${dshort(S.hday)}`); },
  login() {
    const raw = document.getElementById('ph')?.value || '', pw = document.getElementById('pw')?.value || '';
    const ph = raw.replace(/\D/g, '').slice(-10); S.loginPhone = raw;
    if (ph.length !== 10) S.loginErr = 'Enter a 10-digit mobile number.';
    else if (!pw) S.loginErr = 'Enter your password.';
    else if (ph !== DEMO_LOGIN.phone || pw !== DEMO_LOGIN.password) S.loginErr = 'Incorrect mobile number or password.';
    else { S.loginErr = ''; S.otpErr = ''; S.pendingPhone = ph; go('otp'); return; }
    rr(); document.getElementById(S.loginErr.includes('password') && ph.length === 10 ? 'pw' : 'ph')?.focus();
  },
  togglePw(el) { const i = document.getElementById('pw'); if (!i) return; const show = i.type === 'password'; i.type = show ? 'text' : 'password'; el.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); },
  verifyOtp() {
    const code = [0, 1, 2, 3, 4, 5].map(k => document.getElementById('otp' + k)?.value || '').join('');
    if (!/^\d{6}$/.test(code)) { S.otpErr = 'Enter the 6-digit code.'; rr(); document.getElementById('otp0')?.focus(); return; }
    S.authed = true; S.otpErr = ''; try { sessionStorage.setItem('sanjh-auth', '1'); } catch (e) { /* storage blocked: stays logged in until refresh */ }
    S.stack = ['intent']; render('fwd');
  },
  logout() { S.sheet = null; S.authed = false; S.pendingPhone = ''; S.loginPhone = ''; try { sessionStorage.removeItem('sanjh-auth'); } catch (e) { /* ignore */ } S.stack = ['login']; render('fade'); },
};

/* ---------- event layer ---------- */
root.addEventListener('click', e => {
  if (e.target.matches('[data-scrim]')) { S.sheet = null; rr(); return; }
  const el = e.target.closest('[data-a],[data-go],[data-back],[data-tab]');
  if (!el || !root.contains(el) || el.disabled) return;
  if (el.tagName === 'INPUT') return; // checkbox changes are handled on "change"
  if (el.dataset.s) el.dataset.s.split(',').forEach(p => { const [k, v] = p.split('='); setPath(k, v); });
  if (el.dataset.s && 'photo' in S && el.dataset.go === 'hotel') S.photo = 0;
  if ('a' in el.dataset) { const fn = A[el.dataset.a]; if (fn) { e.preventDefault(); fn(el, e); } return; }
  if ('back' in el.dataset) return back();
  if (el.dataset.tab) return tab(el.dataset.tab);
  if (el.dataset.go) { if (el.dataset.go === 'chat' || el.dataset.go === 'call') { /* keep S.chat */ } return go(el.dataset.go); }
});
root.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="link"]')) { e.preventDefault(); e.target.click(); }
  if (e.key === 'Enter' && e.target.id === 'msg') { e.preventDefault(); A.send(); }
  if (e.key === 'Enter' && (e.target.id === 'ph' || e.target.id === 'pw')) { e.preventDefault(); A.login(); }
  if (e.key === 'Enter' && /^otp\d$/.test(e.target.id)) { e.preventDefault(); A.verifyOtp(); }
  if (e.key === 'Backspace' && /^otp\d$/.test(e.target.id) && !e.target.value) { const p = document.getElementById('otp' + (+e.target.id.slice(3) - 1)); if (p) p.focus(); }
});
root.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.c) { setPath(el.dataset.c, el.checked); if (el.dataset.c === 'split' || el.dataset.c === 'coins' || el.dataset.c.startsWith('df.')) rr(); return; }
  if (el.dataset.a === 'tog') A.tog(el);
});
root.addEventListener('input', e => {
  const el = e.target, k = el.dataset.in; if (!k) return;
  if (k === 'otp' && el.value) { const n = document.getElementById('otp' + (+el.id.slice(3) + 1)); if (n) n.focus(); }
  if (k === 'q') { const q = el.value.toLowerCase(); root.querySelectorAll('#dgrid .dtile').forEach(t => { t.hidden = q && !t.dataset.name.includes(q); }); }
  if (k === 'price') { const i = +el.dataset.k, v = +el.value; S.price[i] = i === 0 ? Math.min(v, S.price[1] - 500) : Math.max(v, S.price[0] + 500); el.value = S.price[i];
    document.getElementById('plabel').textContent = `${inr(S.price[0])} – ${inr(S.price[1])}${S.price[1] >= 20000 ? '+' : ''}`;
    const f = document.getElementById('pfill'); f.style.left = (S.price[0] - 1000) / 190 + '%'; f.style.right = 100 - (S.price[1] - 1000) / 190 + '%'; }
  if (k === 'r2') { const key = el.dataset.key, i = +el.dataset.k, v = +el.value, arr = S.df[key]; arr[i] = i === 0 ? Math.min(v, arr[1] - 1) : Math.max(v, arr[0] + 1); el.value = arr[i];
    document.getElementById('agelabel').textContent = `${arr[0]} – ${arr[1]}`; const f = document.getElementById(key + 'fill'); f.style.left = (arr[0] - 18) / 32 * 100 + '%'; f.style.right = 100 - (arr[1] - 18) / 32 * 100 + '%'; }
  if (k === 'dist') { S.df.dist = +el.value; document.getElementById('distlabel').textContent = el.value + ' km'; }
});

/* swipe: drag the top card */
let drag = null;
root.addEventListener('pointerdown', e => {
  const sos = e.target.closest('[data-hold="sos"]');
  if (sos) { sos.classList.add('hold'); drag = { sos, t: setTimeout(() => { sos.classList.remove('hold'); toast('SOS sent: contacts alerted with your location (demo)'); drag = null; }, 2000) }; return; }
  const card = e.target.closest('.pcard.top'); if (!card || e.target.closest('button')) return;
  drag = { card, x: e.clientX, y: e.clientY, dx: 0, dy: 0 }; card.classList.add('dragging'); card.setPointerCapture(e.pointerId);
});
root.addEventListener('pointermove', e => {
  if (!drag || !drag.card) return;
  drag.dx = e.clientX - drag.x; drag.dy = e.clientY - drag.y;
  drag.card.style.transform = `translate(${drag.dx}px,${drag.dy}px) rotate(${drag.dx / 14}deg)`;
  drag.card.querySelector('.stamp.like').style.opacity = Math.max(0, Math.min(1, drag.dx / 90));
  drag.card.querySelector('.stamp.nope').style.opacity = Math.max(0, Math.min(1, -drag.dx / 90));
});
const endDrag = () => {
  if (!drag) return;
  if (drag.sos) { clearTimeout(drag.t); drag.sos.classList.remove('hold'); drag = null; return; }
  const { card, dx, dy } = drag; drag = null; card.classList.remove('dragging');
  if (dx > 100) decide('like'); else if (dx < -100) decide('pass'); else if (dy < -120) decide('super');
  else { card.style.transform = ''; card.querySelectorAll('.stamp').forEach(s => (s.style.opacity = 0)); }
};
root.addEventListener('pointerup', endDrag);
root.addEventListener('pointercancel', endDrag);

/* ================================================================ page chrome (sidebar, notes, theme) */
function setTheme(t) {
  S.theme = t; const r = document.documentElement;
  if (t === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t);
  try { localStorage.setItem('sanjh-theme', t); } catch (e) { /* storage blocked: theme still applies for this visit */ }
  document.querySelectorAll('[data-theme-btn]').forEach(b => b.classList.toggle('on', b.dataset.themeBtn === t));
  if (cur() === 'settings') rr();
}
function buildNav() {
  let n = 0;
  document.getElementById('fgroups').innerHTML = GROUPS.map(([g, items]) => `<div class="fgroup"><h4>${g}</h4><ul>${items.map(([id, t]) => `<li><button data-jump="${id}"><span class="n">${++n}</span>${t}</button></li>`).join('')}</ul></div>`).join('');
  document.getElementById('fselect').innerHTML = GROUPS.map(([g, items]) => `<optgroup label="${g}">${items.map(([id, t]) => `<option value="${id}">${t}</option>`).join('')}</optgroup>`).join('');
  document.getElementById('fcount').textContent = ORDER.length;
}
function syncChrome(id) {
  const m = META[id];
  document.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('on', b.dataset.jump === id));
  const sel = document.getElementById('fselect'); if (sel) sel.value = id;
  document.getElementById('ninfo').innerHTML = `<span class="grp">${m.g} · ${ORDER.indexOf(id) + 1} / ${ORDER.length}</span><h3>${m.t}</h3><p>${m.d}</p><ul>${m.f.map(f => `<li>${ic('check')}${f}</li>`).join('')}</ul>`;
  try { history.replaceState(null, '', '#' + id); } catch (e) { /* sandboxed frames may refuse */ }
}
document.addEventListener('click', e => {
  const j = e.target.closest('[data-jump]'); if (j) return jump(j.dataset.jump);
  const tb = e.target.closest('[data-theme-btn]'); if (tb) return setTheme(tb.dataset.themeBtn);
  const st = e.target.closest('[data-step]'); if (st) { const k = ORDER.indexOf(cur()) + Number(st.dataset.step); jump(ORDER[(k + ORDER.length) % ORDER.length]); }
});
document.getElementById('fselect').addEventListener('change', e => jump(e.target.value));
document.addEventListener('keydown', e => {
  if (e.target.closest('input,textarea,select')) return;
  if (e.key === 'ArrowRight') jump(ORDER[(ORDER.indexOf(cur()) + 1) % ORDER.length]);
  if (e.key === 'ArrowLeft') jump(ORDER[(ORDER.indexOf(cur()) - 1 + ORDER.length) % ORDER.length]);
});

/* boot */
buildNav();
try { setTheme(localStorage.getItem('sanjh-theme') || 'auto'); } catch (e) { setTheme('auto'); }
const start = (location.hash || '').slice(1);
if (META[start]) jump(start); else render('fade');
