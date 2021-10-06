import React, {useEffect, useState} from "react";
import axios from "axios";


function InfoCard({pokeName}) {

    console.log(pokeName)

    const [pokeData, setPokeData] = useState({});

    useEffect(() => {
        // Get request voor data van 1 pokemon uit de lijst en voeg toe aan pokeSetData
        async function fetchDataSinglePoke() {
            try {

                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
                console.log("fetchDataSingleName uitgevoerd voor:" + pokeName);
                console.log("pokeData van deze pokemon:" + result.data);
                setPokeData(result.data);

                // // object toevoegen aan array van poke-data-objecten:
                // setPokeSetData([...pokeSetData, result.data]);

            } catch (e) {
                console.error(e);
            }
        }

        fetchDataSinglePoke();

    }, [])


    // Wat doet map-methode ook alweer? Wat gebeurt hier precies?
    // Verwijst 'item' naar 1 js-object in abilities? Is die key goed?

    return (
        <>
            {Object.keys(pokeData).length > 0 &&
            <article key={pokeData.name}>
                <h3>{pokeData.name}</h3>
                <img src="" alt=""/>
                <h4>Moves: {pokeData.moves.length}</h4>
                <h4>Weight: {pokeData.weight}</h4>
                <ul className="abilities">
                    <h4>Abilities:</h4>
                    {/*Ook hier begrijp ik  niet waarom dde abilities niet op de
                                kaartjes verschijnen. Toen ik het met 1 kaartje en 1 data-object
                                probeerde, werkte het nog. Wil je me dit uitleggen?*/}
                    {pokeData.abilities.map((item) => {
                        return (
                            <li key={item.ability.name}>
                                {item.ability.name}
                            </li>);
                    })}
                </ul>
            </article>
            }
        </>
    );
}

export default InfoCard
