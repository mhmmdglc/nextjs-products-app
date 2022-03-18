import style from "./style.module.scss"
import Link from 'next/link'

const Card = ({item}) => {
  return (
      <div className={style.card}>
          <div className={style.cardImg}>
              <img src={ item.image.src} alt=""/>
              <p className={style.review}> {item.variants[0].price} $</p>
              <p className={style.overview}>
                  <Link className={style.button} href={"/product/"+item.id}>{item.title}</Link>
              </p>
          </div>
      </div>
     )
}

export default Card