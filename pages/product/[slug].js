import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Product from "../../containers/product";
import styles from '../../styles/Home.module.scss'

const ProductPage = ({data}) => {
    const router = useRouter();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        setProductData(data.products.find(product => {
            return product.id.toString() === router.query["slug"].toString()
        }))
    }, [data])

  return(<div>
      <div className={styles.container}>
          {productData && <Product item={productData} />}
      </div>
  </div>)
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

export default ProductPage