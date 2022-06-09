import { PrismaClient, Hotel, Room } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await cleanAccomodations();
  const hotels = await createHotels();
  const rooms = await createRooms(hotels);
  await createBeds(rooms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function cleanAccomodations() {
  await prisma.bed.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
}

async function createHotels() {
  const data = [
    {
      name: 'Driven Resort',
      imageUrl:
        'https://newsdaily24news.files.wordpress.com/2021/10/screenshot_2021-10-01-09-54-53-05_680d03679600f7af0b4c700c6b270fe76714666733566409249.jpg',
    },
    {
      name: 'Driven Palace',
      imageUrl: 'https://fed.az/upload/news/small/130060.jpg',
    },
    {
      name: 'Driven World',
      imageUrl:
        'https://image.ceneostatic.pl/data/products/67478635/ce0d8363-9442-4dba-a67d-397efd461702_i-miracle-resort-wczasy-turcja-riwiera-turecka-lara.jpg',
    },
  ];

  await prisma.hotel.createMany({
    data,
    skipDuplicates: true,
  });

  const hotels = await prisma.hotel.findMany({});
  console.log({ hotels });

  return hotels;
}

async function createRooms(hotels: Hotel[]) {
  const roomsPerHotel = 16;

  const data = [];

  for (const hotel of hotels) {
    for (let i = 1; i <= roomsPerHotel; i++) {
      const room = {
        number: (i + 100).toString(),
        hotelId: hotel.id,
        type: getRndInteger(1, 3),
      };

      data.push(room);
    }
  }

  await prisma.room.createMany({ data, skipDuplicates: true });

  const rooms = await prisma.room.findMany({});

  console.log({ rooms });
  return rooms;
}

async function createBeds(rooms: Room[]) {
  const data = [];

  for (const room of rooms) {
    const bedQuant = room.type;

    for (let i = 0; i < bedQuant; i++) {
      const bed = {
        roomId: room.id,
      };
      data.push(bed);
    }
  }

  await prisma.bed.createMany({ data, skipDuplicates: true });

  const beds = await prisma.bed.findMany({});

  console.log({ beds });
  return beds;
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
