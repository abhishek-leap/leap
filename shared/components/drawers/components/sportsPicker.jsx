import { useDispatch} from 'react-redux';
import Picker from '../../common/picker';
import { useSportList } from '../../../hooks/useMasterAPI';
import { closeSportsBottomDrawer, selectedSport } from '../../../redux-ui-state/slices/createDareSlice';

const SportsPicker = (props) => {
  const dispatch = useDispatch();
  const { data } = useSportList();

  const onCloseIconClick = () => {
    dispatch(closeSportsBottomDrawer());
  };

  const handleItem = (item) => {
    dispatch(selectedSport({name: item.name, value: item.id}));
    onCloseIconClick();
  }
  
  return (
    <Picker
        title={'Sport #(Soccer)'} 
        data={data}
        onCloseIconClick={onCloseIconClick}
        handleSelectItem={handleItem}
    />
  );
};

export default SportsPicker;