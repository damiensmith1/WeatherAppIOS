const API_KEY = "0ee8e66f714c19dbfaf323aabaf66717";

// have to convert city and zip to coordinates because weather by name is only current weather (free)

class Weather {

    async getWeatherData(lat, long) {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?` +
            `lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&exclude=minutely`
        );
        let json = await response.json().catch(err => console.log(err.message));
        return json;
    }

    async getCity(lat, long) {
        let response = await fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${API_KEY}`
        );
        let json = await response.json().catch(err => console.log(err.message));
        return json[0].name + ", " + json[0].country;
    }


    async weatherFromCity(city, country) {
        let res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${API_KEY}`
        );
        let coords = await res.json();
        let response = await this.getWeatherData(coords[0].lat, coords[0].lon).catch((err) => console.log(err.messae));
        return response;
    }

    async weatherFromZip(zip, country) {
        let res = await fetch(
            `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${API_KEY}`
        );
        let coords = await res.json();
        let response = await this.getWeatherData(coords.lat, coords.lon).catch(err => console.log(err.message))
        return response;
    }

}

const weather = new Weather();
export default weather;
