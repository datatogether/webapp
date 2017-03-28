import React, { Component, PropTypes } from 'react';
import MonthCalendar from './MonthCalendar';
import TouchAnchor from './TouchAnchor';
import iScroll from '../deps/iscroll';

/* @stateful
 * Wheelie Time Picker
 * 
 * **Picker Show / Hiding & Touch Events**
 * 
 */

const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const days = { mon : -1 , tue : 0, wed : 1, thu : 2, fri : 3, sat : 4, sun : 5 };
const hours = [1,2,3,4,5,6,7,8,9,10,11,12];
const minutes = [0,15,30,45];

class DateTimePicker extends Component {
	static propTypes = {
		// Center date to choose around. Defaults to the current time.
		// Should be a js Date object
		centerDate : PropTypes.object,
		// name of the field
		name : PropTypes.string.isRequired,
		// onChange handler
		onChange : PropTypes.func,
		// onChange handler in the form (value, name)
		onValueChange : PropTypes.func,
		// Value for the datepicker. Should be a js Date object
		value : PropTypes.object,
		// show the button to toggle the calendar component?
		showCalendarOption : PropTypes.bool,
	}
	// Component Lifecycle
	static defualtProps = {
		centerDate : new Date(),
		value : new Date(),
		showCalendarOption : true
	}

	getInitialState = () => {
		var d = this.dateValue(this.props.value)
		d.setMinutes(Math.round(d.getMinutes() / 15) * 15);
		d.setSeconds(0);
		d.setMilliseconds(0);
		return {
			focused : false,
			value : d,
			showCalendar : false,
		}
	}

	// Method
	focus = () => {
		this.setState({ focused : true });
	}
	blur = () => {
		this.setState({ focused : false });
	}

	// Event Handlers
	onFocus = (e) => {
		this.setState({ focused : true });
	}
	onBlur = (e) => {
		this.setState({ focused : false });
	}
	onChange = (value) => {
		// for now we're providing a sort of fake event. 
		// probably a bad idea.
		if (typeof this.props.onChange === "function") {
			this.props.onChange({
				target : {
					name : this.props.name,
					value : value
				}
			});
		}
		if (typeof this.props.onValueChange === "function") {
			this.props.onValueChange(value, this.props.name);
		}
	}
	onKeyUp = (e) => {
		// kill keyboard input
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	onPickerChange = (val, name) => {
		this.onChange(val);
	}
	onInputChange = (e) => {
		// no-op
	}
	onPickerMouseDown = (e) => {
		e.preventDefault();
		// Cancel Blur event triggered by focusing the picker
		React.findDOMNode(this.refs["field"]).focus();
		return false;
	}
	onPickerChange = () =>{

	}
	onToggleCalendar = () => {
		var o = {};
		o.showCalendar = !this.state.showCalendar;
		this.setState(o);
	}

	// Render Methods
	// Conform Various date inputs to a valid date object
	dateValue = (value) => {
		var isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				var now = new Date()
				value = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0)
			}
		}

		return value;
	}
	stringValue = (value) => {
		if (!value) { return ""; }
		var date = this.dateValue(value)
			, mins = (Math.round(date.getMinutes() / 15) * 15)
			, phase = (date.getHours() < 12) ? "am" : "pm"
			, hours = (phase === "am") ? date.getHours() : date.getHours() - 12 
		
		if (mins === 0) { mins = "00"; }
		if (hours == 0) { hours = "12"; }

		if (date.getDate() === this.props.centerDate.getDate()) {
			return hours + ":" + mins + " " + phase;
		} else {
			return months[date.getMonth()]  + " " + date.getDate() + " " + hours + ":" + mins + " " + phase;
		}
	}
	render() {
		var value = new Date(this.dateValue(this.props.value))
			, stringValue = this.stringValue(value)
			, picker;

		if (this.state.focused) {
			if (this.state.showCalendar) {
				picker = <MonthCalendar name="calendar" value={value} onMouseDown={this.onPickerMouseDown} onChange={this.onCalendarChange} />
			} else {
				picker = <WheelPicker onShowCalendar={this.onToggleCalendar} showCalendarOption={this.props.showCalendarOption} onMouseDown={this.onPickerMouseDown} killTouch={true} value={value} centerDate={this.props.centerDate} onValueChange={this.onPickerChange} name={this.props.name} />
			}
		}

		return (
			<div className="dateTimePicker">
				<input readOnly ref="field" type="text" onClick={this.onFocus} onTouchEnd={this.onFocus} onFocus={this.onFocus} onBlur={this.onBlur} value={stringValue} onChange={this.onInputChange} onKeyUp={this.onKeyUp} onChange={this.onInputChange} />
				{picker}
			</div>
		);
	}
}


/* @private
 * WheelPicker
 */
class WheelPicker extends Component {
	static propTypes = {
		// The date to center the picker to. Defaults to now.
		centerDate : PropTypes.object.isRequired,
		// @private for now, don't modify this
		daysBack : PropTypes.number.isRequired,
		// @private for now, don't modify this
		daysForward : PropTypes.number.isRequired,
		// @private for now, don't modify this
		itemsShowing : PropTypes.number.isRequired,
		killTouch : PropTypes.bool.isRequired,
		name : PropTypes.string.isRequired,
		onMouseDown : PropTypes.func,
		onTouchEnd : PropTypes.func,
		onShowCalendar : PropTypes.func,
		// Change in the form of (value, name)
		onValueChange : PropTypes.func.isRequired,
		// @private for now, don't modify.
		segments : PropTypes.array.isRequired,
		// should be a js date object
		value : PropTypes.object.isRequired,
		// should we show the button to toggle the month calendar?
		showCalendarOption : PropTypes.bool,
	}
	static defaultProps = {
		segments : ['day','hour','minute','phase'],
		centerDate : new Date(),
		daysBack : 14,
		daysForward : 14,
		itemsShowing : 5,
		killTouch : false,
		value : new Date(),
		showCalendarOption : true
	}

	// Component Lifecycle
	componentDidMount = () => {
		var self = this
			, options = {
					mouseWheel : true,
					snap : 'li',
					snapThreshold : 3,
				};

		this.props.segments.forEach(function(segment){
			var name = segment + 'Scroll';
			self[name] = new iScroll(React.findDOMNode(self.refs[segment]), options);
			self[name].on('scrollEnd', self.scrollEnder(segment));
			self[name].on('touchEnd', self.props.onTouchEnd);
		});

		this.scrollToDate(this.props.value);
	}

	// methods
	scrollToDate = (date) => {
		var startDate = new Date(this.props.centerDate)
		startDate.setDate(this.props.centerDate.getDate() - (this.props.daysBack));

		var days = Math.floor((date - startDate) / (1000*60*60*24))
			, lastDay = (this.props.daysBack + this.props.daysForward + 1)
			, hours = date.getHours()
			, minutes = Math.floor(date.getMinutes() / 15) + 1
			, pm = (hours > 11);


		if (pm) { hours = hours - 12; }
		
		if (days < 0) { days == 2; }
		if (days > lastDay) { days = lastDay - 2; }


		days = (days >= this.props.daysBack) ? days - 1 : days;
		hours = (hours > 0) ? hours - 1 : hours;
		minutes = (minutes > 0) ? minutes - 1 : minutes;

		this.dayScroll.goToPage(0,days,200);
		this.hourScroll.goToPage(0,hours,200);
		this.minuteScroll.goToPage(0,minutes,200);
		this.phaseScroll.goToPage(0, pm ? 1 : 0,200);
	}
	setSelected = (iscroll, sel) => {
		for (var i=0; i < iscroll.scroller.children.length; i++){
			iscroll.scroller.children[i].className = (sel === i) ? "selected" : "";
		}
	}

	// Factory Funcs
	scrollEnder = (segment) => {
		var self = this;
		return function () {
			// add two to choose the center element (hopefully in the middle)
			var i = this.currentPage.pageY + 2
				// convert to number with +
				, scrollValue = +this.scroller.children[i].getAttribute('data-value')
				, oldValue = self.props.value
				, value = new Date(self.props.value);

			self.setSelected(this, i);

			switch (segment) {
				case "day":
					year = +this.scroller.children[i].getAttribute('data-year');
					month = +this.scroller.children[i].getAttribute('data-month');
					value.setFullYear(year);
					value.setMonth(month);
					value.setDate(scrollValue);
					break;
				case "hour":
					value.setHours(scrollValue);
					break;
				case "minute":
					value.setMinutes(scrollValue);
					break;
				case "phase":
					if (scrollValue === 0 && value.getHours() > 12) {
						value.setHours(value.getHours() - 12);
					} else if (scrollValue === 1 && value.getHours() < 12) {
						value.setHours(value.getHours() + 12);
					}
					break;
			}

			if (oldValue != value) {
				if (typeof self.props.onChange === "function") {
					self.props.onChange(e);
				}
				if (typeof self.props.onValueChange === "function") {
					self.props.onValueChange(value, self.props.name);
				}
			}
		}
	}

	// handlers
	onTouchEnd = (e) => {
		if (this.props.killTouch) {
			e.stopPropagation();
			this[e.currentTarget.getAttribute('data-name') + "Scroll"].handleEvent(e);
		}
	}
	onShowCalendar = (e) => {
		if (typeof this.props.onShowCalendar === "function") {
			e.stopPropagation();
			this.props.onShowCalendar();
		}
	}

	// Render Methods
	day = (date, key) => {
		return (
			<li 
			data-year={date.getFullYear()} 
			data-month={date.getMonth()} 
			data-value={date.getDate()} 
			key={key}>
				{this.stringValue(date)}
		</li>
		);
	}
	days = () => {
		var days = []
			, i = 0
			, v = new Date(this.props.centerDate);

		v.setDate(v.getDate() - this.props.daysBack);
		for (var j=0; j < this.props.daysBack; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v, i));
			i++;
		}

		for (j=0; j < this.props.daysForward; j++) {
			v.setDate(v.getDate() + 1);
			days.push(this.day(v, i));
			i++;
		}
		return days;
	}
	hour = (value, hour) => {
		return <li data-value={value} key={hour}>{hour}</li>
	}
	hours = (pm) => {
		var hrs = [];
		for (var i=1; i<=12; i++) {
			hrs.push(this.hour(pm ? i + 12 : i, i));
		}
		return hrs;
	}
	minute = (value, key) => {
		return <li data-value={value} key={key}>{value}</li>
	}
	minutes = () => {
		var mins = [];
		for (var i=0; i<4; i++) {
			mins.push(this.minute(minutes[i],i))
		}
		return mins;
	}
	dateValue = (value) => {
		let isDate = (Object.prototype.toString.call(value) === "[object Date]");
		// Ensure Value is a valid date.
		if (!isDate) {
			if (typeof value === "number" && value != NaN) {
				value = new Date(this.props.value)
			} else {
				let now = new Date()
				value = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0)
			}
		}

		return value;
	}
	stringValue = (value) => {
		if (!value) { return ""; }
		date = this.dateValue(value);
		return months[date.getMonth()]  + " " + date.getDate();
	}
	render() {
		let value = this.props.value
			, days = this.days()
			, hours = this.hours(this.props.centerDate.getHours() > 11)
			, minutes = this.minutes();

		return (
			<div className="picker" onMouseDown={this.props.onMouseDown}>
				<TouchAnchor className="showCalendar right" text="cal." onClick={this.onShowCalendar} />
				<div ref="day" data-name="day" className="day segment" onTouchEnd={this.onTouchEnd}>
					<ul>
						<li></li>
						<li></li>
						{days}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="hour" data-name="hour" className="hour segment" onTouchEnd={this.onTouchEnd}>
					<ul>
						<li></li>
						<li></li>
						{hours}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="minute" data-name="minute" className="minute segment" onTouchEnd={this.onTouchEnd}>
					<ul>
						<li></li>
						<li></li>
						{minutes}
						<li></li>
						<li></li>
					</ul>
				</div>
				<div ref="phase" data-name="phase" className="phase segment" onTouchEnd={this.onTouchEnd}>
					<ul>
						<li></li>
						<li></li>
						<li data-value={0}>am</li>
						<li data-value={1}>pm</li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default DateTimePicker;