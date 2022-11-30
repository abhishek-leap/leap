import ContentLoader, {Rect} from 'react-content-loader/native';

const FeedLoader = () => (
  <ContentLoader
    viewBox="0 0 380 500"
    backgroundColor={'#333'}
    foregroundColor={'#999'}
    style={{width: '100%', height: '100%'}}>
    <Rect x="5" y="5" rx="4" ry="4" width="370" height="500" />
  </ContentLoader>
);

export default FeedLoader;
