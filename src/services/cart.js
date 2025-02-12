import { db, getDoc, doc, collection, setDoc } from './firebase';

export const fetchCart = async (user, setCartItems, setLoading, setError) => {
  try {
    const cartDocRef = doc(db, 'carts', user.uid);
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      setCartItems(cartDoc.data().cart);
    } else {
      console.log(`No cart found! user: {user: "${user.uid}"}`);
    }
  } catch (err) {
    setError('Load cart items failed!');
    console.error('Error fetching cart items:', err);
  } finally {
    setLoading(false);
  }
};

export const addItemToCart = async (product, user, cartItems, setCartItems) => {
  const updatedCart = [...cartItems, product];
  setCartItems(updatedCart);
  await updateCart(user, updatedCart);
  console.log('Item added to cart');
};

export const removeItemFromCart = async (index, user, cartItems, setCartItems) => {
  const updatedCart = cartItems.slice(0, index).concat(cartItems.slice(index + 1));
  setCartItems(updatedCart);
  await updateCart(user, updatedCart);
  console.log('Item removed from cart');
};

export const updateCart = async (user, updatedCart) => {
  try {
    const cartDocRef = doc(collection(db, 'carts'), user.uid);
    await setDoc(cartDocRef, { cart: updatedCart });
    console.log(`Cart updated successfully! {user: "${user.uid}"}`);
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

