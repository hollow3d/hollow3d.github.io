import React from 'react';
import feather from 'feather-icons';

export default (
  name: string,
  measureArray: Array<string | number>,
  styles: ?string
) => {
  const featherString = feather.icons[name].toSvg({
    class: styles,
    width: measureArray[0],
    height: measureArray[1],
  });
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: featherString }} />;
};