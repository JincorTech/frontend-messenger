import * as React from 'react';
import { SFC } from 'react';
import { WrappedFieldProps } from 'redux-form';

import FileUpload, { Props as UploadProps } from '../../common/ImageUpload';

/**
 * Types
 */
export type Props = UploadProps & WrappedFieldProps<any>;

/**
 * Component
 */
const RenderImageUpload: SFC<Props> = (props) => {
  const { width, height, defaultElement, overlay, src, alt, onImgSelect, input, meta, ref, ...divProps } = props;
  const { value, onChange } = input;
  const { dirty } = meta;

  const handleChange = (value: any) => {
    onChange(value);
  };

  return <FileUpload
    src={dirty ? value : src}
    alt={alt}
    width={width}
    height={height}
    overlay={overlay}
    defaultElement={defaultElement}
    onImgSelect={handleChange}
    {...divProps}
  />;
};

export default RenderImageUpload;
