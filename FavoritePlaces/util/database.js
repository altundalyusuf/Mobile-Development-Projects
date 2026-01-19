import * as SQLite from "expo-sqlite";

let database;

export async function init() {
  database = await SQLite.openDatabaseAsync("places.db");

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);

  return database;
}

export async function insertPlace(place) {
  const result = await database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]
  );
  return result;
}

export async function fetchPlaces() {
  const dpResult = await database.getAllAsync("SELECT * FROM places");

  const places = dpResult.map((place) => ({
    id: place.id,
    title: place.title,
    imageUri: place.imageUri,
    address: place.address,
    location: {
      lat: place.lat,
      lng: place.lng,
    },
  }));

  return places;
}

export async function fetchPlaceDetails(id) {
  const dbResult = await database.getFirstAsync(
    "SELECT * FROM places WHERE id = ?",
    [id]
  );

  if (!dbResult) {
    return null;
  }

  const place = {
    id: dbResult.id,
    title: dbResult.title,
    imageUri: dbResult.imageUri,
    address: dbResult.address,
    location: {
      lat: dbResult.lat,
      lng: dbResult.lng,
    },
  };

  return place;
}
