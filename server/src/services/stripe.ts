const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export async function createStripeUser(user: User) {
  try {
    const existingUser = await stripe.customers.list({
      email: user.email,
    });

    if (existingUser.data.length > 0) {
      return existingUser.data[0];
    }

    const stripeCustomer = await stripe.customers.create({
      email: user.email,
      name: user.firstName + " " + user.lastName,
      description: "Marketplace user",
    });

    return stripeCustomer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateStripeUser(user: User) {
  try {
    const existingUser = await stripe.customers.list({
      email: user.email,
    });

    if (existingUser.data.length === 0) {
      return null;
    }

    const id = existingUser.data[0].id;

    const stripeCustomer = await stripe.customers.update( id, {
      email: user.email,
      name: user.firstName + " " + user.lastName,
      description: "Marketplace user",
    });

    return stripeCustomer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}