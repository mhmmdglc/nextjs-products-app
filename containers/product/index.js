import style from "./style.module.scss"
import Link from 'next/link'
import {useState, useEffect} from "react";

const Product = ({item}) => {
    const [variant, setVariant] = useState(null)
    useEffect(() => {
        setVariant(item.variants[0])
    }, [item]);

    const onChangeVariant = (val) => {
        setVariant(item.variants.find(variant => variant.id.toString() ===val.target.value.toString()))
    }
    return (
        <div>
            <div className={style.singleProduct}>
                <Link href={"/"}>
                    <button className={style.button}>Back</button>
                </Link>
                <div className={style.productInfo}>
                    <div className={style.productImg}>
                        <img src={item.image.src} alt=""/>
                    </div>
                    <div className={style.productContent}>
                        <h1>{item.title}</h1>
                        <p className={style.tagline}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <span>Tagline:</span> "{item.tags}"
                        </p>
                        <p className={style.productFact}>
                            <span>Product Type:</span> {item.product_type}
                        </p>
                        <p className={style.productFact}>
                            <span>Variants:</span>
                        <div onChange={(data)=>onChangeVariant(data)}>
                        {item.variants.map((val,index) => {
                            return <div key={val.id}>
                                <input className={style.radioButton} type="radio" value={val.id} name="variant" defaultChecked={index===0} />
                                {val.title}
                            </div>
                        })}
                        </div>
                        </p>
                        {variant && <div>
                            <p className={style.productFact}>
                                <span>Grams:</span> {variant.grams}
                            </p>
                            <p className={style.productFact}>
                                <span>Barcode:</span> {variant.barcode}
                            </p>
                            <p className={style.productFact}>
                                <span>Weight:</span> {variant.weight} {variant.weight_unit}
                            </p>
                            <p className={style.productFact}>
                                <span>Price:</span> {variant.price}
                            </p>
                        </div>}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Product