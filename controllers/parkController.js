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

export const currentParking = async (req, res) => {
  try {
    const datas = await Parking.find({});
    let current = [];

    for (var i = 0; i < 36; i++) {
      let obj = {
        zone: datas[i].zone,
        state: datas[i].state,
        parker: datas[i].parker,
        enterAt: datas[i].enterAt,
      };
      current.push(obj);
    }

    return res.send(current);
  } catch (error) {
    return res.send("server-error");
  }
};

export const getGetOut = async (req, res) => {
  const { user } = req.query;
  const getOutTime = new Date();
  const find = await Parking.findOne({ parker: user });
  const enterTime = find.enterAt;
  const diffTime = getOutTime.getTime() - enterTime.getTime();
  const diffMin = diffTime / (60 * 1000);
  await Parking.updateMany({ parker: user }, { state: 0, parker: null });

  let resFee = 0;

  if (diffMin < 10) {
    resFee = 0;
  } else {
    let times = diffMin / 10;
    resFee = 1000 * times;
  }
  return res.status(200).json({ time: diffMin, fee: resFee });
};

var i;
export const initPark = async (req, res) => {
  try {
    for (i = 1; i <= 36; i++) {
      console.log(i);
      await Parking.Create({
        zone: i,
        type: 0,
        state: 0,
        parker: null,
        enterAt: Date.now,
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
