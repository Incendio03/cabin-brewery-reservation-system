export const menuItems = [
  {
    id: 'appetizer-1',
    category: 'Appetizers',
    name: 'Brewery Pretzel Bites',
    description: 'Soft pretzel bites served with our signature beer cheese dip.',
    price: 12.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Pretzel+Bites'
  },
  {
    id: 'appetizer-2',
    category: 'Appetizers',
    name: 'Spicy Chicken Wings',
    description: 'Crispy chicken wings tossed in your choice of buffalo or BBQ sauce.',
    price: 15.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Chicken+Wings'
  },
  {
    id: 'main-1',
    category: 'Main Courses',
    name: 'Cabin Burger',
    description: 'Juicy beef patty, cheddar cheese, lettuce, tomato, and special sauce on a brioche bun. Served with fries.',
    price: 18.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Cabin+Burger'
  },
  {
    id: 'main-2',
    category: 'Main Courses',
    name: 'Fish and Chips',
    description: 'Beer-battered cod served with tartar sauce and a side of crispy fries.',
    price: 20.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Fish+and+Chips'
  },
  {
    id: 'main-3',
    category: 'Main Courses',
    name: 'Vegetarian Pasta',
    description: 'Penne pasta with seasonal vegetables in a light tomato cream sauce.',
    price: 16.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Vegetarian+Pasta'
  },
  {
    id: 'dessert-1',
    category: 'Desserts',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 10.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Lava+Cake'
  },
  {
    id: 'drink-1',
    category: 'Drinks',
    name: 'Craft Beer Flight',
    description: 'Sample four of our signature craft beers.',
    price: 14.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Beer+Flight'
  },
  {
    id: 'drink-2',
    category: 'Drinks',
    name: 'Soft Drinks',
    description: 'Coke, Diet Coke, Sprite, Ginger Ale.',
    price: 4.00,
    image: 'https://placehold.co/300x200/e9e0d0/2C1810?text=Soft+Drinks'
  }
];

export const menuCategories = [...new Set(menuItems.map(item => item.category))];
