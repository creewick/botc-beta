import './Token.css'

interface TokenProps {
  icon: string;
  title?: string;
  size?: number;
}

export default function Token({ icon, title, size = 90 }: TokenProps) {
  const backImage = <image href='images/token.webp' width='110' height='110' x='-5' y='-5' />
  const iconImage = <image href={icon} width={title ? 60 : 80} height={title ? 60 : 80} x={title ? 20 : 10} y={title ? 15 : 10} />
  const text =
    <text fontSize='16' fontWeight={600} fontFamily='Dumbledore' fill='black'
      strokeWidth='2' paintOrder='stroke' strokeOpacity={0.5} stroke='white'
    >
      <textPath href='#circle-path' startOffset='50%' textAnchor='middle'>
        {title?.toUpperCase()}
      </textPath>
    </text>

  return (
    <svg viewBox="0 0 100 100" className="token" width={size} height={size}>
      {backImage}
      {iconImage}
      {text}
    </svg>
  );
}