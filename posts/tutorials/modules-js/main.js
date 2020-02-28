import User from './User.js';
import { printName } from './User.js';

const user = new User('Shakir', 27);

console.log(user);
console.log(user.getAge());

printName(user);


