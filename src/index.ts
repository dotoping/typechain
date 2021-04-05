// interface Human {
//   name: string;
//   age: number;
//   gender: string;
// }

class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const tori = new Human('Tori', 3, 'male');

const sayHello = (person: Human): string => {
  return `My name is ${person.name}. I am ${person.age} and ${person.gender}.`;
};

console.log(sayHello(tori));
