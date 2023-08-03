import React from 'react';
import styled from '@emotion/native';
import { Platform } from 'react-native';
import { CLOSED_STATUS } from '../../constants';
import NextIcon from '../../images/arrowright.svg';
import HomeIcon from '../../images/home.svg';
import { handlePush, handleSetRoot } from '../../navigation/navigationService';
import CloseIcon from '../../images/close.svg'
import { useTheme } from '@react-navigation/native';

const DareResultHeader = ({ dare, allDares, nextDare, source }) => {
  const {colors} = useTheme();
  return (
    <Icons platform={Platform.OS} >
        <HomeImage onPress={() => handleSetRoot({name: 'Home'})}>
            {source === 'bar' ? 
              <HomeIcon width={28} height={28} />
              :
              <CloseIcon style={{ color: colors.PLAYLEAP_WHITE }} width={29} height={29} />
            }
        </HomeImage>
        {dare.status === CLOSED_STATUS && <Head><HeadText>Dare closed</HeadText></Head>}
        <NextButton onPress={() => {
                handlePush({name: 'DarePreview', params: {dare: nextDare, source: 'bar', allDares: allDares}})
            }}
        >
            { source === 'bar' && <><NextIcon width={35} height={35} />
            <Next>Next</Next></>}
        </NextButton> 
    </Icons>
  );
};

export default DareResultHeader;

const Icons = styled.View`
  position: absolute;
  z-index: 2;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  padding-left: 30px;
  flex-direction: row;
  padding-top:${(props) => (props.platform==="ios" ? "32px" : "24px")};
`;

const Head = styled.View`
`;

const HeadText = styled.Text`
    font-style: italic;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    letter-spacing: 1.33333px;
    text-transform: uppercase;
    color: #ffffff;
`;

const NextButton = styled.TouchableOpacity`

`;

const Next = styled.Text`
  font-size: 10px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
`;

const HomeImage = styled.TouchableOpacity`
    
`;