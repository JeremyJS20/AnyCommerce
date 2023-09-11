import { orderInfo } from "../types.utils";
import { generateRandomDate } from "./Products.datacollection.utils";

export const ordersCollection: orderInfo[] = [
  {
    id: "64fbe6f10b2281825a1dc9a5",
    amount: 3,
    totalAmout: 51,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "shipped",
  },
  {
    id: "64fbe6f19af14f0e9180fea4",
    amount: 5,
    totalAmout: 196.50,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "delivered",
  },
  {
    id: "64fbe6f1ef395b61b6e36441",
    amount: 3,
    totalAmout: 153,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "shipped",
  },
  {
    id: "64fbe6f1cbf785c68a34f02c",
    amount: 4,
    totalAmout: 104,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "canceled",
  },
  {
    id: "64fbe6f10ee3a6ef53a383ec",
    amount: 3,
    totalAmout: 72,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "ordered",
  },
  {
    id: "64fbe6f16950261dbcf2a7fa",
    amount: 4,
    totalAmout: 176,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "received",
  },
  {
    id: "64fbe6f17c3b8945a99fbe85",
    amount: 3,
    totalAmout: 187,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "pending",
  },
  {
    id: "64fbe6f1751e6606d353c648",
    amount: 2,
    totalAmout: 161,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "received",
  },
  {
    id: "64fbe6f1b2dd73880c3adb23",
    amount: 5,
    totalAmout: 148,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "shipped",
  },
  {
    id: "64fbe6f1a41f5644e0d5509c",
    amount: 5,
    totalAmout: 194,
    dates: {
      order: new Date(),
      delivery: generateRandomDate(new Date(2023, 0, 1), new Date()),
    },
    status: "shipped",
  },
];
