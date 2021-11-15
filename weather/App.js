
import React from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text, View,
	Image,
	ScrollView,
	TextInput,
	Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Weather from './data-access.js';
import Search from './search.js';
import HourlyDiv from './hourly.js';
import DailyDiv from './weekly.js';
import CurrentInfo from './currentInfo.js';


export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			ready: false,
			sheetHeight: null,
			position: { lat: null, long: null },
			city: null,
			current: {
				temp: null,
				weather: null,
				HILO: [],
				humidity: null,
				wind: null,
				icon: null,
				pop: null,
			},
			hourly: [],
			daily: [],
			input: '',
			error: null
		}
	}

	// this method auto runs when page finished loading - might not be used
	// find out how to update itself - location and weather
	componentDidMount() {
		let locationConfigs = {
			timeOut: 100,
			maximumAge: 60 * 60 // how long to store the coordinates
		};
		this.setState({ ready: false, error: null }); // built in functions for state obejct

		// built in to javascript - navigator object has geolocation object which has currentposition method
		// params: on fail function, on success function, options
		Location.installWebGeolocationPolyfill();
		navigator.geolocation.getCurrentPosition(
			this.getLocation,
			this.locFail,
			locationConfigs
		);
	}

	getLocation = (location) => {

		Weather.getWeatherData(location.coords.latitude, location.coords.longitude)
			.then(data => {
				let hourlyData = data.hourly.splice(1, 13);
				let dailyData = data.daily.splice(1, 8);

				this.setState({
					current: {
						temp: Math.round(data.current.temp) + '°',
						weather: data.current.weather[0].description,
						HILO: ['HI: ' + Math.round(data.daily[0].temp.max) + '°', 'LO: ' + Math.round(data.daily[0].temp.min) + '°'],
						humidity: Math.round(data.current.humidity),
						wind: Math.round(data.current.wind_speed),
						icon: data.current.weather[0].icon,
						pop: (data.hourly[0].pop) * 100,
					},
					hourly: hourlyData,
					daily: dailyData,
				})
			})
		Weather.getCity(location.coords.latitude, location.coords.longitude)
			.then(data => this.setState({
				city: data
			}))
	}

	// error handling
	locFail = (err) => {
		this.setState({ error: err.message });
	}


	getWeatherFromInput(input) {

		if (input.length == 0) {
			Alert.alert("Ivalid Input: Missing Characters");
		}

		Search.processInput(input).then(data => {
			console.log(data);
			let hourlyData = data.hourly.splice(1, 13);
			let dailyData = data.daily.splice(1, 8);

			this.setState({
				current: {
					temp: Math.round(data.current.temp) + '°',
					weather: data.current.weather[0].description,
					HILO: ['HI: ' + Math.round(data.daily[0].temp.max) + '°', 'LO: ' + Math.round(data.daily[0].temp.min) + '°'],
					humidity: Math.round(data.current.humidity),
					wind: Math.round(data.current.wind_speed),
					icon: data.current.weather[0].icon,
					pop: data.hourly[0].pop,
				},
				hourly: hourlyData,
				daily: dailyData,
				city: input
			})
		}).catch(err => {
			console.log(err.message);
			Alert.alert("Invalid Input: Follow Format: Zip/City, Country")
		})
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.ready}
				<ImageBackground style={styles.background}>
					<TextInput style={{ marginTop: '20%' }} placeholder="Search a new location.."
						onChangeText={(input) => this.setState({ input })}
						onSubmitEditing={() => {
							this.getWeatherFromInput(this.state.input);
						}}
						value={this.state.input}
					/>
					<Text style={styles.city}>{this.state.city}</Text>
					<Text style={styles.weather}>{this.state.current.weather}</Text>
					<Image source={{ uri: `http://openweathermap.org/img/wn/${this.state.current.icon}@2x.png` }} style={styles.icon} />
					<Text style={styles.temp}>{this.state.current.temp}</Text>
					<Text>{this.state.current.HILO[0]}  {this.state.current.HILO[1]}</Text>
					<View style={styles.currentInfo}>
						<CurrentInfo uri={`https://icons-for-free.com/iconfiles/png/512/rain+rainy+weather+icon-1320196493190360220.png`} value={this.state.current.pop + '%'}></CurrentInfo>
						<CurrentInfo uri={`https://static.thenounproject.com/png/3267937-200.png`} value={this.state.current.wind + ' km/h'}></CurrentInfo>
						<CurrentInfo uri={`https://static.thenounproject.com/png/1001987-200.png`} value={this.state.current.humidity + '%'}></CurrentInfo>
					</View>
					<StatusBar style="auto"></StatusBar>
					<ScrollView style={styles.scroll} horizontal={true} showsHorizontalScrollIndicator={false}>
						{this.state.hourly.map((data) => { // Unique Key in list warning here - warning is unecessary - the time variable is changed on every child in list
							let date = new Date(data.dt * 1000);
							var hours = date.getHours();
							if (hours > 12) {
								var time = hours - 12 + 'PM';
							}
							else if (hours == 0) {
								var time = 12 + 'AM';
							} else {
								var time = hours + 'AM';
							}
							var icon = data.weather[0].icon;
							return (
								<HourlyDiv url={`http://openweathermap.org/img/wn/${icon}@2x.png`} time={time} tempHour={Math.round(data.temp) + '°'}></HourlyDiv>
							)
						})}

					</ScrollView>
					<ScrollView style={styles.dailyScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
						{this.state.daily.map(data => {
							let date = new Date(data.dt * 1000);
							var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
							var day = days[date.getDay()];
							var icon = data.weather[0].icon;
							return (
								<DailyDiv day={day} tempDay={Math.round(data.temp.max) + '°'} uri={`http://openweathermap.org/img/wn/${icon}@2x.png`}></DailyDiv>
							)
						})}
					</ScrollView>
				</ImageBackground>

			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d6e0f5',
		zIndex: 1,
	},
	background: {
		flex: 1, // fit the whole screen
		alignItems: 'center',
		width: null, // override the fixed static sizes to make sure it fits any phone
		height: null,
		zIndex: 0
	},
	city: {
		fontSize: 35,
		color: '#4C4F51',
		marginTop: '5%',
		alignItems: 'center',
		zIndex: 0,
	},
	temp: {
		fontSize: 80,
		color: '#4C4F51',
		marginLeft: '5%',
	},
	weather: {
		fontSize: 15,
	},
	textInput: {
		marginTop: '20%'
	},
	scroll: {
		width: '100%',
		height: '5%',
		marginTop: '0%',
		opacity: 0.5,
	},
	dailyScroll: {
		width: '100%',
		height: '10%',
		opacity: 0.5,
		marginLeft: '5%',

	},
	icon: {
		height: 120,
		width: 100,
		zIndex: 10
	},
	currentInfo: {
		marginTop: '5%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: '5%'
	}
});
