import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// import 
import { color } from '../../../theme/color';
import { NEXT, SIGN_IN_UP_FOR, 
  USE_EMAIL, USE_PHONE, 
  WHAT_IS_YOUR_BIRTHDAY, 
  WINDOW_HEIGHT, 
  WINDOW_WIDTH 
} from '../../../constants';

// Images 
import CustomWheel from './customWheel';
import { getCurrentYear } from "../../../utils/helper";
import Loader from '../../common/loader';
import GetRecaptcha from './getRecaptcha';

// const currentYear = getCurrentYear();

// let MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// let Days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

// const YEARS = new Array(122).fill(currentYear - 121).map((value, index) => value + index);

const DateOfBirth = ({ optionChoose, value, isLoading, postBirthdateToApi, setDOB, action }) => {
    const {colors} = useTheme();

    const [date, setDate] = useState("");
    // const [days, setDays] = useState([]);
    // const [months, setMonths] = useState([]);
    // const [years, setYears] = useState([]);

    // const unexpectedDate = new Date(YEARS[0], 0, 1);
    // const date = new Date(value || unexpectedDate);

    // onChange(date);

    const changeHandle = (type, digit) => {
      console.log(type, digit);
      switch (type) {
          case "day":
              date.setDate(digit);
              break;
          case "month":
              date.setMonth(digit - 1);
              break;
          case "year":
              date.setFullYear(digit);
              break;
      }

      // onChange(date);
    }

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
              {/* <CustomView currentWidth={WINDOW_WIDTH}>
                  <CustomWheel 
                    data={Days}
                    type={'day'}
                    onChange={changeHandle}
                  />
                  <CustomWheel 
                    data={MONTHS}
                    type={'month'}
                    onChange={changeHandle}
                  />
                  <CustomWheel 
                    data={YEARS}
                    type={'year'}
                    onChange={changeHandle}
                  />
              </CustomView> */}
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
               {/* <Text style={{fontSize:20,textAlign:'center',fontSize:25,fontWeight:'bold'}}>{date}</Text> */}
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


const CustomView = styled.View`
  flex-direction: row;
  width: 70%;
`;

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