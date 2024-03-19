import React from 'react'
import mac1 from "../../assets/product/mac1.png"
import mac2 from "../../assets/product/mac2.png"
import ProductList from "../../component/list/ProductList"

const HomeHotItem = () => {
    const data = [
        {
            name: "Macbook 2023",
            image: mac1,
            bg_color: "pink",
            price: 2000
        },
        {
            name: "Macbook 2020",
            image: mac2,
            bg_color: "gray",
            price: 2000
        },
        {
            name: "Macbook 2021",
            image: mac1,
            bg_color: "red",
            price: 2000
        },
        {
            name: "Macbook 2023",
            image: mac1,
            bg_color: "pink",
            price: 2000
        },
        {
            name: "Macbook 2020",
            image: mac2,
            bg_color: "gray",
            price: 2000
        },
        {
            name: "Macbook 2023",
            image: mac1,
            bg_color: "pink",
            price: 2000
        },
        {
            name: "Macbook 2020",
            image: mac2,
            bg_color: "gray",
            price: 2000
        },
        {
            name: "Macbook 2023",
            image: mac1,
            bg_color: "pink",
            price: 2000
        },
        {
            name: "Macbook 2020",
            image: mac2,
            bg_color: "gray",
            price: 2000
        },

    ]
    return (
        data.map((item, index) => {
            return (
                <ProductList
                    name={item.name}
                    image={item.image}
                    price={item.price + " $"}
                    desc="Description"
                />
            )
        })

    )
}

export default HomeHotItem