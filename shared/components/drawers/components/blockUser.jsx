import { useDispatch, useSelector} from 'react-redux';
import Picker from '../../common/picker';
import { closeBlockUsertBottomDrawer, closeReportBottomDrawer } from '../../../redux-ui-state/slices/feedsSlice';
import { useState, useRef } from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import { AppButton } from '../../common/appButton';
import { blockUnblockFeed, blockUser, reportFeed } from '../../../apis';
import CloseIcon from '../../../images/close.svg';

const BlockUser = (props) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const {feedItem} = useSelector(state => state.feeds);
  const selectedItem = useRef('');
  const selectedAttachmentId = useRef('');

  const [abuseData, setAbuseData] = useState([
    {name: "Its spam", id: 0}, 
    {name: "Nudity or sexual activity", id: 1}, 
    {name: "Hate Speech or symbols",  id: 2}, 
    {name: "Harasment",  id: 3}, 
    {name: "Sucide", id: 4}, 
    {name: "Scam",  id: 5}, 
    {name: "False information", id: 6}, 
    {name: "I just don’t like it", id: 7}, 
  ])

  const onCloseIconClick = () => {
    dispatch(closeBlockUsertBottomDrawer());
  };

  const handleSendButton = async () => {
    onCloseIconClick();
    const dicData = {
      userId: feedItem.videos[0]?.userId,
      actionType: 'block'
    }
    await blockUser(dicData)
  }
  
  return (
    <>
    <Header>
        <TitleTxt>
            {'Block User'}
        </TitleTxt>
        <ClosedContainer onPress={() => onCloseIconClick()}>
            <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
        </ClosedContainer>
    </Header>
    <HR colors={colors}/> 
    <BlockInformation>
      <ParaTitle colors={colors}>
          Block {feedItem?.author?.name} ?
      </ParaTitle>
      <ParaDetails colors={colors}>
          {"They won't be able to find your profile, posts or Dares on Leap. Leap won't let them know you blocked them."}
      </ParaDetails>
      <SendButton>
       <AppButton 
            title={'Cancel'}
            width={'45%'}
            height={'3%'}
            isLoading={false}
            onPress={onCloseIconClick}
            backgroundColor={colors.PLAYLEAP_DARK_PINK}
            borderRadius={15}
        />
        <AppButton 
            title={'Block'}
            width={'45%'}
            height={'3%'}
            isLoading={false}
            onPress={handleSendButton}
            backgroundColor={colors.PLAYLEAP_DARK_PINK}
            borderRadius={15}
        />
      </SendButton>
    </BlockInformation>
    </>
    
  );
};

export default BlockUser;

const HR = styled.View`
    background-color: ${props => props.colors.PLAYLEAP_PINK};
    height: 1px;
    margin: 4% 8% 1% 8%;
`;

const SendButton = styled.View`
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin: 20% 8% 0 0;
`;

const Header = styled.View`
    flex-direction: row;
    padding: 10px;
`;
const TitleTxt = styled.Text`
  color: white;
  font-size: 16px;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  margin-top: 10px;
`;

const ParaTitle = styled.Text`
  color: ${props => props.colors.PLAYLEAP_WHITE};
  font-weight: 700;
  font-size: 14px;
  line-height: 26px;
  padding-vertical: 20px;
  text-transform: capitalize;
`;

const ParaDetails = styled.Text`
  color: ${props => props.colors.PLAYLEAP_WHITE};
  font-weight: 400;
  font-size: 12px;
  line-height: 26px;
  letter-spacing: 0.25px;
`;

const BlockInformation = styled.View`
  padding: 55px;
`;