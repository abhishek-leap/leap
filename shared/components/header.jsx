import styled from '@emotion/native';
import {Platform} from 'react-native';
import BellIcon from '../images/bell-icon.svg';
import Logo from '../images/logo.svg';
import {handlePush} from '../navigation/navigationService';
import {HEADER_HEIGHT} from '../constants';

const Header = () => {
  return (
    <Container platform={Platform.OS} height={HEADER_HEIGHT}>
      <Logo height={20} width={60} />
      <BellButton onPress={() => handlePush({name: 'Notification'})}>
        <BellIcon />
      </BellButton>
    </Container>
  );
};

export default Header;

const BellButton = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: #290c54;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  padding-top: ${props => (props.platform === 'ios' ? '0px' : '12px')};
  height: ${props => `${props.height}px`};
`;
