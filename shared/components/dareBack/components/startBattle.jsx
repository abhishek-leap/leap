import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

// Images
import ShareIcon from '../../../images/share.svg';
import ShieldIcon from '../../../images/shield.svg';
import VSShieldIcon from '../../../images/shield-v2.svg';

import { AppButton } from '../../common/appButton';
import { BUTTON_START_BATTLE } from '../../../constants';
import { getData } from '../../../utils/helper';
import { parsePostBody } from '../../../utils';

const StartBattle = ({ data, dareBackPostData, callBackStartBattleFunction }) => {
    const {colors} = useTheme();
    const [title] = parsePostBody(dareBackPostData?.body);

    return (
        <SpeedView>
            <BattleView>
                {/* <CardHeaderView>
                    <HeaderFirst>
                        {dareBackPostData.skills[0]?.alias}
                    </HeaderFirst>
                    <HeaderSecond>

                    </HeaderSecond>
                    <ShieldImage>

                    </ShieldImage>
                </CardHeaderView> */}
                <CardColumnView>
                    <CardHeader marginLeft={'10%'} colors={colors}>
                        <CardHeaderText colors={colors}>
                            {dareBackPostData.skills[0]?.alias}
                        </CardHeaderText>
                    </CardHeader>
                    <ImageViewer colors={colors}>
                        <Image source={{uri: dareBackPostData.videos[0]?.imageLink || require('../../../images/BG.png')}} />
                        <ImageShieldView><ShieldIcon height={'30'} width={'30'}/></ImageShieldView>
                        <Username colors={colors}>{dareBackPostData.author.alias.toUpperCase()}</Username>
                    </ImageViewer>
                    <CardLabel color={colors.PLAYLEAP_WHITE}>{title}</CardLabel>
                    {dareBackPostData?.hashTags?.length > 0 && 
                    <CardLabel color={colors.PLAYLEAP_WHITE}>
                        {dareBackPostData?.hashTags.map((item) => (
                            '#'+item+" "
                        ))}
                    </CardLabel> 
                    }
                </CardColumnView>
                <VSShieldView>
                    <VSShieldIcon height={'55'} width={'60'}/>
                </VSShieldView>
                <CardColumnView>
                    <ImageWithSkill>
                        <CardHeader colors={colors}>
                            <CardHeaderText colors={colors}>
                                {/* {data.skills} */}
                            </CardHeaderText>
                            <ShareIconView>
                                <ShareIcon color={colors.secondary} height={20} width={20}/>
                            </ShareIconView>
                        </CardHeader>
                        <ImageViewer colors={colors}>
                            <Image source={{uri: data?.url || require('../../../images/BG.png')}} />
                            <ImageShieldView><ShieldIcon height={'30'} width={'30'}/></ImageShieldView>
                            <Username colors={colors}>{getData('user_alias').toUpperCase()}</Username>
                        </ImageViewer>
                    </ImageWithSkill>
                    <CardLabel color={'rgb(109, 64, 177)'}>{data.title}</CardLabel>
                    {data?.hashTags?.length > 0 && 
                    <CardLabel color={colors.PLAYLEAP_WHITE}>
                        {data?.hashTags.map((item) => (
                            '#'+item+" "
                        ))}
                    </CardLabel> 
                    }
                </CardColumnView>
            </BattleView>
            <StartBattleBtn colors={colors}>
                <AppButton 
                    title={BUTTON_START_BATTLE}
                    width={'40%'}
                    height={'7%'}
                    isLoading={false}
                    onPress={callBackStartBattleFunction}
                />
            </StartBattleBtn>
            
        </SpeedView>
        
    )
}

export default StartBattle;


const SpeedView = styled.View`
    flex: 1;
`;
const BattleView = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 30px 0 0 0;
`;
const CardColumnView = styled.View`
    position: relative;
    width: 40%;
`;
const CardHeader = styled.View`
    position: absolute;
    top: -15px;
    z-Index: 1;
    background-color: ${props => props.colors.primary};
    border: 1px solid ${props => props.colors.secondary};
    // height: 10%;
    width: 90%;
    margin-left: ${props => props.marginLeft};
    padding: 2px 0 2px 0;
    border-radius: 20px;
`;
const CardHeaderText = styled.Text`
    display: flex;
    position: relative;
    color: ${props => props.colors.PLAYLEAP_WHITE};
    text-align: center;
    font-style: italic;
    font-weight: 500;
`;
const ImageViewer = styled.View`
    position: relative;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgb(160, 5, 255);
    border-radius: 5px 5px 0px 0px;
    object-fit: contain;
    margin-left: 8px;
`;
const Image = styled.Image`
    position: relative;
    // display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    min-height: 235px;
    overflow: hidden;
    // background-blend-mode: saturation;
    width: 100%;
    // object-fit: contain;
    padding: 15px 8px;
    margin: 0px 0px 0px;
}
`;
const StartBattleBtn = styled.View`
    height: 100%;
    flex-direction: row;
    justify-content: center;
`;
const CardLabel = styled.Text`
    text-align: left;
    padding: 10px 0 0 10px;
    color: ${props => props.color}
`;
const VSShieldView = styled.View`
    position: absolute;
    padding-left: 20px;
    z-Index: 1;
`;

const ShareIconView = styled.View`
    position: absolute;
    z-index: 1;
    // top: 0%;
    right: 1.5px;
`;

const Username = styled.Text`
    color: ${props => props.colors.PLAYLEAP_WHITE};
    text-align: center;
    position: absolute;
    padding: 50% 0% 0 0;
    z-Index: 1;
`;

const ImageWithSkill = styled.View`
`;

const ImageShieldView = styled.View`
    width: 34.5px;
    position: absolute;
    align-items: center;
    padding-top: 90%;
`;

// const CardHeaderView = styled.View`
//     position: absolute;
//     width: 90%;
//     // top: calc(0% - 13px);
//     left: 0px;
//     right: 0px;
//     margin: auto;
// `;
// const HeaderFirst = styled.Text`
// `;
// const HeaderSecond = styled.View`
// `;
// const ShieldImage = styled.View`
// `;