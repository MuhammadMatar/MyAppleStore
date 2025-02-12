import { db, collection, getDocs, addDoc } from './firebase';

const products = [
    {
        name: "iPhone 16",
        description: "The latest iPhone with advanced AI capabilities, improved camera functions, and new voice assistant enhancements.",
        price: 799,
        category: "Smartphones",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone16-digitalmat-gallery-3-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=1723669127642"
    },
    {
        name: "iPhone 16 Pro",
        description: "The iPhone 16 Pro features 4K video recording, enhanced battery life, and superior AI functionalities.",
        price: 999,
        category: "Smartphones",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone16pro-digitalmat-gallery-3-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=1723843057832"
    },
    {
        name: "MacBook Pro 14-inch",
        description: "A powerful laptop with the latest M2 chip, delivering exceptional performance for professionals.",
        price: 1999,
        category: "Laptops",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-14-digitalmat-gallery-1-202410?wid=728&hei=666&fmt=png-alpha&.v=1728342371746"
    },
    {
        name: "iPad Air",
        description: "A versatile tablet with a stunning 10.9-inch Liquid Retina display and the powerful A14 Bionic chip.",
        price: 599,
        category: "Tablets",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipadair11-digitalmat-gallery-1-202404?wid=728&hei=666&fmt=jpeg&qlt=90&.v=1713308648429"
    },
    {
        name: "Apple Watch Series 10",
        description: "The latest Apple Watch with a larger screen, faster charging, and sleep apnea detection.",
        price: 399,
        category: "Wearables",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-digitalmat-gallery-4-202409?wid=728&hei=666&fmt=png-alpha&.v=1725019652498"
    },
    {
        name: "AirPods Pro 2",
        description: "High-fidelity wireless earbuds with active noise cancellation and a hearing aid feature.",
        price: 249,
        category: "Audio",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725492499003"
    },
    {
        name: "HomePod mini",
        description: "A compact smart speaker with impressive sound quality and Siri integration.",
        price: 99,
        category: "Smart Home",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-202210?wid=1080&hei=880&fmt=jpeg&qlt=90&.v=1720816295293"
    },
    {
        name: "Apple TV 4K",
        description: "A streaming device that delivers 4K HDR content with Dolby Atmos sound.",
        price: 179,
        category: "Entertainment",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202210?wid=1076&hei=1070&fmt=jpeg&qlt=90&.v=1664896361408"
    },
    {
        name: "iMac 24-inch",
        description: "An all-in-one desktop computer with a stunning 4.5K Retina display and M1 chip.",
        price: 1299,
        category: "Desktops",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-touch-id-blue-selection-hero-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1729800486533"
    },
    {
        name: "Mac mini",
        description: "A compact desktop computer with the M1 chip, offering great performance in a small package.",
        price: 699,
        category: "Desktops",
        imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1728265550767"
    }
];

export const insertProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');

        for (let product of products) {
            await addDoc(productsCollection, product);
        }
    } catch (error) {
        console.error("Error adding products: ", error);
    }
};

export const fetchProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => doc.data());
        return productList;
    } catch (error) {
        console.error('Error fetching products: ', error);
    }
};

