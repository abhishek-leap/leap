import React from 'react';
import { TouchableOpacity, Text, View, KeyboardAvoidingView } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

// import 
import { ERROR_EMAIL_FORMAT, ERROR_PHONE_FORMAT, NEXT, PLACEHOLDER_EMAIL_ADDRESS, PLACEHOLDER_PHONE_NUMBER, WHAT_IS_EMAIL_ADDRESS, WHAT_IS_PHONE_NUMBER, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../constants';
import GetRecaptcha from './getRecaptcha';
import Header from './header';
import Loader from '../../common/loader';
// images
import Email from '../../../images/email.svg';
import Phone from '../../../images/phone.svg';
import { validateEmail, validatePhone } from '../../../utils/helper';
import { color } from '../../../theme/color';


const SignInUpInputView = ({optionChoose, setOption, setScreen, error, setError, value, setValue, handleSumbit, handleBack, onCloseIconClick, action, setIsSubmit, isSubmit, isLoading}) => {
    const {colors} = useTheme();

    const nextAPI = () => {
        if(value && error == '' && isSubmit == true) {
            setIsSubmit(false); 
            handleSumbit('OTP');
        } else {
            setIsSubmit(true);
        }
    }

    const Validation = (verifyValue) => {
        setValue(verifyValue)
        if (optionChoose == 'email') {
            if(validateEmail(verifyValue)) {
                setIsSubmit(true); 
                setError('');
            } else {
                setError(ERROR_EMAIL_FORMAT);
            }   
        } else {
            if (validatePhone(verifyValue)){
                setIsSubmit(true); 
                setError('');
            } else {
                setError(ERROR_PHONE_FORMAT)
            }
        }
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{backgroundColor: colors.primary, flex: 1}}>
                <Header 
                    onCloseIconClick={onCloseIconClick}
                    backIcon={optionChoose != '' ? true : false}
                    handleBack={handleBack}
                    screenName={''}
                    setScreen={setScreen}
                    setOption={setOption}
                    setValue={setValue}
                />
                <InnerView currentWidth={WINDOW_HEIGHT}>
                    <Title>{optionChoose == 'email' ? WHAT_IS_EMAIL_ADDRESS : WHAT_IS_PHONE_NUMBER}</Title>
                    <SearchSection currentWidth={WINDOW_WIDTH} colors={colors} searchValue={value}>
                        {optionChoose == 'email' ?
                            <EmailIcon color={colors.PLAYLEAP_WHITE}/>
                            :
                            <PhoneIcon color={colors.PLAYLEAP_WHITE}/>
                        }
                        
                        <Input
                            value={value}
                            colors={colors}
                            placeholderTextColor={colors.PLAYLEAP_WHITE}
                            placeholder={optionChoose == 'email' ? PLACEHOLDER_EMAIL_ADDRESS : PLACEHOLDER_PHONE_NUMBER}
                            onChangeText={(searchString) => Validation(searchString)}
                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            keyboardType={optionChoose == 'email' ? 'default' : 'phone-pad'}
                        />
                    
                    </SearchSection>
                    {error != '' ? <View style={{width: WINDOW_WIDTH / 1.7}}><Text style={{color: color.PLAYLEAP_PINK}}>{error}</Text></View> : null}
                    {(value == '' && isSubmit)? <Text style={{color: colors.secondary}}>{'Required'}</Text> : null}
                    <NextBtn optionChoose={optionChoose} colors={colors} searchValue={value}>
                        <TouchableOpacity onPress={() => nextAPI()}>
                            <NextBtnText>{!isLoading ? NEXT : <Loader />}</NextBtnText>
                        </TouchableOpacity>
                    </NextBtn>
                </InnerView>
                
                <GetRecaptcha
                    action={action}/>
        </KeyboardAvoidingView>
    )
}

export default SignInUpInputView;

const InnerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 6};
`;

const SearchSection = styled.View`
    width: ${props => props.currentWidth / 1.7+'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 10%;
`;

const Title = styled.Text`
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 22px;
    padding-bottom: 8px;
    flex-wrap: wrap;
    width: 45%;
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
    margin-top: 10%;
`;

const Input = styled.TextInput`
    flex: 1;
    border-radius: 20px;
    padding-vertical: 5px;
    padding-right: 10px;
    background-color: ${props => props.colors.primary};
    color: ${props => props.colors.PLAYLEAP_WHITE};
`;

const EmailIcon = styled(Email)`
    margin: 10px;
`;

const PhoneIcon = styled(Phone)`
    margin: 10px;
`;