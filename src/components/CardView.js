import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CardView({item, linkto}) {
    return (
        <div>
            <Card className = "my-3 p-3">
                 
                {/* change this route to something else later on  */}
                    <Card.Img src = {`/images/${item.image}`}/>
                
            <Card.Body>
                
                    <Card.Title as="div">
                        <strong>{item.name} </strong>
                    </Card.Title>
                
                <Card.Text as="div">
                    <div className="my-3">
                        {item.code} 
                        

                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
    )
    }

export default CardView
