export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    badge?: string;
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Reusable Stainless Steel Water Bottle',
        description: 'Eco-friendly water bottle for a sustainable lifestyle',
        price: 43.88,
        originalPrice: 65.00,
        rating: 5,
        reviews: 124,
        image: '/images/img (1).jpg',
        category: 'Drinkware',
        badge: 'Bestseller',
        inStock: true
    },
    {
        id: '2',
        name: 'Premium Non-Stick Cookware Set',
        description: 'Professional cookware for modern kitchens',
        price: 76.35,
        originalPrice: 120.00,
        rating: 4,
        reviews: 89,
        image: '/images/img (2).jpg',
        category: 'Cookware',
        badge: 'Hot Deal',
        inStock: true
    },
    {
        id: '3',
        name: 'Electric Kettle - Eco Friendly',
        description: 'Modern electric kettle with auto shut-off',
        price: 94.65,
        originalPrice: 140.00,
        rating: 5,
        reviews: 203,
        image: '/images/img (3).jpg',
        category: 'Appliances',
        badge: 'New',
        inStock: true
    },
    {
        id: '4',
        name: 'Bamboo Kitchen Utensil Set',
        description: 'Sustainable bamboo utensils for eco-conscious cooking',
        price: 28.27,
        originalPrice: 45.00,
        rating: 5,
        reviews: 156,
        image: '/images/img (4).jpg',
        category: 'Utensils',
        badge: 'Eco-Friendly',
        inStock: true
    },
    {
        id: '5',
        name: 'Modern Dining Table Set',
        description: 'Elegant dining furniture for your home',
        price: 299.99,
        originalPrice: 499.00,
        rating: 5,
        reviews: 67,
        image: '/images/img (5).jpg',
        category: 'Furniture',
        badge: 'Premium',
        inStock: true
    },
    {
        id: '6',
        name: 'Luxury Sofa Collection',
        description: 'Comfortable and stylish living room furniture',
        price: 599.99,
        originalPrice: 899.00,
        rating: 5,
        reviews: 92,
        image: '/images/img (6).jpg',
        category: 'Furniture',
        badge: 'Bestseller',
        inStock: true
    },
    {
        id: '7',
        name: 'Smart Home Speaker',
        description: 'Voice-controlled smart speaker with premium sound',
        price: 89.99,
        originalPrice: 129.00,
        rating: 4,
        reviews: 234,
        image: '/images/img (7).jpg',
        category: 'Electronics',
        badge: 'Hot Deal',
        inStock: true
    },
    {
        id: '8',
        name: 'Premium Kitchen Set',
        description: 'Complete kitchen essentials bundle',
        price: 149.99,
        originalPrice: 220.00,
        rating: 5,
        reviews: 178,
        image: '/images/img (8).jpg',
        category: 'Kitchen',
        badge: 'Bundle',
        inStock: true
    }
];

export const categories = [
    'All Products',
    'Furniture',
    'Electronics',
    'Kitchen',
    'Drinkware',
    'Cookware',
    'Appliances',
    'Utensils'
];
