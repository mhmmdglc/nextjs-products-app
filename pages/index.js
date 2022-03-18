import styles from '../styles/Home.module.scss'
import axios from "axios";
import Cards from "../components/cards";
import {useEffect, useState} from "react";
import Image from 'next/image'
import ProductList from "../containers/productList";
import Header from "../components/header";
import Footer from "../components/footer";


export default function Home({data}) {
    const [productData, setProductData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
            setProductData(data.products)
    }, [data])



    const searchHandle = (val) => {
        setProductData(data.products.filter(product => {
            return product.title.toLowerCase().includes(val)
        }))
        setSearch(val)
    }
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.search}>
                <input onChange={(val) => searchHandle(val.target.value.toLowerCase())} type="text" placeholder="Search" value={search}/>
                {search.length>0 &&<button className={styles.button} onClick={()=>searchHandle("")}>Clear Search</button>}
            </div>
            {productData.length>0 && <ProductList items={productData}/>}
            <Footer/>
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await axios.get(' https://teknasyon.netlify.app/.netlify/functions/products', {
        headers: {
            'X-Access-Token': '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'
        }
    });
    const {data} = await res
    return {
        props: {data},
    };
}
