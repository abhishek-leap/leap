import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

// import
import { NEXT, 
  WHAT_IS_YOUR_BIRTHDAY, 
  WINDOW_WIDTH 
} from '../../../constants';

// Images
import Loader from '../../common/loader';
import GetRecaptcha from './getRecaptcha';

const DateOfBirth = ({ optionChoose, value, isLoading, postBirthdateToApi, setDOB, action }) => {
    const {colors} = useTheme();
    const [date, setDate] = useState("");

    const addZero = (a) => {
      if (a < 10 && a > 0) {
          return '0' + a.toString();
      } else {
          return a;
      }
    }
    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return year + '-' + addZero(month) + '-' + addZero(date);//yyyy-mm-dd
    }

    const getMaxDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return year + '-' + addZero(month) + '-' + addZero(date);//yyyy-mm-dd
    }

    const nextAPI = async () => {
      let dateFormatChange = date.split('-');
      dateFormatChange = dateFormatChange[0] + '/' + dateFormatChange[1] + '/' + dateFormatChange[2];
      setDOB(dateFormatChange);
      postBirthdateToApi(dateFormatChange);
    }

    return (
          <>
            <InnerView currentWidth={WINDOW_WIDTH}>
              <Title>{WHAT_IS_YOUR_BIRTHDAY}</Title> 
              <Calendar
                  current={getCurrentDate().toString()}
                  maxDate={getMaxDate().toString()}
                  monthFormat={'MMMM yyyy'}
                  onDayPress={day => {
                      setDate(day.dateString)
                  }}
                  hideArrows={false}
                  hideExtraDays={true}
                  disableMonthChange={false}
                  firstDay={1}
                  theme={{
                      todayTextColor: 'red',
                  }}
                  markedDates={{
                    [date]: { selected: true },
                  }}
                  enableSwipeMonths={true}
              />
              <NextBtn optionChoose={optionChoose} colors={colors} searchValue={value}>
                  <TouchableOpacity onPress={() => nextAPI()}>
                      <NextBtnText>{!isLoading ? NEXT : <Loader />}</NextBtnText>
                  </TouchableOpacity>
              </NextBtn>
          </InnerView>
          <GetRecaptcha
                  action={action}/>
        </>
    )
}

export default DateOfBirth;

const InnerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.currentWidth / 6};
`;

const Title = styled.Text`
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 22px;
    padding-bottom: 8px;
    width: 40%;
    text-align: center;
`;

const BtnText = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 0;
`;

const Width40View = styled.View`
  width: 40%;
`;

const Button = styled.View`
  border-width: 1px;
  border-color: rgba(255, 0, 172, 1);
  border-radius: 20px;
  padding: 5px 0 5px 0;
  margin: ${props => props?.topMargin || '5px'}  0 5px 0;
  flex-direction: row;
  background-color: #290c54;
  width: 100%;
`;

const NextBtnText = styled.Text`
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 0 30px 0 30px;
`;

const NextBtn = styled.View`
    border-radius: 20px;
    padding-vertical: 5px;
    background-color: ${props => props.searchValue == '' ? props.colors.PLAYLEAP_SILVER : props.colors.secondary};
    justify-content: center;
    align-items: center;
    margin-top: 10%;
`;

const DatePickerBtn = styled.Button`
`;