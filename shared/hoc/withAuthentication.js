import React from 'react';
import {getData} from '../utils/helper';

const withAuthentication =
  Component =>
  ({...props}) => {
    const isToken = getData('token');
    const isBasicAuthentication = getData('isBasicSignupCompleted', 'string');
    const isExtendedAuthentication = getData(
      'isExtendedSignupCompleted',
      'string',
    );
    return (
      <Component
        {...props}
        isToken={isToken}
        isBasicSignupCompleted={isBasicAuthentication}
        isExtendedSignupCompleted={isExtendedAuthentication}
      />
    );
  };

export default withAuthentication;
