
import {useState, useEffect} from "react";
import Cards from "../../components/cards";
import styles from "./style.module.scss";

const ProductList = ({items}) => {
    const [products, setProducts] = useState([])
    const [paginationNumber, setPaginationNumber] = useState(0);

    useEffect(() => {
        paginatedData(1)
        setPaginationNumber(Math.ceil(items.length / 10))
    }, [items]);

    const paginatedData = (e) => {
        setProducts(items.slice((e - 1) * 10, (e * 10)));
    };
    return (
        <div>
            {products.length>0 && <Cards cardsItem={products}/>}
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

export default ProductList