import { useDispatch, useSelector} from 'react-redux';
import Picker from '../../common/picker';
import { closeReportBottomDrawer, closeThreeDotsBottomDrawer, openBlockUsertBottomDrawer, openReportBottomDrawer, removeBlockedUsers, selectedBlockedUsers, toasterDisplayStatus, toasterDisplayWithMessage, toasterMessage } from '../../../redux-ui-state/slices/feedsSlice';
import { useEffect, useState } from 'react';
import { getData } from '../../../utils/helper';
import { openAuthenticationBottomDrawer } from '../../../redux-ui-state/slices/authenticationSlice';
import { blockUnblockFeed, blockUser } from '../../../apis';
import Clipboard from '@react-native-clipboard/clipboard';
import { handlePush, handleSetRoot } from '../../../navigation/navigationService';
import { BASE_URL_SITE } from '../../../apis/urls';
import Loader from '../../common/loader';
import styled from '@emotion/native';
import Block from '../../../images/block.svg';
import { useInfiniteFeeds } from '../../../hooks/useInfiniteFeeds';

const FeedsThreeDots = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {feedItem, blockedUsersList} = useSelector(state => state.feeds);
  const { refetch, fetchNextPage } = useInfiniteFeeds();
  const isPowerUser = feedItem?.communityBlockersCount > 0;
  const token =  getData('token');
  const userId =  getData('user_id');
  const [threeDotData, setThreeDotData] = useState([
    {name: "Post ID", code: "post", id: 0}, 
    {name: "View Profile", code: "profile", id: 1}, 
    {name: "Report", code: "report", id: 2}
  ])

  useEffect(() => {
    const isAlreadyBlocked = blockedUsersList.indexOf(feedItem.id);
    if(feedItem?.author?.entityId == userId) {
      setThreeDotData([ {name: "Post ID", code: "post", id: 0}, 
      {name: "View Profile", code: "profile", id: 1}, 
      {name: "Report", code: "report", id: 2},
      {name: "Delete Post", code: "DeletePost", id: 5}])
    } else if (token && isAlreadyBlocked == -1) {
      setThreeDotData([
        {name: "Post ID", code: "post", id: 0, }, 
        {name: "View Profile", code: "profile", id: 1}, 
        {name: "Report", code: "report", id: 2},
        {name: "Block Post", code: "BlockPost", id: 3, color: isPowerUser ? '#fff' : '#FF7474', image:  <BlockBGView><BlockUpperView><Block /></BlockUpperView></BlockBGView>},
        {name: "Block User", code: "BlockUser", id: 4, color: isPowerUser ? '#fff' : '#FF7474', image:  <BlockBGView><BlockUpperView><Block /></BlockUpperView></BlockBGView>}
      ])
    } else if (token && isAlreadyBlocked > -1) {
      setThreeDotData([
        {name: "Post ID", code: "post", id: 0}, 
        {name: "View Profile", code: "profile", id: 1}, 
        {name: "Report", code: "report", id: 2},
        {name: "UnBlock Post", code: "UnBlockPost", id: 3},
        {name: "Block User", code: "BlockUser", id: 4}
      ])
    }
  }, [])

  const onCloseIconClick = () => {
    dispatch(closeThreeDotsBottomDrawer());
  };

  const handleSelectItem = (item) => {
    if(item.id == 0) {
      onCloseIconClick();
      Clipboard.setString(BASE_URL_SITE+"/feed/" + feedItem.id);
      dispatch(toasterMessage('Linked copied to clipboard'));
      dispatch(toasterDisplayStatus(true));
    } else if (item.id == 1) {
      onCloseIconClick();
      handlePush({name: 'PlayerProfile'});
    } else if (item.id == 2) {
      onCloseIconClick();
      if (token) {
        dispatch(openReportBottomDrawer());
      } else {
        dispatch(openAuthenticationBottomDrawer());
      }
    } else if (item.id == 3) {
      const isAlreadyBlocked = blockedUsersList.indexOf(feedItem.id);
      if(isAlreadyBlocked !== -1) {
        blockUnblock(feedItem.videos[0]?.id, 'unblock');
      } else {
        blockUnblock(feedItem.videos[0]?.id, 'block');
      }
    } else if (item.id == 4) {
      onCloseIconClick();
      if (isPowerUser) {
        handleSendButton();
      } else {
        dispatch(openBlockUsertBottomDrawer());
      }
    } else if (item.id == 5) {
      onCloseIconClick();
      deletePost(feedItem.id);
    }
  }

  const deletePost = async (id) => {
    await deleteFeed(id)
  }

  const blockUnblock = async (attachmentId, type) => {
    setIsLoading(true);
    const dicData = {
      attachmentId: attachmentId,
      actionType: type
    }
    const responesBlock = await blockUnblockFeed(dicData);

    if(type === "block") {
      dispatch(selectedBlockedUsers(responesBlock[0]));
    } else {
      dispatch(removeBlockedUsers(responesBlock[0]))
    }
    setIsLoading(false);
    onCloseIconClick();
  }
  
  const handleSendButton = async () => {
    onCloseIconClick();
    const dicData = {
      userId: feedItem.videos[0]?.userId,
      actionType: 'block'
    }
    await blockUser(dicData);
    refetch();
  }

  return (
    <TopView>
      <Picker
        title={'More'} 
        hr={true}
        data={threeDotData}
        onCloseIconClick={onCloseIconClick}
        handleSelectItem={handleSelectItem}
        leftImageViewEnable={true}
      />
       {isLoading && <LoaderView>
        <Loader />
      </LoaderView> }
    </TopView>
  );
};

export default FeedsThreeDots;

const TopView = styled.View`
`;
const LoaderView = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const BlockUpperView = styled.View`
  flex-direction: row;
`;

const BlockBGView = styled.TouchableOpacity`
  padding: 4.67px 8.78px;
  display: flex;
  align-items: flex-start;
  background-color: #b80000; 
  border: 0.5px solid rgba(255, 255, 255, 0.53);
  box-shadow: rgb(0 0 0 / 71%) 0px 2px 2px;
  border-radius: 0px 0px 14px 14px;
  top: 0px;
`;