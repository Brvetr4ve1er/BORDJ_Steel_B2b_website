export function Logo() {
  return (
    <svg
      width="150"
      height="100"
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className="w-auto h-auto"
    >
      <defs>
        <clipPath id="clip-text">
          <text
            x="50%"
            y="95"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="30"
            fontWeight="bold"
            fill="white"
          >
            STEEL
          </text>
        </clipPath>
      </defs>

      {/* Pentagon Roof */}
      <polygon points="100,10 25,50 175,50" fill="#C00000" />

      {/* Top Gray Bar */}
      <rect x="25" y="50" width="150" height="15" fill="#404040" />

      {/* Bordj Text */}
      <text
        x="50%"
        y="80"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="30"
        fontWeight="bold"
        fill="#404040"
      >
        BORDJ
      </text>

      {/* Red rectangle for STEEL */}
      <rect x="25" y="90" width="150" height="25" fill="#C00000" />

      {/* STEEL Text (clipped) */}
      <text
        x="50%"
        y="102.5"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="30"
        fontWeight="bold"
        fill="white"
      >
        STEEL
      </text>

      {/* Bottom Gray Bar */}
      <rect x="25" y="115" width="150" height="15" fill="#404040" />
      {/* Tagline */}
      <text
        x="50%"
        y="122.5"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="6"
        fontWeight="normal"
        fill="white"
        letterSpacing="0.5"
      >
        CENTRE DE SERVICE ACIER - LASER CUTTING - ENGINEERING
      </text>
    </svg>
  );
}
