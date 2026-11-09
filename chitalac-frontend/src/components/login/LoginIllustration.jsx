export default function LoginIllustration() {
  return (
    <svg
      viewBox="0 0 380 220"
      preserveAspectRatio="xMidYMax meet"
      className="brand-svg"
      width="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ilustración vectorial: montañas, planta láctea y camión repartidor"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="rgba(255,140,0,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="380" height="220" fill="url(#glow)" />

      {/* Stars */}
      <circle cx="20" cy="18" r="1" fill="rgba(255,255,255,.55)" />
      <circle cx="55" cy="10" r="1.3" fill="rgba(255,255,255,.45)" />
      <circle cx="95" cy="22" r="0.9" fill="rgba(255,255,255,.60)" />
      <circle cx="150" cy="8" r="1.1" fill="rgba(255,255,255,.40)" />
      <circle cx="200" cy="15" r="0.8" fill="rgba(255,255,255,.55)" />
      <circle cx="270" cy="6" r="1" fill="rgba(255,255,255,.45)" />
      <circle cx="330" cy="19" r="1.2" fill="rgba(255,255,255,.50)" />
      <circle cx="360" cy="12" r="0.9" fill="rgba(255,255,255,.40)" />

      {/* Moon */}
      <circle cx="340" cy="28" r="14" fill="rgba(255,220,140,.18)" />
      <circle cx="346" cy="24" r="11" fill="rgba(200,90,0,.3)" />

      {/* Mountains far (lighter) */}
      <path
        d="M0 130 L50 65 L90 95 L130 45 L175 85 L220 35 L265 80 L310 50 L350 75 L380 55 L380 220 L0 220Z"
        fill="rgba(180,60,0,.18)"
      />

      {/* Mountains mid */}
      <path
        d="M0 160 L60 100 L100 130 L145 80 L190 115 L240 70 L285 105 L330 78 L380 100 L380 220 L0 220Z"
        fill="rgba(160,50,0,.28)"
      />

      {/* Mountains near */}
      <path
        d="M0 185 L45 140 L80 165 L120 125 L165 155 L200 130 L240 160 L280 135 L320 155 L380 140 L380 220 L0 220Z"
        fill="rgba(140,45,0,.38)"
      />

      {/* Ground strip */}
      <rect x="0" y="190" width="380" height="30" fill="rgba(100,35,0,.35)" />

      {/* Road */}
      <rect
        x="0"
        y="200"
        width="380"
        height="12"
        fill="rgba(0,0,0,.15)"
        rx="0"
      />
      <line
        x1="20"
        y1="206"
        x2="70"
        y2="206"
        stroke="rgba(255,255,255,.25)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <line
        x1="100"
        y1="206"
        x2="150"
        y2="206"
        stroke="rgba(255,255,255,.25)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <line
        x1="180"
        y1="206"
        x2="230"
        y2="206"
        stroke="rgba(255,255,255,.25)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <line
        x1="260"
        y1="206"
        x2="310"
        y2="206"
        stroke="rgba(255,255,255,.25)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <line
        x1="340"
        y1="206"
        x2="380"
        y2="206"
        stroke="rgba(255,255,255,.25)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />

      {/* ── PLANT / FACTORY ── */}
      {/* Main building body */}
      <rect
        x="50"
        y="130"
        width="110"
        height="72"
        fill="rgba(255,255,255,.18)"
        stroke="rgba(255,255,255,.6)"
        strokeWidth="1"
        rx="2"
      />
      {/* Roof gabled */}
      <path
        d="M46 130 L105 98 L164 130Z"
        fill="rgba(255,255,255,.12)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1"
      />
      {/* Roof ridge cap */}
      <line
        x1="105"
        y1="98"
        x2="105"
        y2="130"
        stroke="rgba(255,255,255,.3)"
        strokeWidth="0.5"
      />

      {/* Big chimney */}
      <rect
        x="120"
        y="102"
        width="12"
        height="32"
        fill="rgba(255,255,255,.22)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.8"
        rx="1"
      />
      {/* Chimney cap */}
      <rect
        x="117"
        y="100"
        width="18"
        height="4"
        fill="rgba(255,255,255,.3)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.5"
        rx="1"
      />
      {/* Smoke puffs */}
      <circle cx="126" cy="93" r="6" fill="rgba(255,255,255,.08)" />
      <circle cx="129" cy="84" r="5" fill="rgba(255,255,255,.06)" />
      <circle cx="124" cy="76" r="4" fill="rgba(255,255,255,.04)" />

      {/* Small chimney */}
      <rect
        x="80"
        y="112"
        width="8"
        height="20"
        fill="rgba(255,255,255,.18)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.7"
        rx="1"
      />
      <circle cx="84" cy="107" r="4" fill="rgba(255,255,255,.06)" />
      <circle cx="85" cy="101" r="3" fill="rgba(255,255,255,.04)" />

      {/* Factory windows */}
      <rect
        x="58"
        y="142"
        width="16"
        height="14"
        rx="1.5"
        fill="rgba(255,220,100,.35)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      <rect
        x="82"
        y="142"
        width="16"
        height="14"
        rx="1.5"
        fill="rgba(255,220,100,.30)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      <rect
        x="106"
        y="142"
        width="16"
        height="14"
        rx="1.5"
        fill="rgba(255,220,100,.25)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      <rect
        x="130"
        y="142"
        width="16"
        height="14"
        rx="1.5"
        fill="rgba(255,220,100,.35)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      {/* Cross on windows */}
      <line
        x1="66"
        y1="142"
        x2="66"
        y2="156"
        stroke="rgba(255,255,255,.3)"
        strokeWidth="0.5"
      />
      <line
        x1="58"
        y1="149"
        x2="74"
        y2="149"
        stroke="rgba(255,255,255,.3)"
        strokeWidth="0.5"
      />
      <line
        x1="90"
        y1="142"
        x2="90"
        y2="156"
        stroke="rgba(255,255,255,.3)"
        strokeWidth="0.5"
      />
      <line
        x1="82"
        y1="149"
        x2="98"
        y2="149"
        stroke="rgba(255,255,255,.3)"
        strokeWidth="0.5"
      />

      {/* Factory door */}
      <rect
        x="92"
        y="165"
        width="26"
        height="37"
        rx="2"
        fill="rgba(0,30,80,.25)"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="0.8"
      />
      {/* Door handle */}
      <circle cx="115" cy="184" r="1.5" fill="rgba(255,255,255,.6)" />

      {/* Side building / warehouse */}
      <rect
        x="162"
        y="155"
        width="45"
        height="47"
        fill="rgba(255,255,255,.12)"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="0.8"
        rx="1"
      />
      <path
        d="M160 155 L184.5 138 L209 155Z"
        fill="rgba(255,255,255,.08)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.8"
      />
      <rect
        x="168"
        y="165"
        width="12"
        height="10"
        rx="1"
        fill="rgba(255,220,100,.2)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.5"
      />
      <rect
        x="184"
        y="165"
        width="12"
        height="10"
        rx="1"
        fill="rgba(255,220,100,.2)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.5"
      />

      {/* Silo / tank */}
      <rect
        x="28"
        y="152"
        width="22"
        height="50"
        fill="rgba(255,255,255,.14)"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="0.8"
        rx="2"
      />
      <ellipse
        cx="39"
        cy="152"
        rx="11"
        ry="5"
        fill="rgba(255,255,255,.18)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      <line
        x1="28"
        y1="163"
        x2="50"
        y2="163"
        stroke="rgba(255,255,255,.2)"
        strokeWidth="0.5"
      />
      <line
        x1="28"
        y1="174"
        x2="50"
        y2="174"
        stroke="rgba(255,255,255,.2)"
        strokeWidth="0.5"
      />
      <line
        x1="28"
        y1="185"
        x2="50"
        y2="185"
        stroke="rgba(255,255,255,.2)"
        strokeWidth="0.5"
      />

      {/* ── TRUCK ── */}
      {/* Truck cargo body */}
      <rect
        x="218"
        y="170"
        width="100"
        height="30"
        fill="rgba(255,255,255,.22)"
        stroke="rgba(255,255,255,.65)"
        strokeWidth="1"
        rx="2"
      />
      {/* Milk tank on cargo */}
      <ellipse
        cx="268"
        cy="170"
        rx="34"
        ry="11"
        fill="rgba(255,255,255,.16)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.8"
      />
      <line
        x1="234"
        y1="170"
        x2="302"
        y2="170"
        stroke="rgba(255,255,255,.3)"
        strokeWidth="0.5"
      />
      {/* Chitalac label on tank */}
      <rect
        x="245"
        y="165"
        width="46"
        height="10"
        rx="3"
        fill="rgba(244,124,32,.5)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.5"
      />
      <text
        x="268"
        y="172"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="700"
        fill="#fff"
        fontFamily="Inter,sans-serif"
      >
        CHITALAC
      </text>

      {/* Truck cab */}
      <rect
        x="318"
        y="172"
        width="46"
        height="28"
        fill="rgba(255,255,255,.28)"
        stroke="rgba(255,255,255,.65)"
        strokeWidth="1"
        rx="3"
      />
      {/* Cab roof curve */}
      <path
        d="M318 172 Q320 164 340 163 Q360 162 364 172Z"
        fill="rgba(255,255,255,.2)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="0.8"
      />
      {/* Windshield */}
      <rect
        x="323"
        y="165"
        width="22"
        height="14"
        rx="2"
        fill="rgba(100,200,255,.35)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      {/* Side window cab */}
      <rect
        x="350"
        y="174"
        width="10"
        height="10"
        rx="1.5"
        fill="rgba(100,200,255,.25)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.5"
      />
      {/* Headlights */}
      <rect
        x="362"
        y="185"
        width="3"
        height="5"
        rx="1"
        fill="rgba(255,255,160,.7)"
      />
      {/* Exhaust pipe */}
      <rect
        x="320"
        y="160"
        width="3"
        height="13"
        fill="rgba(255,255,255,.25)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.5"
        rx="1"
      />
      <circle cx="321.5" cy="157" r="3.5" fill="rgba(255,255,255,.06)" />

      {/* Wheels truck */}
      <circle
        cx="240"
        cy="200"
        r="9"
        fill="rgba(20,20,30,.6)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1"
      />
      <circle cx="240" cy="200" r="4" fill="rgba(255,255,255,.2)" />
      <circle
        cx="290"
        cy="200"
        r="9"
        fill="rgba(20,20,30,.6)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1"
      />
      <circle cx="290" cy="200" r="4" fill="rgba(255,255,255,.2)" />
      <circle
        cx="340"
        cy="200"
        r="9"
        fill="rgba(20,20,30,.6)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1"
      />
      <circle cx="340" cy="200" r="4" fill="rgba(255,255,255,.2)" />
      <circle
        cx="357"
        cy="200"
        r="9"
        fill="rgba(20,20,30,.6)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1"
      />
      <circle cx="357" cy="200" r="4" fill="rgba(255,255,255,.2)" />

      {/* ── MILK DROPS floating ── */}
      {/* Drop 1 */}
      <path
        d="M12 80 C12 80 8 90 8 94 C8 98.4 9.8 102 12 102 C14.2 102 16 98.4 16 94 C16 90 12 80 12 80Z"
        fill="rgba(255,255,255,.22)"
        stroke="rgba(255,255,255,.5)"
        strokeWidth="0.7"
      />
      <ellipse
        cx="10.8"
        cy="88"
        rx="1"
        ry="1.8"
        fill="rgba(255,255,255,.4)"
        transform="rotate(-20 10.8 88)"
      />

      {/* Drop 2 */}
      <path
        d="M368 55 C368 55 365 63 365 66 C365 69.3 366.3 71.5 368 71.5 C369.7 71.5 371 69.3 371 66 C371 63 368 55 368 55Z"
        fill="rgba(255,255,255,.18)"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="0.6"
      />

      {/* Drop 3 */}
      <path
        d="M200 45 C200 45 197.5 51 197.5 53.5 C197.5 56 198.6 57.8 200 57.8 C201.4 57.8 202.5 56 202.5 53.5 C202.5 51 200 45 200 45Z"
        fill="rgba(255,255,255,.16)"
        stroke="rgba(255,255,255,.38)"
        strokeWidth="0.5"
      />

      {/* ── COW SILHOUETTE ── (simple line art) */}
      <g
        transform="translate(185,160)"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1"
        fill="none"
      >
        <ellipse cx="18" cy="14" rx="17" ry="11" /> {/* body */}
        <circle cx="5" cy="8" r="7" /> {/* head */}
        {/* Legs */}
        <line x1="8" y1="25" x2="8" y2="38" />
        <line x1="14" y1="25" x2="14" y2="38" />
        <line x1="22" y1="25" x2="22" y2="38" />
        <line x1="28" y1="25" x2="28" y2="38" />
        {/* Tail */}
        <path d="M35 12 Q44 8 43 15" strokeLinecap="round" />
        {/* Ear */}
        <path d="M2 3 Q-2 -1 1 5" strokeLinecap="round" />
        {/* Horns */}
        <line x1="4" y1="2" x2="1" y2="-3" />
        <line x1="8" y1="1" x2="10" y2="-4" />
        {/* Udder */}
        <path d="M10 25 Q18 31 26 25" strokeWidth="0.8" />
        {/* Eye */}
        <circle
          cx="3"
          cy="8"
          r="1.2"
          fill="rgba(255,255,255,.55)"
          stroke="none"
        />
        {/* Spots on body */}
        <ellipse
          cx="16"
          cy="12"
          rx="4"
          ry="3"
          strokeWidth="0.7"
          strokeDasharray="1 1"
        />
        <ellipse
          cx="26"
          cy="16"
          rx="3"
          ry="2.5"
          strokeWidth="0.7"
          strokeDasharray="1 1"
        />
      </g>

      {/* Ground line */}
      <line
        x1="0"
        y1="200"
        x2="380"
        y2="200"
        stroke="rgba(255,255,255,.12)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
