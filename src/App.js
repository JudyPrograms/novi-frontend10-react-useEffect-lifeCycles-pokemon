import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import './components/InfoCard.css';
import pokemonLogo from "./assets/1200px-International_Pokémon_logo.svg.png";
import InfoCard from "./components/InfoCard";


function App() {

    // Beginpunt initialiseren voor range van 20 op te vragen pokemon-objecten:
    const [rangeStart, setRangeStart] = useState(0);

    // Leeg object maken voor 20 pokemon-objecten:
    const [pokeNamesData, setPokeNamesData] = useState({});


    useEffect(() => {

        console.log("rangeStart is geïnitialiseerd of aangepast");
        console.log(`de range pokemon-objecten is nu: ${rangeStart} t/m ${rangeStart + 20}`);

        // Get request met als resultaat een object met alle 20 gevonden pokemon-objecten
        // met daarin onder andere een .name-key waarin de naam als string staat.
        // Gebruik maken van de waarde van rangeStart-state.
        async function fetchDataNames() {
            try {

                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${rangeStart})`);
                console.log(result);

                setPokeNamesData(result.data.results);

                console.log("fetchDataNames is uitgevoerd");
                console.log("pokeNamesData bevat nu:" + pokeNamesData);
                // Ik begrijp niet waarom deze lengte steeds wordt gelogd als 0, terwijl er wel gerenderd wordt
                // aan de hand van de conditie dat die lengte groter dan 0 moet zijn. Hoe kan dit?
                console.log("length van pokeNamesData=" + Object.keys(pokeNamesData).length);

            } catch (e) {
                console.error(e)
            }
        }

        fetchDataNames();

    }, [rangeStart]);

    return (
        <div className="main-container">

            <header>
                <img className="header-logo" src={pokemonLogo} alt="pokémon"/>
                <div className="header-buttons">
                    <button onClick={() => setRangeStart(rangeStart - 20)}>
                        VORIGE
                    </button>
                    <button onClick={() => setRangeStart(rangeStart + 20)}>
                        VOLGENDE
                    </button>
                </div>
            </header>

            <section>
                {Object.keys(pokeNamesData).length > 0 && pokeNamesData.map((pokeName) => {
                    return (
                        <InfoCard pokeName={pokeName.name} key={pokeName.name}/>
                    )
                })}
            </section>
        </div>
    );
}

export default App;
