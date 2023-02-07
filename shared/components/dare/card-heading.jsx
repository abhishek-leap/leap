import { StyleSheet, View } from 'react-native';

const CardHeading=({color,bold,text})=>{
return <View color={color} bold={bold}>{text}</View>;
}
export default CardHeading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

// const HeadingText = styled.View`
//   font-size: 12px;
//   word-break: normal;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   font-family: Metropolis;
//   font-style: normalize;
//   font-weight:${props => props.bold?500:400};
//   line-height: 16px;
//   letter-spacing: 0.8px;
//   color: ${props => props.color};
//   font-family:${props => props.bold?'Metropolis-Bold':'Metropolis'};
//   white-space: nowrap;
//   overflow: hidden;
//   display: block;
//   text-overflow: ellipsis;
// `;