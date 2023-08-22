import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import personServer from "../server/personServer";
import Notifier from "../components/Notifier";
import Filter from "../components/Filter";
import PersonsFrom from "../components/PersonsForm";
import Persons from "../components/persons/Persons";
import InvalidNotification from "../components/InvalidNotification";
import './app.scss'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [invalidInfo, setInvalidInfo] = useState(null);

  useEffect(() => {
    personServer
      .getAll()
      .then((response) => {
        setPersons(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("fail", error);
      });
  }, []);

  const [values, setValues] = useState({
    name: "",
    number: "",
  });

  const [filteredNames, setFilteredNames] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    // Filtering the names based on the current input
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    // Update the filtered names state
    setFilteredNames(filteredPersons);
  };

  const handleNameAndNum = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation if name or number already exist
    const warningMsg = persons.some(
      (person) => person.number === values.number || person.name === values.name
    );
    // Validation for empty input fild
    const emptyInput = values.name === "" || values.number === "";

    // Validation for incomplete name
    const incompleteName = values.name.length <= 4;

    // Validation for incomplete number
    const incompletNumber = values.number.length <= 9;

    if (warningMsg) {
      // window.alert("Sorry this information already exist pls try another");
      setInvalidInfo("Sorry this information already exist pls try another");
      setTimeout(() => {
        setInvalidInfo(null);
      }, 5000);
    } else if (emptyInput) {
      // window.alert("Input must not be empty");
      setInvalidInfo("Input must not be empty");
      setTimeout(() => {
        setInvalidInfo(null);
      }, 5000);
    } else if (incompleteName) {
      setInvalidInfo("Name must at least be at least 5 characters");
      setTimeout(() => {
        setInvalidInfo(null);
      }, 5000);
    } else if (incompletNumber) {
      setInvalidInfo("Number must be at least ten digits");
      setTimeout(() => {
        setInvalidInfo(null);
      }, 5000);
    } else {
      let personObj = {
        name: values.name,
        number: values.number,
        id: uuidv4(), // Generate a unique id using uuid
      };

      personServer
        .create(personObj)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setValues({ name: "", number: "" });
          setNotification(`${personObj.name} has been added sussessfully`);

          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("fail", error);
        });
    }
  };

  const handleUpdate = (id, newNumber) => {
    const personToUpdate = persons.find((person) => person.id === id);
    const updatedPerson = { ...personToUpdate, number: newNumber };

    personServer
      .update(id, updatedPerson)
      .then((response) => {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === id ? response.data : person
          )
        );
      })
      .catch((error) => {
        console.log(`Error updating person, ${error}`);
      });
  };

  const deletPerson = (id) => {
    personServer
      .del(id)
      .then((response) => {
        console.log(response.data);
        setPersons(persons.filter((personToDel) => personToDel.id !== id));
      })
      .catch((error) => {
        console.log(`Error deleting person, ${error}`);
      });
  };

  return (
    <>
      <h1 className="content-title">Phonebook Application</h1>
      <div className="app-container">
      <div>
        <h2>Phonebook</h2>
        <Notifier notifier={notification} />
        <InvalidNotification invalidInfo={invalidInfo} />
        <Filter onChange={handleChange} />
        <PersonsFrom
          onSubmit={handleSubmit}
          textValue={values.name}
          textOnchange={handleNameAndNum}
          numValue={values.number}
          numOnchange={handleNameAndNum}
        />
      </div>
      <div>
        <h2>Persons Information</h2>
        {filteredNames.length > 0
          ? filteredNames.map((person) => (
              <div key={person.id}>
                <Persons
                  id={person.id}
                  name={person.name}
                  number={person.number}
                  handleDelete={() => deletPerson(person.id)}
                  handleUpdate={handleUpdate}
                />
              </div>
            ))
          : persons.map((person) => (
              <div key={person.id}>
                <Persons
                  id={person.id}
                  name={person.name}
                  number={person.number}
                  handleDelete={() => deletPerson(person.id)}
                  handleUpdate={handleUpdate}
                />
              </div>
            ))}
      </div>
    </div>
    </>
  );
};

export default App;
