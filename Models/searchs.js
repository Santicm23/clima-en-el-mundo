
import fs from "fs";

import axios from "axios";

import { Location } from "./location.js";


export class Searchs {

    historial = [];
    dbPath = './db/searchs.json';

    constructor(){
        this.readDB();
    }

    get paramsMAPBOX() {
        return {
            'limit': 5,
            'language': 'es',
            'access_token': process.env.MAPBOX_TOKEN
        }
    }

    get paramsOPENWATHERMAP() {
        return {
            appid: process.env.OPENWEATHERMAP_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get namesFromHistorial(){
        return this.historial.map(location => ({
            id: location.id,
            toString(){
                return location.name;
            }
        }));
    }

    async searchLocation(location = '') {
        try {
            const axios_instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
                params: this.paramsMAPBOX
            });

            const response = await axios_instance.get();

            return response.data.features.map(lugar => new Location({
                id: lugar.id,
                name: lugar.place_name,
                lat: lugar.center[1],
                lng: lugar.center[0],
            }));
        } catch(e){
            console.error(e);
        }
    }

    async searchWeather(lat, lon) {
        try {
            const axios_instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOPENWATHERMAP, lat, lon }
            });

            const response = await axios_instance.get();
            const { main, weather } = response.data;
            return {
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                desc: weather[0].description
            }

        } catch (e) {
            console.error(e);
        }
    }

    saveOnHistorial(location) {
        if (this.namesFromHistorial.includes(location.name)) return;
        this.historial = this.historial.splice(0,5);
        this.historial.unshift(location);
        this.writeDB();
    }

    writeDB() {
        fs.writeFileSync(this.dbPath, JSON.stringify({ historial: this.historial }));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return;
        const object = fs.readFileSync(this.dbPath, {encoding: "utf-8"}); 
        this.historial = (object === '')?[] :JSON.parse(object).historial.map(location => new Location(location));
    }
}