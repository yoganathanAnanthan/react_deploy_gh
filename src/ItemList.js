import React from 'react'
import LineItem from './LineItem'

const ItemList = ({items,handleCheck,handleDelete}) => {
    return (

        <div>
            {items.map((item) => (
                <LineItem
                item = {item}
                key = {item.id}
                handleCheck = {handleCheck}
                handleDelete = {handleDelete}
                />
            ))}
        </div>
    )
}

export default ItemList
