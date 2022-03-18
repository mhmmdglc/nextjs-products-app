import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const ProductPage = ({data}) => {
    const router = useRouter();
    const [productData, setProductData] = useState([]);
    console.log(router)
    useEffect(() => {
        console.log(router.query["slug"])

        setProductData(data.products.find(product => {
            console.log( product.id)
            return product.id.toString() === router.query["slug"].toString()
        }))
        console.log(productData)
    }, [data])
  return(<div>
      {productData && productData.title}
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