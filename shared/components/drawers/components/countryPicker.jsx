import { useDispatch} from 'react-redux';
import {closeCountryBottomDrawer, selectedCountry} from '../../../redux-ui-state/slices/authenticationSlice';
import Picker from '../../common/picker';
import { useCountryList } from '../../../hooks/useMasterAPI';

const CountryPicker = (props) => {
  const dispatch = useDispatch();
  const { data } = useCountryList();

  const onCloseIconClick = () => {
    dispatch(closeCountryBottomDrawer());
  };

  const handleSelectItem = (item) => {
    dispatch(selectedCountry({name: item.name, value: item.code}));
    onCloseIconClick();
  }
  
  return (
    <Picker
        title={'Country'} 
        data={data}
        onCloseIconClick={onCloseIconClick}
        handleSelectItem={handleSelectItem}
    />
  );
};

export default CountryPicker;