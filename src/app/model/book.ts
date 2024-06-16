import { Author } from "./author";

export interface Book {
    id :number;
    name:string;
    isbn:string;
    author:Author|undefined;
}
