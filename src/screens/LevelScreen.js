import React from 'react'
import programs from '../programs'

import { Row, Col } from 'react-bootstrap'
import CardView from '../components/CardView'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

function LevelScreen(props) {
    const { level } = useParams();
    return (
        <div>
            <Link to ="/" className='btn btn-light my-3'> Go Back</Link>
            <h1> Programs in {level}</h1>
            <Row>
                {programs.map(item=>(
                    
                <Col key ={item._id} sm={12} md ={6} lg={4} xl={3}>

                <Link to = {`/program/${item.code}`}>
                <CardView item = {item} />
                </Link>
                </Col>
                ))
                }
            </Row>
            
        </div>
    )
}

export default LevelScreen
