

import mongoose, {Schema, model} from 'mongoose';

export interface Review{
    
    userId:mongoose.Schema.Types.ObjectId;
    comment:string;
    rating:number;
}

export const ReviewSchema = new Schema<Review>(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
        comment:{type:String, required:true},
        rating: {type: Number, required:true},
       
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

export const ReviewModel = model<Review>('review', ReviewSchema);