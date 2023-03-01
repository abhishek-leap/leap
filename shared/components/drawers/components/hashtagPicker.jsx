import { useDispatch} from 'react-redux';
import Picker from '../../common/picker';
import { useHashtagList } from '../../../hooks/useMasterAPI';
import { closeHastagBottomDrawer, selectedHashtags } from '../../../redux-ui-state/slices/createDareSlice';

const HashtagPicker = (props) => {
  const dispatch = useDispatch();
  const { status, data, error, isLoading, refetch, fetchNextPage } = useHashtagList();

  const onCloseIconClick = () => {
    dispatch(closeHastagBottomDrawer());
  };

  const handleItem = (item) => {
    dispatch(selectedHashtags({name: item.name, value: item.name}));
    onCloseIconClick();
  }
  
  return (
    <Picker
        title={'Hashtags'} 
        data={data}
        onCloseIconClick={onCloseIconClick}
        handleSelectItem={handleItem}
    />
  );
};

export default HashtagPicker;