import React from "react";


function InfoCard({pokeData, key}) {

    // Wat doet map-methode ook alweer? Wat gebeurt hier precies?
    // Verwijst 'item' naar 1 js-object in abilities? Is die key goed?
    const abilities = pokeData.abilities.map((item) => {
        return <li key={item.ability.name}>
            {item.ability.name}
        </li>
    })

    return <article key={key}>
        <h3>{pokeData.name}</h3>
        <img src="" alt=""/>
        <h4>Moves: {pokeData.moves.length}</h4>
        <h4>Weight: {pokeData.weight}</h4>
        <ul className="abilities">
            <h4>Abilities:</h4>
            {abilities}
        </ul>
    </article>
}

export default InfoCard
