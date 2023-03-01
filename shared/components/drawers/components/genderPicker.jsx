import { useDispatch} from 'react-redux';
import { closeGenderBottomDrawer, selectedGender} from '../../../redux-ui-state/slices/authenticationSlice';
import Picker from '../../common/picker';
import { useCountryList } from '../../../hooks/useMasterAPI';
import { MailIcon } from '../../../utils/images';
import { FemailIcon } from '../../../utils/images';

const GenderPicker = (props) => {
  const dispatch = useDispatch();
  const { data } = useCountryList();

  const onCloseIconClick = () => {
    dispatch(closeGenderBottomDrawer());
  };

  const handleSelectItem = (item) => {
    dispatch(selectedGender({name: item.name, value: item.code}));
    onCloseIconClick();
  }
  
  return (
    <Picker
      title={'Gender'} 
      data={[{name: "Male", code: "male", id: 0, image: <MailIcon />}, {name: "Female", code: "female", id: 1, image: <FemailIcon />}]}
      onCloseIconClick={onCloseIconClick}
      handleSelectItem={handleSelectItem}
    />
  );
};

export default GenderPicker;