import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type CompanyLogoProps = HTMLProps<HTMLDivElement> & {
  src?: string
  alt?: string
  borderRadius?: string
};

const CompanyLogo: SFC<CompanyLogoProps> = (props) => {
  const {
    src,
    alt,
    borderRadius = '4px',
    children,
    className,
    ...divProps
  } = props;

  return (
    <div styleName="company-logo" className={className} style={{ borderRadius }} {...divProps}>
      <div styleName={ src ? 'blackout' : 'blackout-empty' }/>
      {src ? <img src={src} alt={alt}/> : <div styleName="empty"/>}
    </div>
  );
};

export default CompanyLogo;
