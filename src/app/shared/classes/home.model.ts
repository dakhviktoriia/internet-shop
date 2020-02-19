import { IProduct, IColor, ISize, IForum, IBlog, IUser } from '../interfaces/home.interface';


export class Product implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public category: string,
        public price: number,
        public color: Array<string>,
        public size: Array<string>,
        public bestseller: boolean,
        public newarrival: boolean,
        public descrsption: string,
        public imageUrl: Array<string>

    ) { }
}

export class Color implements IColor {
    constructor(
        public name: string,
        public color: string,
        public checkColor: boolean,
        public active: boolean

    ) {}
}

export class Size implements ISize {
    constructor(
        public size: string,
        public checkSize: boolean,
    ) {}
}


export class Forum implements IForum {
    constructor(
        public title: string,
        public text: string,
        public img: string
    ) {}
}

export class Blog implements IBlog {
    constructor(
        public title: string,
        public category: string,
        public text: string,
        public author: string,
        public date: string,
        public img: string,
        public comments?: Array<string>
    ) {}
}


export class User implements IUser {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}
}
