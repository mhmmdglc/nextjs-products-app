import style from "./style.module.scss"
import Card from "../card";

const Cards = ({cardsItem}) => {
  return (
      <div className={style.cardGrid}>
              {cardsItem.map(item=>{
                  return (<Card key={item.id} item={item}/>)
              })}
      </div>
     )
}

export default Cards