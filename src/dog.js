class Dog {
  static all = [];
  constructor(name, breed, sex){
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    all.push(this);
  }
}
