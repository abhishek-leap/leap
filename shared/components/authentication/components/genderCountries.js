import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// import 
import { DONE,
  WE_ARE_ALMOST_DONE, 
  WINDOW_WIDTH 
} from '../../../constants';
import {openGenderBottomDrawer, openCountryBottomDrawer} from '../../../redux-ui-state/slices/authenticationSlice';

// Images 
import ArrowIcon from '../../../images/arrowHeadDown.svg';
import GetRecaptcha from './getRecaptcha';
import Loader from '../../common/loader';
import { useCountryList } from '../../../hooks/useMasterAPI';

const GenderCountries = ({ optionChoose, value, isLoading, postGenderCountryToApi, action }) => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const { data } = useCountryList();
    const { genderName } = useSelector(state => state.authentication);
    const { countryName } = useSelector(state => state.authentication);
    
    const nextAPI = () => {
      postGenderCountryToApi(genderName.value, countryName.value);
    }

    return (
        <>
        <InnerView currentWidth={WINDOW_WIDTH}>
          <Title>{WE_ARE_ALMOST_DONE}</Title> 
          <SelectGender onPress={() => dispatch(openGenderBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors} searchValue={value}>
              <Selected colors={colors}>{genderName?.name || "Gender"}</Selected>
              <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
          </SelectGender>
          <SelectCountry onPress={() => dispatch(openCountryBottomDrawer())} currentWidth={WINDOW_WIDTH} colors={colors} searchValue={value}>
              <Selected colors={colors}>{countryName?.name || "Country"}</Selected>
              <DownArrow color={colors.PLAYLEAP_WHITE} width={50}/>
          </SelectCountry>
          <NextBtn optionChoose={optionChoose} colors={colors} searchValue={value}>
              <TouchableOpacity onPress={() => nextAPI()}>
                  <NextBtnText>{!isLoading ? DONE : <Loader />}</NextBtnText>
              </TouchableOpacity>
          </NextBtn>
      </InnerView>
      <GetRecaptcha
                  action={action}/>
      </>
    )
}

export default GenderCountries;

const InnerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 6};
`;

const Title = styled.Text`
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 22px;
    padding-bottom: 8px;
    width: 40%;
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

const SelectGender = styled.TouchableOpacity`
    width: ${props => props.currentWidth / 2+'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 10%;
`;

const SelectCountry = styled.TouchableOpacity`
    width: ${props => props.currentWidth / 2+'px'};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.colors.primary};
    margin-top: 4%;
`;

const DownArrow = styled(ArrowIcon)`
    margin: 10px;
`;

const Selected = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    font-size: 14px;
    padding-bottom: 8px;
    width: 70%;
    padding-left: 30px;
    padding-top: 7px;
`;