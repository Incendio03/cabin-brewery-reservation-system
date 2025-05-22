// Mock data for rooms/KTV

export const rooms = [
  {
    id: 1,
    name: "VIP KTV Bar Room",
    description: "Experience the ultimate entertainment in our VIP KTV Bar Room. Equipped with a state-of-the-art karaoke system, a fully stocked mini-bar, plush seating, and dynamic lighting. Perfect for parties and gatherings.",
    capacity: 20,
    price: 3500, // Price per night
    amenities: ["Karaoke System", "Mini-Bar", "Comfortable Seating", "Private Restroom", "Soundproof Walls"],
    images: [
      "/images/rooms/vip_ktv_1.jpg",
      "/images/rooms/vip_ktv_2.jpg",
      "/images/rooms/vip_ktv_3.jpg",
    ],
    availability: true,
    type: "KTV Room",
    consumable: true,
  },
  {
    id: 2,
    name: "VIP Room",
    description: "Our exclusive VIP Room offers a luxurious and private space for your special occasions. Featuring elegant decor, premium furnishings, a dedicated service staff, and a customizable ambiance. Ideal for intimate celebrations or high-profile meetings.",
    capacity: 30,
    price: 5000, // Price per night
    amenities: ["Luxury Furnishings", "Dedicated Staff", "Customizable Lighting", "Private Bar Access", "HD Projector"],
    images: [
      "/images/rooms/vip_room_1.jpg",
      "/images/rooms/vip_room_2.jpg",
      "/images/rooms/vip_room_3.jpg",
    ],
    availability: true,
    type: "VIP Lounge",
    consumable: true,
  },
];
