import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import './components/InfoCard.css';
import pokemonLogo from "./assets/1200px-International_Pokémon_logo.svg.png";
import InfoCard from "./components/InfoCard";


function App() {

    // Beginpunt initialiseren voor range van 20 op te vragen pokemon-namen:
    const [rangeStart, setRangeStart] = useState(0);

    // Leeg object maken voor 20 pokemon-naam-objecten:
    const [pokeNamesData, setPokeNamesData] = useState({});

    // // Lege lijst maken voor 20 pokeData-objecten:
    // const [pokeSetData, setPokeSetData] = useState([]);

    useEffect(() => {

        console.log("ik ben ge-refreshed");
        console.log(`de range pokemon-objecten is nu: ${rangeStart} t/m ${rangeStart+20}`);

        // Get request met als resultaat een object met alle 20 gevonden pokemon-namen
        // Gebruik maken van de waarde van resultRange state
        async function fetchDataRangeNames() {
            try {

                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${rangeStart})`);
                console.log(result);

                setPokeNamesData(result.data.results);

                console.log("fetchDataRangeNames is uitgevoerd");
                console.log("pokeNamesData bevat nu:" + pokeNamesData);
                console.log("length van pokeNamesData=" + Object.keys(pokeNamesData).length);
                //
                // // if (Object.keys(pokeNamesData).length > 0) {
                //     // voor ieder object in pokeNamesData met key=name de data van die pokemon opvragen:
                // for (let i = 0; i < 20; i++) {
                //     const nextName = pokeNamesData[i].name;
                //     fetchDataSinglePoke(nextName);
                // }
                // // }

                // console.log("De set aan pokeData-objecten in pokeSetData is nu:" + pokeSetData)

            } catch (e) {
                console.error(e)
            }
        }

        // data opvragen van 20 pokemons vanaf startRange tot startRange+20
        fetchDataRangeNames();

        }, [rangeStart]
    );


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
                {/* Helaas krijg ik na uren klooien nu alle 20 pokemons op 1 kaartje. Haha, ik heb echt veel geprobeerd,
                beter dan dit gaat het niet worden. Geloof niet dat ik goed snap nog hoe useEffect en mapping werkt...
                Zou je me willen uitleggen wat ik doe en wat ik fout doe? Ik geloof dat het ook misgaat
                bij het toevoegen van data-objecten aan de lege useState lijst.*/}
                {Object.keys(pokeNamesData).length > 0 && pokeNamesData.map((pokeName) => {
                    return (
                        <InfoCard pokeName={pokeName.name}/>
                    )
                })}
            </section>
        </div>
    );
}

export default App;
