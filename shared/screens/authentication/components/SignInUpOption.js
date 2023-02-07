import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from '@emotion/native';

// import 
import { color } from '../../../theme/color';
import { SIGN_IN_UP_FOR, 
  USE_EMAIL, USE_PHONE, 
  WINDOW_HEIGHT, 
  WINDOW_WIDTH 
} from '../../../constants';

// Images 
import LeapLogo from '../../../images/logo.svg';
import Email from '../../../images/email.svg';
import Phone from '../../../images/phone.svg';


const SignInUpOptions = ({ handleSelect }) => {
    return (
        <InnerView currentWidth={WINDOW_WIDTH}>
        <Title>{SIGN_IN_UP_FOR}</Title>
        <LeapLogo width={'50%'} height={'8%'} />
        <View>
          <Button topMargin={'10%'}>
            <LeftIconView>
              <Email style={{ color: color.PLAYLEAP_WHITE }}/>
            </LeftIconView>
            <Width40View>
              <TouchableOpacity  onPress={() => handleSelect('email', 'input')}>
                <BtnText>{USE_EMAIL}</BtnText>
              </TouchableOpacity>
            </Width40View>
          </Button>
          <Button>
            <LeftIconView>
              <Phone style={{ color: color.PLAYLEAP_WHITE }}/>
            </LeftIconView>
            <Width40View>
              <TouchableOpacity  onPress={() => handleSelect('phone', 'input')}>
                <BtnText>{USE_PHONE}</BtnText>
              </TouchableOpacity>
            </Width40View>
          </Button>
        </View>
      </InnerView>
    )
}

export default SignInUpOptions;

const LeftIconView = styled.View`
  width: 10%; 
  padding-horizontal: 4%;
`;

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
`;

const BtnText = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 0;
`;

const Width40View = styled.View`
  width: 40%;
`;

const Button = styled.View`
  border-width: 1px;
  border-color: rgba(255, 0, 172, 1);
  border-radius: 20px;
  padding: 5px 0 5px 0;
  margin: ${props => props?.topMargin || '5px'}  0 5px 0;
  flex-direction: row;
  background-color: #290c54;
  width: 100%;
`;