import {View, Platform} from 'react-native';
import styled from '@emotion/native';

import BellIcon from '../images/bell-icon.svg';
import Logo from '../images/logo.svg';

const Header = () => {
  return (
    <SubContainer platform={Platform.OS}>
      <Logo height={20} width={60} />
      <BellIcon />
    </SubContainer>
  );
};

export default Header;

const Container = styled.View`
  width: 100%;
  background-color: #290c54;
  padding-top: ${props => (props.platform === 'ios' ? '25px' : '40px')};
`;

const SubContainer = styled.View`
  background-color: #290c54;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  padding-top: ${props => (props.platform === 'ios' ? '45px' : '50px')};
`;
