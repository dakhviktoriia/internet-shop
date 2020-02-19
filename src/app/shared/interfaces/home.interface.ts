import { Data } from '@angular/router';

export interface IProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    color: Array<string>;
    size: Array<string>;
    bestseller: boolean;
    newarrival: boolean;
    descrsption: string;
    imageUrl: Array<string>;
}


export interface IColor {
    name: string;
    color: string;
    checkColor: boolean;
    active: boolean;
}



export interface ISize {
    size: string;
    checkSize: boolean;
}


export interface IForum {
    title: string;
    text: string;
    img: string;
}


export interface IBlog {
    title: string;
    category: string;
    text: string;
    author: string;
    date: string;
    img: string;
    comments?: Array<string>;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}
