import styled from "@emotion/native";
import { ReactComponent as BlockIcon } from "../../../images/block.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getYearMonthAndDay } from "../../../utils/helper";

const BlockItem = ({
  intl,
  disabled,
  onClick,
  id,
  blockedAt,
  blockerId,
  blockedText = "",
  blockersCount,
  isProfile
}) => {
  const [showContent, setShowContent] = useState(false);
  const isPowerUser = useSelector(({ user }) => user?.info?.isPowerUser);

  if (blockersCount && !blockedAt && !isPowerUser) {
    return <></>;
  }
  if (blockedAt && blockerId && !isPowerUser) {
    blockedText = isProfile
      ? intl.formatMessage({ id: "system_blocked_profile", defaultMessage: "your profile is blocked by the system" })
      : intl.formatMessage({ id: "system_blocked_video", defaultMessage: "your video is blocked by the system" });
    blockedAt = null;
  } else if (blockersCount && !blockerId && !blockedAt) {
    blockedText = blockersCount;
  } else if (!blockerId && blockedAt) {
    blockedText = intl.formatMessage({ id: "you_blocked", defaultMessage: "you blocked" });
  }

  const getBlockDate = val => {
    const { date, month, year } = getYearMonthAndDay(val);
    return `${date}/${month}/${year}`;
  };

  return (
    <Container>
      <Content
        background={(blockersCount || blockedAt) && !blockerId}
        show={showContent}
        onClick={e => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          if (!disabled) {
            const isOpen = !showContent;
            setShowContent(isOpen);
            if (onClick && id) {
              onClick(isOpen, id);
            }
          }
        }}
      >
        <BlockIcon />
        {showContent && <Text>{intl.formatMessage({ id: "blocked", defaultMessage: "blocked" })}</Text>}
      </Content>
      {showContent && (
        <Info>
          <InfoText ellipse={!(blockerId && !blockedAt)}>{blockedText}</InfoText>
          {blockedAt && <InfoText>{getBlockDate(blockedAt)}</InfoText>}
        </Info>
      )}
    </Container>
  );
};

export default BlockItem;

const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Content = styled.View`
  padding: 4.67px 8.78px;
  display: flex;
  align-items: center;
  gap: 4.5px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0) 59.62%),
    ${props => (props.background ? "#B86E00" : "#b80000")};
  border: 0.5px solid rgba(255, 255, 255, 0.53);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.71);
  border-radius: 0px 0px 14px 14px;
  position: absolute;
  top: 0;
  ${props => props.show && `width: 100%`}
`;

const Text = styled.View`
  font-family: "Metropolis";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;
`;

const Info = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  background: rgba(217, 217, 217, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.53);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.71);
  border-radius: 4px;
  padding: 27.8px 4.8px 4.8px;
`;

const InfoText = styled.View`
  font-family: "Metropolis";
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  color: #000000;
  width: 100%;
  ${props =>
    props.ellipse &&
    `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`}
`;
