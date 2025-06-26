const API_KEY = "9aff545a006e4861ed8d7b0d05028cac";
import Weather from './data-access.js';

class Search {

    async processInput(input) {
        input = input.replace(/ /g,''); // API does not allow whitespace in prefix
        if (input.length == 0) {
            throw 'No Input Found';
        }
        var json;
        let arr = input.split(","); // temp array to seperate the city/zip and the country
        var found = false
        for (let i = 0; i < arr[0].length; i++) {
            if (!isNaN(arr[0].charAt(i))) { 
                found = true;
            }
        }
        // if there are no numbers in the string - treat it as a city, otherwise, zip code
        if (found == false) {
            json = await Weather.weatherFromCity(arr[0], arr[1]).catch(err => console.log(err.message));
        } else {
            let zip = arr[0].slice(0, 3);
            json = await Weather.weatherFromZip(zip, arr[1]).catch(err => console.log(err.message));
        }
        return json;

    }
}

const search = new Search();
export default search;
