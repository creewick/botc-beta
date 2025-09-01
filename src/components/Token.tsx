import './Token.css'

interface TokenProps {
  icon: string;
  title?: string;
  size?: number;
}

export default function Token({ icon, title, size = 90 }: TokenProps) {
  const base = import.meta.env.BASE_URL;
  const style = { width: size, height: size };
  const iconStyle = { top: title ? -5 : 0, ...style};
  const textStyle = { fontSize: 16, fontWeight: 500, fontFamily: 'Dumbledore', fill: 'black', strokeWidth: 2, paintOrder: 'stroke', strokeOpacity: 0.5, stroke: 'white' };

  return (
    <div className='token' style={style}>
      <img className='icon' src={`${base}${icon}`} loading='lazy' decoding='async' style={iconStyle} />
      <svg className='text' viewBox="0 0 100 100">
        <text style={textStyle}>
          <textPath href='#circle-path' startOffset='50%' textAnchor='middle'>
            {title?.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}