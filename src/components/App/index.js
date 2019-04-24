import React from 'react';
import pf from 'petfinder-client';
import Pet from '../Pet/index';

//api client
const petfinder = pf();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: 'full', location: 'San Francisco, CA' })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({ pets });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Adopt me!</h1>
        <div>
          {this.state.pets.map(pet => {
            let breed;

            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(', ');
            } else {
              breed = pet.breeds.breed;
            }
            return <Pet animal={pet.animal} name={pet.name} breed={breed} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;