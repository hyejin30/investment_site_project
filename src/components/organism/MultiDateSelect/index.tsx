import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { Calendar, DateSelect } from 'components/molecule';

import { checkDate, addDotToDate } from 'utils';
import { flex } from 'styles';
import { DateType } from 'types/date';

interface IMultiDateSelectProps {
  data: { startDate: string; endDate: string };
  onSelect: (startDate: string, endDate: string) => void;
}

function MultiDateSelect({ data, onSelect }: IMultiDateSelectProps) {
  const now = dayjs();
  const initialStartDate = now.subtract(20, 'year').format('YYYY.MM.DD');
  const initialEndDate = now.format('YYYY.MM.DD');

  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);

  const toggleCalendar = (title: DateType) => {
    if (title === 'startDate') return setShowStartDateCalendar((prev) => !prev);
    if (title === 'endDate') return setShowEndDateCalendar((prev) => !prev);
  };

  const handleDateSelect = (title: DateType, date: string) => {
    if (title === 'startDate') setStartDate(date);
    if (title === 'endDate') setEndDate(date);
    toggleCalendar(title);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;
    const dottedValue = addDotToDate(value);
    if (title === 'startDate') return setStartDate(dottedValue);
    if (title === 'endDate') return setEndDate(dottedValue);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { title, value } = e.target;

    const year = value.split('.')[0];
    const startYear = initialStartDate.split('.')[0];
    const endYear = initialEndDate.split('.')[0];

    // 에러 핸들링 : 범위를 벗어나게 입력하면 초기값으로 변경
    if (title === 'startDate' && (year < startYear || !checkDate(value))) return setStartDate(initialStartDate);
    if (title === 'endDate' && (year > endYear || !checkDate(value))) return setEndDate(initialEndDate);
  };

  useEffect(() => {
    onSelect(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <Container>
      <DateSelect>
        <DateSelect.Label htmlFor="startDate">시작일 설정</DateSelect.Label>
        <DateSelect.Input
          title="startDate"
          value={data.startDate}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onClick={() => toggleCalendar('startDate')}
        />
        {showStartDateCalendar && (
          <CalendarWrap>
            <Calendar defaultDate={startDate} title="startDate" onSelect={handleDateSelect} />
          </CalendarWrap>
        )}
      </DateSelect>
      <DateSelect>
        <DateSelect.Label htmlFor="endDate">종료일 설정</DateSelect.Label>
        <DateSelect.Input
          title="endDate"
          value={data.endDate}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onClick={() => toggleCalendar('endDate')}
        />
        {showEndDateCalendar && (
          <CalendarWrap>
            <Calendar defaultDate={endDate} title="endDate" onSelect={handleDateSelect} />
          </CalendarWrap>
        )}
      </DateSelect>
    </Container>
  );
}

export default MultiDateSelect;

const Container = styled.div`
  ${flex('', '')};
  column-gap: 15px;
`;

const CalendarWrap = styled.div`
  position: relative;
`;
