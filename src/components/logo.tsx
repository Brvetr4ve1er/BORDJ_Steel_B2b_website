export function Logo() {
  return (
    <svg
      width="200"
      height="125"
      viewBox="0 0 200 125"
      xmlns="http://www.w3.org/2000/svg"
      className="w-auto h-auto"
    >
      {/* Pentagon Roof */}
      <polygon points="100,0 25,40 175,40" fill="#C1272D" />

      {/* Top Gray Bar */}
      <rect x="25" y="40" width="150" height="10" fill="#4B4B4B" />

      {/* BORDJ Text */}
      <text
        x="50%"
        y="65"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="#4B4B4B"
        fontFamily="Montserrat, sans-serif"
      >
        BORDJ
      </text>

      {/* Red rectangle for STEEL */}
      <rect x="25" y="75" width="150" height="25" fill="#C1272D" />

      {/* STEEL Text */}
      <text
        x="50%"
        y="87.5"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="white"
        fontFamily="Montserrat, sans-serif"
      >
        STEEL
      </text>

      {/* Bottom Gray Bar */}
      <rect x="25" y="100" width="150" height="10" fill="#4B4B4B" />

      {/* Tagline */}
      <text
        x="50%"
        y="105"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="normal"
        fill="white"
        letterSpacing="0.5"
        fontFamily="Roboto, sans-serif"
      >
        CENTRE DE SERVICE ACIER - LASER CUTTING - ENGINEERING
      </text>
    </svg>
  );
}
