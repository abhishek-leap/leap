import React from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import CloseIcon from '../../../images/close.svg';
import BackArrow from '../../../images/backArrow.svg';
import SkillIcon from "../../../images/Skill-transparent.svg";

const Header = ({ title, subTitle, details, handleClose, backIcon, handleBack }) => {
    const {colors} = useTheme();

    return (
        <TopView colors={colors}>
            <BackBtn onPress={() => handleBack()}>
                    {backIcon && <BackArrow style={{ color: colors.PLAYLEAP_WHITE }}/> }
            </BackBtn>
            <MiddleView>
                {title ? <ImageWIthText><SkillIcon/><HeaderTxt style={{fontStyle: 'italic', fontSize: 22, lineHeight: 25, opacity: 1}} colors={colors}>
                            {title}
                        </HeaderTxt></ImageWIthText> : <View></View>
                }
                {subTitle ? <HeaderTxt style={{ fontSize: 18, opacity: 0.8}} colors={colors}>{subTitle}</HeaderTxt> : <View></View>}
                {details ? <HeaderTxt style={{ fontSize: 15, opacity: 0.8}} colors={colors}>{details}</HeaderTxt> : <View></View>}
            </MiddleView>
            <ClosedContainer colors={colors}  onPress={() => handleClose()}>
                <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
            </ClosedContainer>
        </TopView>
    )
}

export default Header;

const BackBtn = styled.TouchableOpacity`
    left: 15px;
`;

const MiddleView = styled.View`
    flex-direction: column;
`;

const HeaderTxt = styled.Text`
    color: ${props => props.colors.PLAYLEAP_WHITE};
    text-align: center;
    font-size: ${props => props.style?.fontSize}'px';
    line-height: 25px;
    font-style: ${props => props.style?.fontStyle};
    opacity:  ${props => props.style?.opacity };
`;

const TopView = styled.View`
    width: 100%;
    background-color: ${props => props.colors.PLAYLEAP_DARK_BLUE};
    flex-direction: row;
    justify-content: space-between;
    border-radius: 25px 25px 0 0;
    padding: 10px 0 10px 0;
`;

const ClosedContainer = styled.TouchableOpacity`
    right: 20%;
`;
const ImageWIthText = styled.View`
    flex-direction: row;
    justify-content: center;
`;