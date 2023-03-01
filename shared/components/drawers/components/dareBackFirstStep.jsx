import { useDispatch, useSelector} from 'react-redux';
import { closeDareBackBottomDrawer } from '../../../redux-ui-state/slices/dareBackSlice';
import DareBack from '../../dareBack';

const DareBackFirstStep = (props) => {
  const dispatch = useDispatch();
  const {selectedPostItem} = useSelector(state => state.dareBack);

  const onCloseIconClick = () => {
    dispatch(closeDareBackBottomDrawer());
  };
  
  return (
    <DareBack 
      selectedPostItem={selectedPostItem}
      onCloseIconClick={onCloseIconClick}
   />
  );
};

export default DareBackFirstStep;