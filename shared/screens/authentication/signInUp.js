// Import library 
import React, { useState } from 'react';
import styled from '@emotion/native';
// Import files

import { SIGN_IN_UP } from '../../constants';
import Header from './components/header';
import { OTP } from './components/otp';
import SignInUpInputView from './components/SignInUpInputView';
import SignUpOptions from './components/SignInUpOption';
import AliasView from './components/AliasView';
import { aliasInput, authentication, birthDateRegistration, genderCountryRegistration, otpVerify } from '../../apis';
import DateOfBirth from './components/dateOfBirth';
import GenderCountries from './components/genderCountries';
import { selectedCountry, selectedGender } from '../../redux-ui-state/slices/authenticationSlice';
import { useDispatch } from 'react-redux';
import { getData, setData } from '../../utils/helper';

export const SignInUp = ({onCloseIconClick, isBasicSignupCompleted, authStatus}) => {
  let dateOfbirth = getData('user_dob');
  let modeOfScreen = '';
  if(isBasicSignupCompleted && authStatus) {
    modeOfScreen = 'DOB';
    if(dateOfbirth) {
      modeOfScreen = 'Gender';
    }
  } 
  const [option, setOption] = useState('');
  const [screen, setScreen] = useState(modeOfScreen);
  const [value, setValue] = useState('');
  const [loginDetail, setLoginDetail] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [tokenID, setTokenID] = useState('');
  const [reCaptchaCode, setReCaptchaCode] = useState('');
  const [isSubmit, setIsSubmit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('Gender');
  const [country, setCountry] = useState('Country');
  const dispatch = useDispatch();

  // email and phone API calling
  const handleSumbit = async (screen) => {
    // setIsLoading(true);
    setScreen(screen)
    let queyParams = {"email":value, 'googleCaptchaToken' :reCaptchaCode};
    if(option == 'phone') {
      queyParams =  {"phone":value, 'googleCaptchaToken' : reCaptchaCode};
    }
    const res = await authentication(queyParams);
    const data = await res.json();
    if(data) {
      // setIsLoading(false);
      setScreen('OTP');
    } else {
      console.log('User Authentication data not available')
    }
  }

  //Back button handle
  function handleBack (screen) {
    if(screen == '') {
      setValue('')
    } else {
      setValue(loginDetail)
    }
    
    setError('')
    setIsSubmit(false); 
    setScreen(screen)
  }

  // Selected option: email or phone
  function handleSelect (optionChoose, screen) {
    setOption(optionChoose);
    setScreen(screen);
  }
  
  //After OTP verify use information set in local storage.
  const handleStorage = (userInfo) => {
    setIsSubmit(false); 
    if(userInfo?.token) {
      const storageValues = userInfo;
      const storageToken = storageValues?.token;
      const storageUser = storageValues?.user;

      if (option == 'email' ) {
        setData('email', storageValues?.user?.email);
      } else if (option == 'phone') {
        setData('phone', JSON.stringify(storageValues?.user?.phone));
      }
      
      setData('token', storageToken?.id);
      setData('token_ttl', JSON.stringify(storageToken?.ttl));
      setData('user_id', storageToken?.userId);
      setData('isBasicSignupCompleted', JSON.stringify(storageUser?.isBasicSignupCompleted));
      setData('isExtendedSignupCompleted', JSON.stringify(storageUser?.isExtendedSignupCompleted));
      setData('user_role', storageUser?.role);
      if(storageUser?.birthDate) {
        setData('user_dob', storageUser?.birthDate);
      }
      if(storageUser?.isBasicSignupCompleted) {
        setData('user_alias', storageUser?.alias);
      }

      if(storageUser?.isBasicSignupCompleted) {
        closeSignup();
      } else {
        setError('')
        setTokenID(storageToken?.id);
        setLoginDetail(value);
        setValue('')
        setScreen('ALIAS')
      }
    } else {
      setError(userInfo?.error?.message);
    }
  };

  const handleAliasResponse = (response) => {
    if(response.error) {
      setError(response?.error?.message)
    } else {
      setData('user_alias', response?.details?.alias);
      setData('isBasicSignupCompleted', JSON.stringify(true));
      if(authStatus) {
        setScreen('DOB');
      } else {
        closeSignup();
      }
    }
  };

  const closeSignup = () => {
    onCloseIconClick();
    onCloseIconClick();
    setValue('');
    setScreen('');
  }

  // Web Google Recaptcha Token receive
  const action=(token)=>{
    if(token){
      setReCaptchaCode(token)
    }else{
      console.log('token not available')
    }
  }

  // OTP Verify API
  const postOTPToApi = async (otpValue) => {
    setIsLoading(true);
    let queyParams = {"code": otpValue, "email":value, 'googleCaptchaToken' : reCaptchaCode};
    if(option == 'phone') {
      queyParams =  {"code": otpValue, "phone":value, 'googleCaptchaToken' : reCaptchaCode};
    }
    const res = await otpVerify(queyParams);
    const data = await res.json();
    if(data) {
      setIsLoading(false)
      handleStorage(data)
    } else {
      console.log('data not available')
    }
  };

  // Alias API
  const postAliasToApi = async () => {
    setIsLoading(true);
    
    const queyParams = {params: 
      {
        "alias": value, 
        "fmsUtm":{fmsVisitorId: undefined}, 
        'googleCaptchaToken' : reCaptchaCode
      }, authToken: tokenID};
    const res = await aliasInput(queyParams);
    const data = await res.json();
    if(data) {
      setIsLoading(false);
      handleAliasResponse(data)
      
    } else {
      console.log('data not available');
    } 
  };

  const postBirthdateToApi = async (date) => {
    let tokenID = getData('token');
    setIsLoading(true);
      let queyParams = {params:  {
        "birthDate": date, 
        "fmsUtm":{fmsVisitorId: undefined},  
        'googleCaptchaToken' : reCaptchaCode
      }, authToken: tokenID};
      const res = await birthDateRegistration(queyParams);
      const data = await res.json();
      if(data) {
        setIsLoading(false);
        setData('user_dob', data?.details?.birthDate);
        // countriesList.mutate(tokenID);
        setScreen('Gender');
      } else {
        console.log('data not available')
      }
  }

  const postGenderCountryToApi = async (sex, country_code) => {
    let tokenID = getData('token');
    setIsLoading(true);
      let queyParams = {params:  {
        "country": country_code, 
        "sex": sex,
        "fmsUtm":{fmsVisitorId: undefined},  
        'googleCaptchaToken' : reCaptchaCode
      }, authToken: tokenID};
      const res = await genderCountryRegistration(queyParams);
      const data = await res.json();
      if(data) {
        setIsLoading(false);
        setData('user_country', data?.details?.country);
        setData('user_sex', data?.details?.sex);
        setData('isExtendedSignupCompleted', JSON.stringify(true));
        dispatch(selectedGender(''));
        dispatch(selectedCountry(''));
        closeSignup();
      } else {
        console.log('data not available')
      }
  }

  return (
    <Container source={require('../../images/BG.png')}>
      <Header 
        onCloseIconClick={onCloseIconClick}
        backIcon={screen != '' ? true : false}
        handleBack={handleBack}
        screenName={screen == 'Gender' ? 'DOB' : 'input'}
        setScreen={setScreen}
        setValue={setValue}
        text={screen == 'OTP' ? SIGN_IN_UP : ''}
        isBasicSignupCompleted={isBasicSignupCompleted}
      />
      {screen == '' ?
        <SignUpOptions 
          option={option}
          handleSelect={handleSelect}
          onCloseIconClick={onCloseIconClick}
        />
        :
        screen == 'input' ? 
          <SignInUpInputView 
            optionChoose={option}
            setOption={setOption}
            onCloseIconClick={onCloseIconClick}
            handleSumbit={handleSumbit}
            handleBack={handleBack}
            setValue={setValue}
            setScreen={setScreen}
            action={action}
            value={value}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
            error={error}
            setError={setError}
            isLoading={isLoading}
          />
          :
          screen == 'OTP' ? 
          <OTP 
            optionChoose={option}
            valuePrevious={value}
            setOption={setOption}
            handleBack={handleBack}
            setOTP={setOTP}
            otp={otp}
            setScreen={setScreen}
            postOTPToApi={postOTPToApi}
            action={action}
            otpError={error}
            setOtpError={setError}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            isLoading={isLoading}
          />
          :
          screen == 'ALIAS' ?
          <AliasView 
            optionChoose={option}
            setOption={setOption}
            onCloseIconClick={onCloseIconClick}
            handleBack={handleBack}
            postAliasToApi={postAliasToApi}
            setValue={setValue}
            action={action}
            value={value}
            error={error}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            setOtpError={setError}
            setScreen={setScreen}
            isLoading={isLoading}
          />
          :
          screen == 'DOB' ?
          <DateOfBirth 
            optionChoose={option}
            setOption={setOption}
            onCloseIconClick={onCloseIconClick}
            handleBack={handleBack}
            postBirthdateToApi={postBirthdateToApi}
            setDOB={setDOB}
            dob={dob}
            action={action}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
            setScreen={setScreen}
            isLoading={isLoading}
          />
          :
          screen == 'Gender' ?
            <GenderCountries 
              optionChoose={option}
              setOption={setOption}
              onCloseIconClick={onCloseIconClick}
              handleBack={handleBack}
              postGenderCountryToApi={postGenderCountryToApi}
              action={action}
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
              setScreen={setScreen}
              isLoading={isLoading}
              gender={gender}
              setGender={setGender}
              country={country}
              setCountry={setCountry}
            />
          :
          <></>
      }
    </Container>
  );
};

const Container = styled.ImageBackground`
  flex: 1;
`;