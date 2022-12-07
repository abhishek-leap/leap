import {Platform} from 'react-native';
import styled from '@emotion/native';
import BellIcon from '../images/bell-icon.svg';
import Logo from '../images/logo.svg';
import {useTheme} from '@react-navigation/native';

const Header = () => {
  const {colors} = useTheme();
  return (
    <Container platform={Platform.OS} colors={colors}>
      <Logo height={20} width={60} />
      <BellIcon />
    </Container>
  );
};

export default Header;

const Container = styled.View`
  background-color: ${props => props.colors.primary};
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  padding-top: ${props => (props.platform === 'ios' ? '45px' : '12px')};
`;
