
export class Location {
    id = '';
    name = '';
    lat = 0;
    lng = 0;
    weather = {};

    constructor({ id, name, lat, lng, weather={}}){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.weather = weather;
    }

    toString() {
        return this.name;
    }

    printInfo(){
        console.log('\nInformación del lugar:\n'.green.bold);
        console.log('Nombre: ', this.name.green);
        console.log('Lat: ', this.lat);
        console.log('Lng: ', this.lng);
        console.log('Temperatura: ',this.weather.temp);
        console.log('Mínima: ',this.weather.min);
        console.log('Máxima: ',this.weather.max);
        console.log('Descripción clima:',this.weather.desc.green);
    }
}