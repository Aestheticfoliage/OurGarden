const garden = {
    size: 0, // default size is 0
    vegetables: [],
    flowers: [],
    addVegetable: function(vegetableType) {
      this.vegetables.push(vegetableType);
      this.size += 1;
    },
    addFlower: function(flowerType) {
      this.flowers.push(flowerType);
      this.size += 1;
    }
  };
  garden.addVegetable('tomato');
garden.addVegetable('carrot');
garden.addFlower('daisy');
console.log(garden.size); // output: 3
console.log(garden.vegetables); // output: ['tomato', 'carrot']
console.log(garden.flowers); // output: ['daisy']
