import { Prisma } from '@prisma/client';


// We go to prisma, then cartItem.
// CartItemGetPayload - essentially, it is our cart item model. Then we get payload
// It is a generic & in there we need to specify which other model we want to include in this type. As a result, we will get back everything that we have for the cartItem & the product. We are interested in the product model as well
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};