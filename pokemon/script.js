fetchData();

async function fetchData(){
    try{
        const pokemonName = document.getElementById("pokemonName").value;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            window.alert("Couldn't fetch resource!");
            throw new Error("Couldn't fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.other["official-artwork"].front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}