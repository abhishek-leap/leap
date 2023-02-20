import React from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import CreateDareIcon from '../../../images/create-dare.svg';
import { UPLOAD_FOR_BATTLE, UPLOAD_NEW } from '../../../constants';

const Footer = ({callBackFooterFunction}) => {
    const {colors} = useTheme();

    return (
        <TopView colors={colors} onPress={() => callBackFooterFunction()}>
                <TextView colors={colors}>{UPLOAD_NEW}</TextView>
                <HeaderTxt colors={colors}>
                    <CreateDareIcon height='80'/>
                </HeaderTxt>
                <TextView colors={colors}>{UPLOAD_FOR_BATTLE}</TextView>
        </TopView>
    )
}

export default Footer;

const HeaderTxt = styled.Text`
    color: ${props => props.colors.PLAYLEAP_WHITE};
    margin-top: 3%;
`;

const TopView = styled.TouchableOpacity`
    height: 30%;
    background-color: ${props => props.colors.PLAYLEAP_DARK_BLUE};
    flex-direction: row;
    justify-content: center;
    align-item: center;
`;

const TextView = styled.Text`
    padding: 0 5px 0 5px;
    color: ${props => props.colors.PLAYLEAP_WHITE};
    margin-top: 10%;
`;