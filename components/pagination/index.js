
import Card from "../card";

const Pagination = ({cardsItem}) => {

  return (
      <div >
              {cardsItem.map(item=>{
                  return (<Card key={item.id} item={item}/>)
              })}
      </div>
     )
}

export default Pagination