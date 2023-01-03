
import dotenv from "dotenv";

dotenv.config();

import { inquirerMenu, pause, readInput, selectObject } from "./helpers/inquirer.js";
import { Searchs } from "./Models/searchs.js";


const main = async() => {

    const searchs = new Searchs();

    let opt;
    
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const locations = await searchs.searchLocation(await readInput('Lugar: '));
                
                const id_location = await selectObject('Seleccione el lugar que le interesa', locations);

                if (id_location === null) continue;

                const location = locations.find(l => l.id === id_location);

                searchs.saveOnHistorial(location);

                location.weather = await searchs.searchWeather(location.lat, location.lng);

                location.printInfo();
                
            break;
            case 2:
                const id_locHist = await selectObject(
                    'Seleccione una búsqueda del historial', searchs.namesFromHistorial);
                if (id_locHist === null) continue;

                const locHist = searchs.historial.find(l => l.id === id_locHist);
                    
                locHist.weather = await searchs.searchWeather(locHist.lat, locHist.lng);

                locHist.printInfo();
            break;
            case 0:
            continue;
        }

        await pause();

    } while (opt !== 0);
}

main();