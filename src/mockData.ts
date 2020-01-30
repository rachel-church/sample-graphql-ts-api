import { Employee } from 'src/schema';

export const employees = [
  {
    id: "Z7ToogEN5x",
    firstName: "Isabelle",
    lastName: "Ware",
    age: 56,
    manager: {
      id: "Z7ToogEN5x"
    }
  },
  {
    id: "XXYCahs8wX",
    firstName: "Johan",
    lastName: "Pena",
    age: 26,
    manager: {
      id: "Z7ToogEN5x"
    }
  },
  {
    id: "FNFmsvQpIs",
    firstName: "Greyson",
    lastName: "Morley",
    age: 29,
    manager: {
      id: "YAUkin9r46"
    }
  },
  {
    id: "YAUkin9r46",
    firstName: "Stacey",
    lastName: "Key",
    age: 34,
  },
  {
    id: "j28LuXGJP1",
    firstName: "Jodi",
    lastName: "Davenport",
    age: 46,
    manager: {
      id: "YAUkin9r46"
    }
  }
] as Employee[];
