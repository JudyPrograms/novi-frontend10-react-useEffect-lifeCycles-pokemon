import React, {useEffect, useState} from "react";
import axios from "axios";


function InfoCard({pokeName}) {

    const [pokeData, setPokeData] = useState({});

    useEffect(() => {

        // Get request voor data van 1 pokemon aan de hand van de meegegeven pokeName-property:
        async function fetchDataSinglePoke() {
            try {

                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

                console.log("fetchDataSingleName uitgevoerd voor:" + pokeName);
                // Hoe kan ik de inhoud van het object loggen ipv alleen [object Object]? >> komma gebruiken ipv +
                console.log("pokeData van deze pokemon:", result.data);

                setPokeData(result.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchDataSinglePoke();

    }, [pokeName]);

    return (
        <article key={pokeName}>
            {Object.keys(pokeData).length > 0 &&
            <>
                <h3>{pokeData.name}</h3>
                <img className="card-img" src={pokeData.sprites.other["official-artwork"]["front_default"]} alt=""/>
                <h4>Moves: {pokeData.moves.length}</h4>
                <h4>Weight: {pokeData.weight}</h4>
                <ul className="abilities">
                    <h4>Abilities:</h4>
                    {pokeData.abilities.map((item) => {
                        return (
                            // Hoe kan het dat deze key werkt? Want hij lijkt me niet unique, als in: meerdere
                            // pokemons hebben toch dezelfde abilities?
                            <li key={item.ability.name}>
                                {item.ability.name}
                            </li>);
                    })}
                </ul>
            </>
            }
        </article>
    );
}

export default InfoCard;
