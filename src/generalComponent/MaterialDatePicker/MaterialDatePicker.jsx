import React, { Fragment } from 'react';
import jMoment from 'moment-jalaali';
import JalaliUtils from '@date-io/jalaali';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const outerTheme = createMuiTheme({
	typography: {
		fontFamily: 'BNazaninBold',
		fontSize: '24',
	},
});

export default function PersianDatePicker({ selectedDate, handleDateChange }) {
	return (
		<Fragment>
			<ThemeProvider theme={outerTheme}>
				<MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
					<DatePicker
						clearable
						okLabel="تأیید"
						cancelLabel="لغو"
						clearLabel="پاک کردن"
						style={{ direction: 'ltr' }}
						labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
						value={selectedDate}
						onChange={handleDateChange}
					/>
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</Fragment>
	);
}
