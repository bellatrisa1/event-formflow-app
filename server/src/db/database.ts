import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Form = {
  id: string;
  userId: string;
  title: string;
  theme:
    | 'violet'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'black'
    | 'white'
    | 'brown'
    | 'red';
  responses: number;
  createdAt: string;
  lastResponseAt: string;
  updatedAt: number;
};

type DB = {
  users: User[];
  forms: Form[];
};

function read(): DB {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as DB;
}

function write(data: DB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  read,
  write,
  getUsers: () => read().users,
  getForms: () => read().forms,
  saveUsers: (users: User[]) => {
    const data = read();
    data.users = users;
    write(data);
  },
  saveForms: (forms: Form[]) => {
    const data = read();
    data.forms = forms;
    write(data);
  },
};

export type { User, Form, DB };
