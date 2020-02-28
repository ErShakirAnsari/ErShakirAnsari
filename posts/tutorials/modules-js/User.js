export default class User
{
	constructor(name, age)
	{
		this.name = name;
		this.age = age;
	}

	getAge()
	{
		return `User is ${this.age} years old`;
	}
}


export function printName(user)
{
	console.log(`User name is ${user.name}`);
}