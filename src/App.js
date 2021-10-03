import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import './components/InfoCard.css';
import pokemonLogo from "./assets/1200px-International_Pokémon_logo.svg.png";
import InfoCard from "./components/InfoCard";


function App() {

    // Leeg object maken voor te ontvangen data
    const [pokeData, setPokeData] = useState({});

    // State variabele initialiseren die te vinden range objecten bepaalt
    const [resultRange, setResultRange] = useState(0);

    // Lijst maken met 20 pokemon-namen:
    const [pokeNameList, setPokeNameList] = useState([])

    // Infocards variabele maken:
    // let [allInfoCards, setAllInfoCards] = useState([])


    // Get request met als resultaat een object met alle 20 gevonden pokemon-namen
    // Gebruik maken van de waarde van resultRange state
    async function fetchDataAllNames() {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${resultRange})`)
            let pokeNames = []
            for (let i = 0; i < result.data.results.length; i++) {
                const pokeName = result.data.results[i].name
                pokeNames.push(pokeName)
            }
            setPokeNameList(pokeNames)
        } catch (e) {
            console.error(e)
        }
    }

    // Get request voor data van 1 pokemon uit de lijst
    async function fetchDataSingleName(pokeName) {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
            setPokeData(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    // Voor alle namen data opvragen en kaartjes maken
    // Iets zorgt nu voor dat hij eindeloos doorgaat met kaartjes maken
    const allInfoCards = pokeNameList.map((item) => {
        fetchDataSingleName(item)
        return <InfoCard
            key={item}
            pokeData={pokeData}
        />
    });


    return (
        <div className="main-container">

            <header>
                <img className="header-logo" src={pokemonLogo} alt="pokémon"/>
                <div className="header-buttons">
                    <button onClick={() => resultRange >= 20 && setResultRange(resultRange - 20)}>
                        VORIGE
                    </button>
                    <button onClick={() => setResultRange(resultRange + 20)}>
                        VOLGENDE
                    </button>
                    <button onClick={fetchDataAllNames}>
                        INIT
                    </button>
                </div>
            </header>

            <section>
                {Object.keys(pokeData).length > 0 && allInfoCards}
            </section>

        </div>
    );
}

export default App;
