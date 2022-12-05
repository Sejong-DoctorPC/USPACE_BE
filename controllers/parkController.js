import User from "../models/User.js";
import Parking from "../models/Parking.js";

class HashTable {
  constructor() {
    this.table = [];
  }

  modularHash(key) {
    let sum = 0;

    for (let i = 0; i < key.length; ++i) {
      sum += key.charCodeAt(i);
    }

    let hash = sum % 36;

    return hash;
  }

  put(key, value) {
    let hash = this.modularHash(key);
    if (this.table[hash] === undefined) {
      return (this.table[hash] = [key, value]);
    } else {
      while (this.table[hash] !== undefined) {
        hash++;
      }
    }

    return (this.table[hash] = [key, value]);
  }

  get(key) {
    return this.table[this.modularHash(key)];
  }

  remove(key) {
    return delete this.table[this.modularHash(key)];
  }
}

export const getReserve = async (req, res) => {
  const hashTable = new HashTable();
  const { user } = req.query;
  const carNum = user.slice(0, 2) + user.slice(3);

  hashTable.put(carNum, user);

  let parkingZone;
  for (var idx = 0; idx < 36; idx++) {
    const hashCarNum = hashTable.table[idx] || -1;
    if (hashCarNum === -1) continue;
    if (hashCarNum[0] === carNum) {
      const hashParker = hashTable.table[idx][1];
      parkingZone = idx;
      await Parking.findOneAndUpdate(
        { zone: idx },
        { state: 1, parker: hashParker }
      );
      break;
    }
  }

  return res.status(200).json({ zone: parkingZone });
};

export const postReserve = async (req, res) => {
  return;
};

var i;
export const initPark = async (req, res) => {
  try {
    for (i = 1; i <= 36; i++) {
      console.log(i);
      var save = await Parking.create({
        zone: i,
        type: 0,
        state: 0,
        parker: null,
      });
    }

    Parking.find({}, (err, res) => {
      console.log(res);
    });
    return res.status(201).json(save);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
};
