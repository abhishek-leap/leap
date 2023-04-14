import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

// Images 
import BackArrow from '../../../images/backArrow.svg';
import CloseIcon from '../../../images/close.svg';
import { handleSetRoot } from '../../../navigation/navigationService';
import { removeAllData } from '../../../utils/helper';

const Header = ({backIcon, text, onCloseIconClick, handleBack, screenName, setScreen, setValue, currentScreen, isBasicSignupCompleted}) => {
    const {colors} = useTheme();

    const closeScreen = () => {
        if(screenName == 'input' && currentScreen == 'ALIAS') {
            removeAllData();
        }
        handleSetRoot({name: 'Feed'});
        onCloseIconClick(); 
        onCloseIconClick(); 
        setValue('')
        setScreen('')
    }

    const goBack  = () => {
        if (isBasicSignupCompleted == "true") {
            handleSetRoot({name: 'Feed'});
            onCloseIconClick(); 
        } else {
            handleBack(screenName);
        }
    }

    return (
        <TopView>
            {backIcon ?
                <BackBtn onPress={() => goBack()}>
                    <BackArrow style={{ color: colors.PLAYLEAP_WHITE }}/>
                </BackBtn>
                :
                <></>
            }
            {text ? <HeaderTxt color={colors.PLAYLEAP_WHITE}>{text}</HeaderTxt> : <View></View>}
            <ClosedContainer onPress={() => closeScreen()}>
                <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
            </ClosedContainer>
        </TopView>
    )
}

export default Header;

const ClosedContainer = styled.TouchableOpacity`
  right: 100%;
`;

const BackBtn = styled.TouchableOpacity`
    left: 100%;
`;

const HeaderTxt = styled.Text`
    color: ${props => props.color};
`;

const TopView = styled.View`
    flexDirection: row;
    justify-content: space-between;
    margin-top: 20px;
`;