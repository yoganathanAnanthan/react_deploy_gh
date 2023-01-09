import React from 'react'

//const Header = (props) => { user props.title to get from app.js
const Header = ({title,name}) => {
  return (
    <header>
        <h1>{title}</h1>
        <h4>{name}</h4>
    </header>
  )
}

Header.defaultProps={
  title:"it is default",
  name: "Ananthan"
}

export default Header
