import { useDispatch} from 'react-redux';
import Picker from '../../common/picker';
import { useSkillsGroup, useSkillsList } from '../../../hooks/useMasterAPI';
import { closeSkillsBottomDrawer, selectedSkills } from '../../../redux-ui-state/slices/createDareSlice';
import { useEffect } from 'react';

const SkillsPicker = (props) => {
  const dispatch = useDispatch();
  const skillsList = useSkillsList();
  const { status, data, error, isLoading, refetch, fetchNextPage } = useSkillsGroup()

  const onCloseIconClick = () => {
    dispatch(closeSkillsBottomDrawer());
  };

  useEffect(() => {
    if((skillsList.data === undefined) && (data != undefined)) {
      const searchSkillID = data?.filter((item) => (item.alias == 'player_technical' && item.entityName == 'Player'))
      skillsList.mutate(searchSkillID[0].id);
    }
  }, []);

  const handleItem = (item) => {
    dispatch(selectedSkills({name: item.name, value: item.id, alias: item.alias}));
    onCloseIconClick();
  }
  
  return (
    <Picker
        title={'Skills'} 
        data={skillsList.data}
        onCloseIconClick={onCloseIconClick}
        handleSelectItem={handleItem}
    />
  );
};

export default SkillsPicker;