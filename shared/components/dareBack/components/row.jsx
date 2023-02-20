import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import { parsePostBody } from '../../../utils';

const Row = ({ url, title, skills, hashtags, likeCount, ViewsCount, assetId, feedId, callBackFunction }) => {
    const {colors} = useTheme();
    let elements = ''
    if(title) {
        elements = parsePostBody(title);
    }
    // const bodyObj = JSON.parse(title);
    // const elements = bodyObj.blocks[0]?.text;

    return (
        <Container>
            <Card colors={colors}>
                <ImageView onPress={() => callBackFunction({url, title: elements, skills, hashTags: hashtags, assetId, feedId})}>
                    <Thumbnail 
                        source={{uri: url !== '' ? url : require('../../../images/BG.png')}}
                    />
                </ImageView>
                <RightView>
                    <Skills colors={colors}>
                        {skills}
                    </Skills>
                    <DareTitle colors={colors}>
                        {elements}
                    </DareTitle>
                    {hashtags.length > 0 && <HashTags colors={colors}>
                        {hashtags.map((item) => (
                            '#'+item+" "
                        ))}
                    </HashTags> }
                    <Likes colors={colors}>
                        {'Likes: '+ likeCount}
                    </Likes>
                    <Views colors={colors}>
                        {'Views: '+ ViewsCount}
                    </Views>
                </RightView>
            </Card>
            <HR colors={colors}/>
         </Container>
        
    )
}

export default Row;

const Container = styled.View`
    flex-direction: column;
    padding: 0 3% 0 3%;
`;
const Card = styled.View`
    flex-direction: row;
    margin: 20px 0 40px 20px;
`;
const ImageView = styled.TouchableOpacity`
    border: 0.5px solid rgba(255, 255, 255, 0.6);
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: 100%;
`;
const Thumbnail = styled.Image`
    width: 150px;
    height: 250px;
`;
const RightView = styled.View`
    flex-direction: column;
    justify-content: center;
    padding-left: 5%; 
`;
const DareTitle = styled.Text`
    color: ${props => props.colors.PLAYLEAP_SILVER};
    line-height: 25px;
    font-size: 16px;
    word-wrap: normal;
`;
const HashTags = styled.Text`
    color: ${props => props.colors.PLAYLEAP_SILVER};
    line-height: 25px;
    font-size: 16px;
`;
const Skills = styled.Text`
    color: ${props => props.colors.PLAYLEAP_WHITE};
    line-height: 25px;
    font-weight: 700;
    font-style: italic;
    font-size: 16px;
`;
const Likes = styled.Text`
    color: ${props => props.colors.PLAYLEAP_SILVER};
    line-height: 25px;
    font-size: 16px;
`;
const Views = styled.Text`
    color: ${props => props.colors.PLAYLEAP_SILVER};
    line-height: 25px;
    font-size: 16px;
`;
const HR = styled.View`
    background-color: ${props => props.colors.PLAYLEAP_DARK_BLUE};
    height: 1px;
    width: 100%;
`;