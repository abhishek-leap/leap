import React from 'react';
import CreateDareIcon from '../../images/create-dare.svg';
import styled from '@emotion/native';
/**
* Override styles that get passed from props
**/
propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + (percent * 3.6);
  return rotateBy;
}

renderThirdLayer = (percent) => {
  if(percent > 50){
    /**
    * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
    * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
    * before passing to the propStyle function
    **/
    return <SecondProgressLayer rotateBy={propStyle((percent - 50), 45)}></SecondProgressLayer>
  }else{
    return <OffsetLayer></OffsetLayer>
  }
}

const ProgressBar = ({percent, progressBarShow}) => {
  let firstProgressLayerStyle;
  if(percent > 50){
      firstProgressLayerStyle = propStyle(50, -135);
  }else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return(
    progressBarShow ?
        <Container>
            <FirstProgressLayer firstProgressLayerStyle={firstProgressLayerStyle}>
            </FirstProgressLayer>
            <CreateDareIcon style={{marginBottom: 4}} height="30"/>
            {renderThirdLayer(percent)}
        </Container>
        :
        <CreateDareIcon style={{marginBottom: 4}} />

  );
}

export default ProgressBar;

const Container = styled.View`
    width: 52px;
    height: 52px;
    border-width: 10px;
    border-radius: 100px;
    border-color: grey;
    justify-content: center;
    align-items: center;
`;

const FirstProgressLayer = styled.View`
    width: 52px;
    height: 52px;
    border-width: 10px;
    border-radius: 100px;
    position: absolute;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-right-color: #3498db;
    border-top-color: #3498db;
    transform: rotate(${props => props.firstProgressLayerStyle ? props.firstProgressLayerStyle+'deg' : '-135deg'});
`;

const SecondProgressLayer = styled.View`
    width: 52px;
    height: 52px;
    position: absolute;
    border-width: 10px;
    border-radius: 100px;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-right-color: #3498db;
    border-top-color: #3498db;
    transform: rotate(${props => props.rotateBy ? props.rotateBy+'deg' : '45deg'});
`;

const OffsetLayer = styled.View`
    width: 52px;
    height: 52px;
    position: absolute;
    border-width: 10px;
    border-radius: 100px;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-right-color: grey;
    border-top-color: grey;
    transform: rotate(-135deg);
`;