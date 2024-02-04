import React from 'react';

function Marketplace() {
    return (
        <>
            <h1 className="mt-28 ml-20 text-7xl">Furniture Marketplace</h1>
            <div className="grid grid-cols-3 p-20">
                <Product title="Wooden Table" price="4000" image="1.webp" />
                <Product title="Leather Sofa" price="8000" image="2.jpeg" />
                <Product title="Glass Coffee Table" price="6000" image="1.webp" />
                <Product title="Modern Bed Frame" price="10000" image="2.jpeg" />
                <Product title="Wardrobe Closet" price="7000" image="1.webp" />
                <Product title="Dining Chair Set" price="4500" image="2.jpeg" />
            </div>

            <h1 className="mt-28 ml-20 text-7xl">Component Marketplace</h1>
            <div className="grid grid-cols-3 p-20">
                <Product title="Chimney" price="10000" image="1.webp" />
                <Product title="LED TV" price="12000" image="2.jpeg" />
                <Product title="Smart Clock" price="5000" image="1.webp" />
                <Product title="Comfortable Chair" price="2500" image="2.jpeg" />
                <Product title="Home Theater System" price="15000" image="1.webp" />
                <Product title="Smart Refrigerator" price="9000" image="2.jpeg" />
            </div>
        </>
    );
}

export default Marketplace;

function Product(props) {
    return (
        <>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2">
                <a href="#">
                    <img className="p-8 rounded-t-lg max-w-sm h-80" src={props.image || 'logo.png'} alt="product image" />
                </a>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
                    </a>
                    <div className="grid grid-cols-1 items-center justify-between m-3">
                        <span className="text-xl font-bold text-gray-900 dark:text-white my-2">Price: Rs. <span className="text-2xl">{props.price}</span></span>
                        <a href="#" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 my-2">View in Ar</a>
                    </div>
                </div>
            </div>
        </>
    );
}
