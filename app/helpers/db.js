import * as SQLite from 'expo-sqlite';

const CREATE_TABLE =
    'CREATE TABLE IF NOT EXISTS places (' +
    'id INTEGER PRIMARY KEY NOT NULL,' +
    'title TEXT NOT NULL,' +
    'imageUri TEXT NOT NULL,' +
    'address TEXT NOT NULL,' +
    'lat REAL NULL,' +
    'lng REAL NULL' +
    ');';

const INSERT_PLACE =
    'INSERT INTO places (title, imageUri, address, lat, lng)' +
    'VALUES (?, ?, ?, ?, ?);';

const SELECT_PLACES =
    'SELECT * FROM places';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                CREATE_TABLE,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                INSERT_PLACE,
                [title, imageUri, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};

export const fetchPlaces = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                SELECT_PLACES,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};

