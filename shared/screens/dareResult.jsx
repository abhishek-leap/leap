import React, { useState } from 'react';
import styled from '@emotion/native';
import { useTheme } from '@react-navigation/native';
import Svg, { ClipPath, Defs, Image, Polygon } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { View ,Platform, Dimensions} from 'react-native';
import { DARE_STATE } from '../constants';
import DareFooter from '../components/dare/dare.footer';
import { CLOSED_STATUS } from '../constants';
import DareResultHeader from '../components/dare/header.result';
import Profile from '../components/feed/components/profile';
import Battle from '../components/feed/components/battle';
import DareSeparator from '../components/dare/dare.separator';
import { getVotingsPercentages } from '../utils/helper';
import { FullAuthentication, openAuthenticationBottomDrawer } from '../redux-ui-state/slices/authenticationSlice';
import withAuthentication from '../hoc/withAuthentication';
import { voteAsset } from '../apis';
import ToastMessage from '../components/common/toast.message';

export const previewRotateDegs = "6.5deg";

const DareResult = ({
  stage, 
  route, 
  isBasicSignupCompleted, 
  isExtendedSignupCompleted,
}) => {
  const { dare, allDares, source, firstVideoProgress, secondVideoProgress } = route.params;
  const dareState = stage || DARE_STATE.PREVIEW;
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const asset1 = dare?.assets?.[0] || {};
  const asset2 = dare?.assets?.[1] || {};
  const { resultedVotesA, resultedVotesB } = getVotingsPercentages(
    asset1?.totalVotes,
    asset2?.totalVotes
  );
  const [votesA, setVotesA] = useState(resultedVotesA);
  const [votesB, setVotesB] = useState(resultedVotesB);
  const [votedAssetId, setVotedAssetId] = useState(dare?.votedAssetId);
  const [dareStatus, setDareStatus] = useState(dare.status);
  const curDareIndex = allDares?.findIndex(item => item.id === dare?.id);
  const nextDare = allDares[curDareIndex + 1];

  const voteForAsset = async ({ assetId, vote1, vote2 }) => {
    const response = await voteAsset({
      assetId: assetId,
      dareId: dare?.id,
    });
    // if (!isDareCenterEnable) {
    //   dispatch(enableDareCenter());
    // }

    if (response?.assets) {
      const { resultedVotesA: resultedA, resultedVotesB: resultedB } =
        getVotingsPercentages(vote1, vote2);
      setVotesA(resultedA);
      setVotesB(resultedB);
      setVotedAssetId(assetId);
    }
  };

  const Auth = () => {
    if (isBasicSignupCompleted != "true" || isExtendedSignupCompleted != "true") {
      dispatch(FullAuthentication(1));
      dispatch(openAuthenticationBottomDrawer());
    }
    return;
  }

  const onVote = (type) => {
    Auth();
    if (type === "down") {
      voteForAsset({
        assetId: asset2?.assetId,
        vote1: asset1?.totalVotes,
        vote2: asset2?.totalVotes + 1,
      });
    } else {
      voteForAsset({
        assetId: asset1?.assetId,
        vote1: asset1?.totalVotes + 1,
        vote2: asset2?.totalVotes,
      });
    }
    if(source == "bar") {
      setDareStatus("completed")
    }
  }

const height=Dimensions.get('window').height;

  return (
    <Container>
      <DareResultHeader dare={dare} allDares={allDares} source={source} nextDare={nextDare}/>
        <Wrapper>
        <View style={{
            height:"93%",
          }}>
          <PreviewScreens lower={false}  >
              {dareStatus === CLOSED_STATUS ? 
              <>
                  <Svg height="110%" width="100%">
                    <Defs>
                      <ClipPath id="clip">
                        <Polygon 
                          points="0,0 0,450 500,375, 500, 0"
                        />
                      </ClipPath>
                    </Defs>
                      <Image
                        width="100%"
                        height="110%"
                        preserveAspectRatio="xMidYMid slice"
                        href={{uri: dare?.assets?.[0]?.dareCover}}
                        clipPath="url(#clip)"
                      />
                  </Svg>
                <GrayscaleOverlay upper={true} platform={Platform.OS} ></GrayscaleOverlay>
                <PercentWrapper>
                  <Percentage>
                    <VoteFigure moreVotes={votesA > 50}>{Math.round(votesA) || 0}{'%'}</VoteFigure>
                  </Percentage>
                  <MiddleProfile>
                    <Profile author={{entityId: asset1?.userId}}/>
                  </MiddleProfile>
                  <Alias>{asset1?.userAlias}</Alias>
                  {votedAssetId === asset1?.assetId && (
                    <ToastMessage message={"You voted for"} />
                  )}
              </PercentWrapper>
              <BattelBackWrapper upper={true}>
                  <Battle width={63} height={70} item={dare}/>
              </BattelBackWrapper>
              </>
                :  <Svg height="110%" width="100%">
                  <Defs>
                    <ClipPath id="clip">
                      <Polygon 
                        points="0,0 0,450 500,375, 500, 0"
                      />
                    </ClipPath>
                  </Defs>
                  <Image
                    width="100%"
                    height="110%"
                    preserveAspectRatio="xMidYMid slice"
                    href={{uri: dare?.assets?.[0]?.dareCover}}
                    clipPath="url(#clip)"
                  />
                </Svg>}
               
          </PreviewScreens>
         
          <Middle platform={Platform.OS} >
            <DareSeparator
              dareState={dareStatus !== CLOSED_STATUS ? DARE_STATE.VOTE : ''}
              onVote={onVote}
            />
          </Middle>
          <PreviewScreens lower={true}>
          {dareStatus === CLOSED_STATUS ? 
              <>
                  <Svg height="110%" width="100%">
                    <Defs>
                      <ClipPath id="clip">
                        <Polygon 
                          points={`0,65 0,${height/2+7} ${height/2+7},${height/2+7}, ${height/2+7}, 0`}
                        />
                      </ClipPath>
                    </Defs>
                    <Image
                      width="100%"
                      height="110%"
                      preserveAspectRatio="xMidYMid slice"
                      href={{uri: dare?.assets?.[1]?.dareCover}}
                      clipPath="url(#clip)"
                    />
                  </Svg>
                  <GrayscaleOverlay upper={false} platform={Platform.OS} ></GrayscaleOverlay>
                <PercentWrapper>
                    <Percentage>
                    <VoteFigure moreVotes={votesB > 50}>{Math.round(votesB) || 0}{'%'}</VoteFigure>
                    </Percentage>
                    <MiddleProfile>
                      <Profile author={{entityId: asset2?.userId}}/>
                    </MiddleProfile>
                    <Alias>{asset2?.userAlias}</Alias>
                    {votedAssetId === asset1?.assetId && (
                        <ToastMessage message={"You voted for"} />
                    )}
                </PercentWrapper>
                <BattelBackWrapper  upper={false}>
                    <Battle width={63} height={70} item={dare}/>
                </BattelBackWrapper>
              </>
              : 
              <Svg height="110%" width="100%">
              <Defs>
                <ClipPath id="clip">
                  <Polygon 
                    points={`0,65 0,${height/2+7} ${height/2+7},${height/2+7}, ${height/2+7}, 0`}
                  />
                </ClipPath>
              </Defs>
              <Image
                width="100%"
                height="110%"
                preserveAspectRatio="xMidYMid slice"
                href={{uri: dare?.assets?.[1]?.dareCover}}
                clipPath="url(#clip)"
              />
            </Svg>
            }
          </PreviewScreens>
          </View>
          <Footer>
            <DareFooter
              firstLoaderProgress={firstVideoProgress}
              secondLoaderProgress={secondVideoProgress}
              bgColor={colors.PLAYLEAP_PROGRESS_BG_COLOR}
              progressColor={colors.PLAYLEAP_PROGRESS_COLOR}
            />
          </Footer>
        </Wrapper>
    </Container>
  );
};

export default withAuthentication(DareResult);

const Container = styled.View`
  height: 100%;
  background-color: #290c54;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PreviewScreens = styled.View`
  width: 100%;
  height: 55%;
  overflow:hidden;
  ${(props) =>
    props.lower ?
    ` position:relative;
    top:-10%;
`:``
}
`;
const Middle = styled.View`
  z-index: 2;
  width: 100%;
  transform:${(props) => (props.platform==="ios" ? "skewY(-8.5deg)" : "skewY(-9.5deg)")};
  justify-content: center;
  align-item: center;
  position : absolute;
  top:45%;
`;

const Footer = styled.View`
  height:7%;
`;

const PercentWrapper = styled.View`
  position: absolute;
  top: 40%;
  flex: 1;
  align-items: center;
  align-self: center;
  flex-direction: column;
`;

const Percentage = styled.View`
  ${(props) =>
    props.moreVotes &&
    `  background: linear-gradient(
    0.73deg,
    rgba(247, 108, 0, 0.86) -46.28%,
    rgba(250, 255, 0, 0.86) 52.6%
  ),
  #fff;
filter: drop-shadow(0px 5px 0px rgb(0 0 0 / 48%));
flex-direction: row;
`}
`;

const Alias = styled.Text`
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
`;

const VoteFigure = styled.Text`
  font-size: ${(props) => (props.moreVotes ? "32px" : "24px")};
  font-weight: 600;
  color: white;
  letter-spacing: 0.4px;
`;

const MiddleProfile = styled.View`
      padding-vertical: 20px;
`;

const BattelBackWrapper = styled.View`
  position: absolute;
  right: 16px;
  top: ${(props) => (props.upper ? "65" : "80")}%;
`;

const GrayscaleOverlay = styled.View`
      width: 120%;
      height: ${(props) => (props.upper ? props.platform==="ios" ? "125" : "120" : props.platform==="ios" ? "110": "110")}%;
      position: absolute;
      top: ${(props) => (props.upper ? props.platform==="ios" ? "-10" : "-10" : props.platform==="ios" ? "8" : "9")}%;
      background: rgba(38, 42, 82, 0.4);
      left:-10%;
      filter: grayscale(100%);
      transform:${(props) => (props.platform==="ios" ? "skewY(-8deg)" : "skewY(-9.7deg)")};
      overflow:hidden;
`;