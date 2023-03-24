const express = require("express");
const app = express();
const port = 8000;

const pets = require("./petList");

app.get("/", (req, res) => {
  res.send(`
  <h1>Adop a Pet!</h1>
  <p>Browse through the links below to find your new furry friend.</p>
  <ul>
  <li><a href="animals/dogs">Dogs</a></li>
  <li><a href="animals/cats">Cats</a></li>
  <li><a href="animals/rabbits">Rabbits</a></li>
  </ul>
  `);
});

app.get("/animals/:pet_type", (req, res) => {
  const petType = req.params.pet_type;
  const petsOfType = pets[petType];
  const petList = petsOfType
    .map(
      (pet) =>
        `<li><a href="/animals/${petType}/${petsOfType.indexOf(pet)}">${
          pet.name
        }</a></li>`
    )
    .join("");
  res.send(`<h1>List of ${petType}</h1>
  <ul>
${petList}
  </ul>
  `);
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const findPet = pets[req.params.pet_type][req.params.pet_id];
  res.send(`
  <h1>${findPet.name}</h1>
  <img src=${findPet.url} alt=${findPet.name}/>
  <p>${findPet.description}</p>
  <ul>
  <li>Breed: ${findPet.breed}</li>
  <li>Age: ${findPet.age}</li>
  </ul>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
