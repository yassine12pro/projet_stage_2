import { Course } from "./Course";

export class CartItem {
    constructor(public course:Course) {
    }
    quantity:number=1;
    price:number=this.course.price;

} 