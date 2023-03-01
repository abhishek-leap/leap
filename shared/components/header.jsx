import {Platform} from 'react-native';
import styled from '@emotion/native';
import BellIcon from '../images/bell-icon.svg';
import Logo from '../images/logo.svg';

const Header = () => {
  return (
    <Container platform={Platform.OS}>
      <Logo height={20} width={60} />
      <BellIcon />
    </Container>
  );
};

export default Header;

const Container = styled.View`
  background-color: #290C54;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  padding-top: ${props => (props.platform === 'ios' ? '45px' : '12px')};
`;
