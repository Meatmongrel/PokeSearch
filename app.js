class Pokemon{
    constructor(name, image, abilities){
      this.name = name;
      this.image = image;
      this.abilities = abilities
    }
  
    get card(){
      return this.createCard()
    }
    static fetch(name){
        return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    }
  
    createCard(){
        const div = document.createElement("div")
        const ul = document.createElement("ul")

        this.abilities.forEach(ability => {
            const li = document.createElement("li")
            li.textContent = ability
            ul.appendChild(li)
        })

        const p = document.createElement("p")
        const img = document.createElement("img")
        
        p.textContent = this.name
        img.src = this.image
        img.alt = "Pokemon image"
        img.style.width = "150px"

        div.append(p, img, ul)
        document.body.appendChild(div)
        return div
    }
}


function findPoke(mons){
    Pokemon.fetch(mons)
    .then(response => response.json())
    .then(poke => {
        const pokemon = new Pokemon(
            poke.name,
            poke.sprites.front_default,
            poke.abilities.map(ability => ability.ability.name)
        )
        const $pokemon = pokemon.createCard()
        const div = document.querySelector(".container")
        div.innerHTML = ""
        div.append($pokemon)
    })
}

const form = document.querySelector("#poke")
const button = document.querySelector("button");
(function getName(){

    form.addEventListener("submit", event => {
        event.preventDefault();
    })
    
    button.addEventListener("click", () => {
        let nameForm = new FormData(form)
        findPoke(nameForm.get("name"))
    })
})();






