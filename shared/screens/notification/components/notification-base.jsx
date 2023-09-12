import React from 'react';
import styled from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

const NotificationBase = ({
  read,
  left,
  middle,
  right,
  alignLeft,
  alignMiddle,
  alignRight,
  justifyLeft,
  justifyMiddle,
  justifyRight,
  paddingLeft,
  paddingMiddle,
  paddingRight,
  onClick,
  height,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
   <Root height={height}>
      <Container read={read} height={height}>
      <LinearGradient colors={read ? ['#290C54','#290C54'] : ['#290c54', '#9900d9']}
                                      start={{x: 0.0, y: 1.0}}
                                      end={{x: 1.0, y: 1.0}}
                                      style={{height:"100%", width:"100%", display:"flex", flexDirection:"row"}}
                                      >
        <LeftWrapper
          align={alignLeft}
          justify={justifyLeft}
          onClick={handleClick}
          pad={paddingLeft}
        >
          {left}
        </LeftWrapper>
        <MiddleWrapper
          align={alignMiddle}
          justify={justifyMiddle}
          pad={paddingMiddle}
        >
          {middle}
        </MiddleWrapper>
        <RightWrapper
          align={alignRight}
          justify={justifyRight}
          pad={paddingRight}
        >
          {right}
        </RightWrapper>
      </LinearGradient>
      </Container>
      <BottomLine />
    </Root>
  );
};

export default NotificationBase;

const Root = styled.View`
  display: flex;
  flex-direction:row;
  width: 100%;
  ${(props) => (props.height ? `height: ${props.height}` : `min-height:74px;`)};
  position: relative;
`;

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction:row;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  width: 100%;
  ${(props) => (props.height ? `` : `min-height:74px;`)};
  height: 100%;
  max-height: 74px;
`;

const LeftWrapper = styled.View`
  flex: 20;
  padding: ${(props) => props.pad || "5px"};
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "flex-start"};

`;

const MiddleWrapper = styled.View`
  width: 100%;
  height: 100%;
  flex: 53;
  max-height: 74px;
  padding: ${(props) => props.pad || "9px"};
  display: flex;
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
`;

const RightWrapper = styled.View`
  flex: 27;
  max-height: 74px;
  height: 100%;
  padding: ${(props) => props.pad || "9px"};
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
`;

const BottomLine = styled.View`
  position: absolute;
  bottom: 0.5px;
  width: 76.25%;
  margin-left: 18.75%;
  border: none;
  border-bottom: 0.5px solid rgba(153, 0, 217, 0.38);
`;