import React from 'react'

function ConversationsItem(props) {
  return (
    <>
          <div className=" d-flex  align-items-center">
            <img
              src={props.image}
              alt="Logo"
              style={{
                clipPath: "circle(40%) ",
                width: "40px",
                height: "40px",
              }}
            />
            {props.name}
          </div>
          <hr />
        </>
  )
}

export default ConversationsItem