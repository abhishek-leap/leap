import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, Platform, SafeAreaView, View } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import CountryPicker from './components/countryPicker';
import GenderPicker from './components/genderPicker';
import SportsPicker from './components/sportsPicker';
import DareBackSecondStepBottomDrawer from './components/dareBackSecondStepBottomDrawer';
import HashtagPicker from './components/hashtagPicker';
import CompetitorPicker from './components/competitorPicker';
import DareBackFirstStep from './components/dareBackFirstStep';
// import Authentication from './components/authentication';
import SkillsPicker from './components/skillsPicker';
//  import CreateDare from '../../screens/createDare';
import FeedsThreeDots from './components/feedsThreeDots';
import { getData } from '../../utils/helper';
import ReportAbuse from './components/reportAbuse';
import BlockUser from './components/blockUser';
import CommentsBox from './components/comments';

const ANIMATION_DURATION = 500; // 5 sec

const BottomCommonDrawer = (props) => {
  const {countryShow, genderShow} = useSelector(state => state.authentication);
  const {creatDareshow, sportsShow, skillsShow, hashtagShow, competitorShow} = useSelector(state => state.createDare);
  const {darBackshow} = useSelector(state => state.dareBack);
  const {secondStepShow} = useSelector(state => state.dareBack);
  const { feedsThreeDotsShow, reportItemShow, blockUserShow, commentUIShow } = useSelector(state => state.feeds);

  // const {show, authStatus} = useSelector(state => state.authentication);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = (toValueSelected, duration) => {
    Animated.timing(slideAnimation, {
      toValue: toValueSelected,
      duration: duration, //ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let toValue = WINDOW_HEIGHT;
    let animationDuration = ANIMATION_DURATION
    if(countryShow || sportsShow || hashtagShow || competitorShow) {
        toValue = WINDOW_HEIGHT / 4;
    } else if (genderShow) {
        toValue = WINDOW_HEIGHT / 1.3;
    } else if (secondStepShow) { //creatDareshow || show
        toValue = 0;
        animationDuration = secondStepShow ? 100 : ANIMATION_DURATION;
    } else if (skillsShow) {
        toValue = WINDOW_HEIGHT / 1.7;
    } else if (darBackshow) {
      toValue = WINDOW_HEIGHT / 6;
    } else if (feedsThreeDotsShow) {
      const token = getData('token');
      if(token) {
        if(Platform.OS == 'ios') {
          toValue = WINDOW_HEIGHT / 1.55;
        } else {
          toValue = WINDOW_HEIGHT / 1.75;
        }
      } else {
        toValue = WINDOW_HEIGHT / 1.4;
      }
    } else if(reportItemShow) {
      if(Platform.OS == 'ios') {
        toValue = WINDOW_HEIGHT / 2.4;
      } else {
        toValue = WINDOW_HEIGHT / 3;
      }
    } else if(blockUserShow || commentUIShow) {
      toValue = WINDOW_HEIGHT / 4;
    } 
    toggleDrawer(toValue, animationDuration);
  }, [toggleDrawer, 
    countryShow, genderShow, 
    sportsShow, skillsShow, hashtagShow, 
    competitorShow, secondStepShow, 
    darBackshow, feedsThreeDotsShow, 
    reportItemShow, blockUserShow, 
    commentUIShow]);
  
  return (
    <>
      {/* <Container display={feedsThreeDotsShow}>
      
      </Container> */}
      <Animated.View
      style={{
        ...props.style,
        position: 'absolute',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // opacity: 0.5,
        transform: [{translateY: slideAnimation}],
      }}>
      <SafeAreaView>
        <Body>
          {countryShow ? 
            <CountryPicker />
            :
            genderShow ?
                <GenderPicker />
                :
                sportsShow ? 
                  <SportsPicker />
                  :
                  skillsShow ?
                    <SkillsPicker />
                    :
                    hashtagShow ? 
                      <HashtagPicker />
                      :
                      competitorShow ? 
                        <CompetitorPicker />
                        :
                        secondStepShow ?
                          <DareBackSecondStepBottomDrawer />
                          :
                          darBackshow ?
                            <DareBackFirstStep />
                            :
                            feedsThreeDotsShow ?
                              <FeedsThreeDots />
                              :
                              reportItemShow ?
                                <ReportAbuse />
                                :
                                blockUserShow ?
                                  <BlockUser />
                                  :
                                  commentUIShow ?
                                    <CommentsBox /> 
                                    :
                                    <></>
          }
        </Body>
      </SafeAreaView>
    </Animated.View>
    </>
    
  );
};

export default BottomCommonDrawer;

const Body = styled.View`
  height: 100%;
`;

const Container = styled.View`
  flex: 1;
  height: ${props => props.display ? '100%' : '0%'};
  width: 100%;
  // position: absolute;
  opacity: 0.1;

  position: absolute;
  margin-top: 20px;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
`