import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {DID_NOT_RECEIVE_CODE, 
    NEXT, 
    SEND_AGAIN, TO_EMAIL_ADDRESS, 
    TO_PHONE_NUMBER, WE_SENT_AUTH_CODE,
    WINDOW_WIDTH
} from '../../../constants';
import { color } from '../../../theme/color';
import GetRecaptcha from './getRecaptcha';
import { useState } from 'react';
import Loader from '../../../components/loader';

export const OTP = ({optionChoose, postOTPToApi, setScreen, valuePrevious, isSubmit, setIsSubmit, action, otpError, isLoading}) => {
    const CELL_COUNT = 6;
    const {colors} = useTheme();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const nextAPI = () => {
        if(value) {
            setIsSubmit(false); 
            postOTPToApi(value)
        } else {
            setIsSubmit(true); 
        }
    }

  return (
    <>
      <InnerView currentWidth={WINDOW_WIDTH}>
        <Title>{WE_SENT_AUTH_CODE}</Title>
        <SubTitle>{optionChoose == 'email' ? TO_EMAIL_ADDRESS + valuePrevious : TO_PHONE_NUMBER + valuePrevious}</SubTitle>
        <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            )}
        />
        {otpError != '' ? <Text style={{color: color.PLAYLEAP_PINK}}>{otpError}</Text> : null}
        {(value == '' && isSubmit)? <Text style={{color: colors.secondary}}>{'Required'}</Text> : null}
        <NotReceiveCode colors={colors}>{DID_NOT_RECEIVE_CODE}</NotReceiveCode>
        <TouchableOpacity>
            <SendAgain colors={colors}>{SEND_AGAIN}</SendAgain>
        </TouchableOpacity>
        <NextBtn colors={colors}>
            <TouchableOpacity onPress={() => nextAPI()}>
                <NextBtnText>{!isLoading ? NEXT : <Loader />}</NextBtnText>
            </TouchableOpacity>
        </NextBtn>
        
      </InnerView>
      <GetRecaptcha action={action}/>
      </>
  );
};

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: 20, 
        marginBottom: 20
    },
    cell: {
        width: 30,
        height: 40,
        lineHeight: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#9900d9',
        borderRadius: 20,
        textAlign: 'center',
        color: '#FFFFFF',
      },
      focusCell: {
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255, 0.5)'
      },
});

const InnerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 8+'px'};
`;

const Title = styled.Text`
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 22px;
    padding-bottom: 8px;
    flex-wrap: wrap;
    width: 51%;
    text-align: center;
`;

const NextBtnText = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 30px;
`;

const NextBtn = styled.View`
    border-radius: 20px;
    padding-vertical: 5px;
    background-color: ${props => props.searchValue == '' ? props.colors.PLAYLEAP_SILVER : props.colors.secondary};
    justify-content: center;
    align-items: center;
    margin-top: 40%;
`;

const SubTitle = styled.Text`
    color: hsla(0,0%,100%,.6);
    font-weight: 500;
    font-size: 12px;
    padding-bottom: 8px;
    flexW-wrap: wrap;
    width: 45%;
    text-align: center;
`;

const NotReceiveCode = styled.Text`
    margin-top: 50px;
    color: ${props => props.colors.PLAYLEAP_WHITE};
`;

const SendAgain = styled.Text`
    color: ${props => props.colors.secondary};
`;
