import { useDispatch, useSelector} from 'react-redux';
import Picker from '../../common/picker';
import { closeReportBottomDrawer, toasterDisplayStatus, toasterMessage } from '../../../redux-ui-state/slices/feedsSlice';
import { useState, useRef } from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import { AppButton } from '../../common/appButton';
import { reportFeed } from '../../../apis';

const Comments = (props) => {
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
    dispatch(closeReportBottomDrawer());
  };

  const handleSelectItem = (item) => {
    selectedItem.current = item.name;
    selectedAttachmentId.current = feedItem.videos[0]?.id;
    // handleSendButton(item.name, feedItem.videos[0]?.id);
  }

  const handleSendButton = async () => {
    onCloseIconClick();
    const dicData = {
      reason: selectedItem.current,
      attachmentId: selectedAttachmentId.current,
      attachmentType: "video"
    }
    await reportFeed(dicData);
    dispatch(toasterMessage('Thanks for report'));
    dispatch(toasterDisplayStatus(true));
  }
  
  return (
    <>
    <Picker
      title={'Abuse Report'} 
      hr={true}
      data={abuseData}
      onCloseIconClick={onCloseIconClick}
      handleSelectItem={handleSelectItem}
      radioButton={true}
    />
    <HR colors={colors}/> 
    <SendButton>
      <AppButton 
          title={'Send'}
          width={'30%'}
          height={'4%'}
          isLoading={false}
          onPress={handleSendButton}
          backgroundColor={"#9900d9"}
          borderRadius={5}
      />
    </SendButton>
    
    </>
    
  );
};

export default Comments;

const HR = styled.View`
    background-color: ${props => props.colors.PLAYLEAP_PINK};
    height: 1px;
    margin: 4% 8% 1% 8%;
`;

const SendButton = styled.View`
    height: 100%;
    align-self: flex-end;
    margin: 2% 8% 0 0;

`;