import React from 'react';

function Error({textError}: {textError: string}): JSX.Element {

  const errorStyle = {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '20px',
    margin: 0,
    textAlign: 'center' as const,
  };

  return (
    <p style={errorStyle}>{textError}</p>
  );
}

export default Error;
