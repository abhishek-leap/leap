import { useDispatch} from 'react-redux';
import { closeAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import { useCountryList } from '../../../hooks/useMasterAPI';
import { SignInUp } from '../../authentication';
import { getData } from '../../../utils/helper';

const Authentication = ({authStatus}) => {
  const dispatch = useDispatch();
  const { data } = useCountryList();

  const onCloseIconClick = () => {
    dispatch(closeAuthenticationBottomDrawer());
  };
  
  return (
    <SignInUp onCloseIconClick={onCloseIconClick} isBasicSignupCompleted={getData('isBasicSignupCompleted')} authStatus={authStatus} />
  );
};

export default Authentication;