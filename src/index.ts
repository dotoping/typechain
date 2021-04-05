interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: 'Daniel',
  age: 27,
  gender: 'male',
};

const sayHello = (person: Human): string => {
  return `My name is ${person.name}. I am ${person.age} and ${person.gender}.`;
};

console.log(sayHello(person));
