import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

// Images 
import BackArrow from '../../../images/backArrow.svg';

const Header = ({ text, handleBack }) => {
    const {colors} = useTheme();

    const goBack  = () => {
        handleBack();
    }

    return (
        <TopView>
             <BackBtn onPress={() => goBack()}>
                <BackArrow style={{ color: colors.PLAYLEAP_WHITE }}/>
            </BackBtn>
            {text ? <HeaderTxt color={colors.PLAYLEAP_WHITE}>{text}</HeaderTxt> : <View></View>}
        </TopView>
    )
}

export default Header;

const BackBtn = styled.TouchableOpacity`
    position: absolute;
    left: 5px;
    padding: 0 5px 40px 5px;
`;

const HeaderTxt = styled.Text`
    color: ${props => props.color};
`;

const TopView = styled.View`
    flexDirection: row;
    justify-content: space-around;
    margin-bottom: 5%;
`;