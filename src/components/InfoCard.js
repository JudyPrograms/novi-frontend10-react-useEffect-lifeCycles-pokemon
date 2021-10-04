import React from "react";


function InfoCard({pokeSetData}) {

    // Wat doet map-methode ook alweer? Wat gebeurt hier precies?
    // Verwijst 'item' naar 1 js-object in abilities? Is die key goed?

    return (
        <>
            {pokeSetData.map((item) => {
                return (
                    <article key={item.name}>
                        <h3>{item.name}</h3>
                        <img src="" alt=""/>
                        <h4>Moves: {item.moves.length}</h4>
                        <h4>Weight: {item.weight}</h4>
                        <ul className="abilities">
                            <h4>Abilities:</h4>
                                {/*Ook hier begrijp ik  niet waarom dde abilities niet op de
                                kaartjes verschijnen. Toen ik het met 1 kaarrtje en 1 data-object
                                probeerde, werkte het nog. Wil je me dit uitleggen?*/}
                                {item.abilities.map((abil) => {
                                    return (
                                        <li key={abil.name}>
                                        {abil.name}
                                        </li>)
                                })}
                        </ul>
                    </article>
                )
            })}
            </>
        );
    }

export default InfoCard
