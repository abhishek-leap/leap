import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import Picker from '../common/picker';
import { useSkillsGroup, useSkillsList } from '../../hooks/useMasterAPI';
import { closeSkillsBottomDrawer, selectedSkills } from '../../redux-ui-state/slices/createDareSlice';

const ANIMATION_DURATION = 500; // 5 sec

const SkillsDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const skillsList = useSkillsList();
  const skillGroup = useSkillsGroup();
  const {skillsShow} = useSelector(state => state.createDare);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: skillsShow ? WINDOW_HEIGHT / 1.7 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeSkillsBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, skillsShow]);

  useEffect(() => {
    if(skillGroup.data == undefined) {
      skillGroup.mutate();
    }
    if((skillsList.data === undefined) && (skillGroup?.data != undefined)) {
      const searchSkillID = skillGroup?.data?.filter((item) => (item.alias == 'player_technical' && item.entityName == 'Player'))
      skillsList.mutate(searchSkillID[0].id);
    }
    
  }, [skillsShow]);

  const handleItem = (item) => {
    dispatch(selectedSkills({name: item.name, value: item.id, alias: item.alias}));
    onCloseIconClick();
  }

  return (
    <Animated.View
      style={{
        ...props.style,
        position: 'absolute',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        transform: [{translateY: slideAnimation}],
      }}>
      <SafeAreaView>
        <Body>
          <Picker
              title={'Skills'} 
              data={skillsList.data}
              onCloseIconClick={onCloseIconClick}
              handleSelectItem={handleItem}
          />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SkillsDrawer;

const Body = styled.View`
  height: 100%;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;
