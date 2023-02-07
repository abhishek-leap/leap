import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

// import 
import { color } from '../../../theme/color';
import { DONE, KNOW_YOU_BETTER, NICKNAME, WINDOW_WIDTH } from '../../../constants';
import GetRecaptcha from './getRecaptcha';
import Loader from '../../../components/loader';

// images
import Header from './header';

const AliasView = ({optionChoose, setScreen, setOption, value, setValue, postAliasToApi, handleBack, onCloseIconClick, action, error, setOtpError, isSubmit, setIsSubmit, isLoading}) => {
    const {colors} = useTheme();
    
    const nextAPI = () => {
        if(value) { 
            setIsSubmit(false); 
            setOtpError('')
            postAliasToApi('OTP');
        } else {
            setIsSubmit(true); 
        }
    }

    return (
        <Container colors={colors}>
            <Header 
                onCloseIconClick={onCloseIconClick}
                backIcon={optionChoose != '' ? true : false}
                handleBack={handleBack}
                screenName={'input'}
                currentScreen={'ALIAS'}
                setOption={setOption}
                setScreen={setScreen}
                setValue={setValue}
            />
            <InnerView currentWidth={WINDOW_WIDTH}>
            <Title>{KNOW_YOU_BETTER}</Title>
            <SearchSection colors={colors} currentWidth={WINDOW_WIDTH}>
                <Input
                    value={value}
                    colors={colors}
                    placeholderTextColor={color.PLAYLEAP_LIGHT_GREY}
                    placeholder={NICKNAME}
                    onChangeText={(searchString) => setValue(searchString)}
                    underlineColorAndroid="transparent"
                />
            </SearchSection>
            {error != '' ? <Text style={{color: color.PLAYLEAP_PINK}}>{error}</Text> : null}
            {(value == '' && isSubmit)? <Text style={{color: colors.secondary}}>{'Required'}</Text> : null}
            <NextBtn optionChoose={optionChoose} colors={colors} searchValue={value}>
                <TouchableOpacity onPress={() => nextAPI()}>
                <NextBtnText>{!isLoading ? DONE : <Loader />}</NextBtnText>
                </TouchableOpacity>
            </NextBtn>
        </InnerView>
        <GetRecaptcha
            action={action}/>
      </Container>
    )
}

export default AliasView;

const Container = styled.View`
    flex: 1;
    background-color: ${props => props.colors.primary};
`;

const InnerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 6 +'px'};
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
    padding-left: 20px;
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