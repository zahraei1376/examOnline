import React, {useState ,useEffect} from 'react';
import { fixNumbers } from '../../generalComponent/fixNumbers';
import PersianDatePicker from '../../generalComponent/MaterialDatePicker/MaterialDatePicker';
import ExamsListTable from './LoginExamListTable.component';
/////////////////////////////////////////////////////////////
import {ExamsListContainer ,DateDiv ,LabelGroup} from './LoginToExamPage.styles';

var moment = require('moment-jalaali');

/////////////////////////////////////////////
const ExamsListPage = () => {

const [selectedDate, handleDateChange] = useState(moment());
const [newSelectedDate, setNewSelectedDate] = useState('');
useEffect(() => {
    setNewSelectedDate(fixNumbers(moment(selectedDate,
    ).format('jYYYY/jMM/jDD')));
  }, [selectedDate]);
  return (
    <ExamsListContainer>
        <DateDiv>
            <LabelGroup>
                تاریخ شروع امتحان
            </LabelGroup>
            <PersianDatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} />
        </DateDiv>
        <ExamsListTable newSelectedDate = {newSelectedDate} />
    </ExamsListContainer>
  );
};

export default ExamsListPage;
