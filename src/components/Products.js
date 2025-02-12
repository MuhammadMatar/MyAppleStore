import { useEffect, useState } from 'react';
import { addItemToCart } from '../services/cart'
import { fetchProducts, insertProducts } from '../services/products'

const Products = ({ user, cartItems, setCartItems }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const initializeProducts = async () => {
        const fetchedProducts = await fetchProducts(); // Fetch products from DB
        setProducts(fetchedProducts);

        if (fetchedProducts.length === 0) {
            await insertProducts(); // Insert products only if the list is empty
        }
    };

    initializeProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Products</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text font-weight-bold">${product.price}</p>
                                <button className="btn btn-success mt-auto" onClick={() => addItemToCart(product, user, cartItems, setCartItems)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
