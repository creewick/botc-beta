import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Token.css'

interface TokenProps {
  icon: string;
  title?: string;
  size?: number;
  grayscale?: boolean;
}

export default function Token({ icon, title, grayscale = false, size = 90 }: TokenProps) {
  const base = import.meta.env.BASE_URL;
  const style = { width: size, height: size, filter: grayscale ? 'grayscale(100%)' : 'none' };
  const iconStyle = { top: title ? -5 : 0 };
  const limit = 7;
  const fontSize = !title
    ? 16
    : title.length < limit
      ? 16
      : 16 - Math.min(16, (title.length - limit) / 2);

  return (
    <div className='token' style={style}>
      <LazyLoadImage src={`${base}${icon}`} width={size} height={size} className='icon' style={iconStyle} />
      <svg className='text' viewBox="0 0 100 100">
        <text fontSize={fontSize} fontWeight={500} fill="black" letterSpacing="0.02em" strokeWidth={2} paintOrder="stroke" strokeOpacity={0.5} stroke="white">
          <textPath href='#circle-path' startOffset='50%' textAnchor='middle'>
            {title?.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}