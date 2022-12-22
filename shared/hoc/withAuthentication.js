import React, {useEffect} from 'react';
import {storage} from '../../shared/mmkv-store/store';

const withAuthentication =
  Component =>
  ({...props}) => {
    const isAuthenticated = storage.getString('isAuthenticated');
    return <Component {...props} isAuthenticated={isAuthenticated} />;
  };

export default withAuthentication;
