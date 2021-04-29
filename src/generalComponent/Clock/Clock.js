import React from 'react';

export default class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.launchClock();
		const setIntervalId = '';
		this.state = {
			currentTime: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			})
		};
	}

	componentWillUnmount() {
		clearInterval(this.setIntervalId);
	}

	launchClock() {
		this.setIntervalId = setInterval(() => {
			this.setState({
				currentTime: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: false
				})
			});
		}, 1000);
	}

	render() {
		return <div>{this.state.currentTime}</div>;
	}
}
