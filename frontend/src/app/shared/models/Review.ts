
export class Review {
    id!: string;
    userId!: {
      id: string;
      name: string;
    };
    rating!: number;
    comment!: string;
  }