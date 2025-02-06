import {Schema, model} from 'mongoose';

export interface Course{
    id:string;
    name:string;
    description:string;
    price:number;
    stars: number;
    imageUrl: string;
    duration:number;
}

export const CourseSchema = new Schema<Course>(
    {
        name: {type: String, required:true},
        description:{type:String, required:true},
        price: {type: Number, required:true},
       
       
        stars: {type: Number, required:true},
        imageUrl: {type: String, required:true},
        duration:{type:Number,required:true}
       
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const CourseModel = model<Course>('course', CourseSchema);