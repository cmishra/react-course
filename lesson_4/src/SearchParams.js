import React, { useEffect, useState, useContext} from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";
import Results from "./Results";


const SearchParams = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const [animal, AnimalDropdown, _] = useDropdown("Animal", "dog", ANIMALS);
    const [breeds, setBreeds] = useState([]);    
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [location, updateLocation] = useState("Seattle, WA");
    const [pets, setPets] = useState([]);
    useEffect(() => {
        setBreeds([])
        setBreed("");
        pet.breeds(animal).then(({breeds}) => {
            const breedStrings = breeds.map(({ name} ) => name);
            setBreeds(breedStrings);
        }, console.error);
        
    }, [animal]);

    async function requestPets() {
        const {animals} = await pet.animals({
            location,
            breed,
            type: animal,
        });

        setPets(animals || []);
    }
    
    return (
        <div className='search-params'>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    requestPets();
                }}
            >
                <label htmlFor='location'>
                    Location
                    <input 
                        id='location' 
                        value={location} 
                        placeholder='Location' 
                        onChange={e => updateLocation(e.target.value)}
                    />
                </label>
                <AnimalDropdown />
                <BreedDropdown />
                <label htmlFor="location">
                    Theme 
                    <select 
                        value={theme} 
                        onChange={e => setTheme(e.target.value)}
                        onBlur={e => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>
                <button style ={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    );
};

export default SearchParams;