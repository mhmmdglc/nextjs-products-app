import styles from '../styles/Home.module.scss'
import axios from "axios";
import Cards from "../components/cards";
import {useEffect, useState} from "react";
import Image from 'next/image'


export default function Home({data}) {
    const [productData, setProductData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [paginationNumber, setPaginationNumber] = useState(0);

    useEffect(() => {
        if (data.products.length > 10) {
            setProductData(data.products.slice(0, 10))
            setPaginationNumber(Math.ceil(data.products.length / 10))
        } else {
            setProductData(data.products)
        }
    }, [data])

    const paginatedData = (e) => {
        setProductData(data.products.slice((e - 1) * 10, (e * 10)));
    };

    const searchHandle = (val) => {
        setFilterData(data.products.filter(product => {
            return product.title.toLowerCase().includes(val.target.value.toLowerCase())
        }))
    }
    return (
        <div className={styles.container}>
            <Image src="/images/winter-banner.jpg" alt="me" width="1500" height="600"/>

            <div className={styles.search}>
                <input onChange={(val) => searchHandle(val)} type="text" placeholder="Search"/>
                <button className={styles.button}>Clear Search</button>
            </div>

            <Cards cardsItem={productData}/>
            {paginationNumber}
            <div className={styles.pagination}>
                <p><i className={styles.arrowLeft}/></p>
                {Array.from(Array(paginationNumber), (i, e) => {
                    return <button className={styles.paginationButton} onClick={() => paginatedData(e + 1)}
                                   key={e}>{e + 1}</button>
                })}
                <p><i className={styles.arrowRight}/></p>
            </div>
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
