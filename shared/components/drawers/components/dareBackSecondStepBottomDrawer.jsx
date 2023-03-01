import { useDispatch} from 'react-redux';
import { closeDareBackSecondStepBottomDrawer } from '../../../redux-ui-state/slices/dareBackSlice';
import DareBackSecondStep from '../../dareBack/components/dareBackSecondStep';

const DareBackSecondStepBottomDrawer = (props) => {
  const dispatch = useDispatch();

  const onCloseIconClick = () => {
    dispatch(closeDareBackSecondStepBottomDrawer());
  };
  
  return (
    <DareBackSecondStep 
        onCloseIconClick={onCloseIconClick}
   />
  );
};

export default DareBackSecondStepBottomDrawer;