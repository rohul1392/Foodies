import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Carousel from 'react-bootstrap/Carousel';
import {
	AdvancedImage,
	lazyload,
	responsive,
	accessibility,
	placeholder
} from "@cloudinary/react";


const Menu = () => {
    return (
        <div className="p-3 m-5 rounded w-90">
            <h1 style={{ fontWeight: 'bold' }} className="row justify-content-center">
                Weekly Spacial Set Menus
            </h1>
            <Carousel>
              <Carousel.Item interval={2500}>
                <CardGroup>
                    <Card className="p-4 m-2">
                        <Card.Img variant="top" src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643400412/rs_w_2560_txlbmv.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card className="p-4 m-2">
                        <Card.Img variant="top" src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643400412/W_curry_libldg.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card className="p-4 m-2">
                        <Card.Img variant="top" src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643400412/sunday_curry_ahkssq.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>
              </Carousel.Item>
              <Carousel.Item interval={2500}>
                <CardGroup>
                    <Card className="p-4 m-2">
                        <Card.Img variant="top" src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643400412/rs_w_2560_txlbmv.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card className="p-4 m-2">
                        <Card.Img variant="top" src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643400412/W_curry_libldg.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional
                                content.{' '}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card className="p-4 m-2">
                        <Card.Img variant="top" src="https://res.cloudinary.com/dcq1c5yys/image/upload/v1643400412/sunday_curry_ahkssq.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This card has even longer content than the first to
                                show that equal height action.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>
              </Carousel.Item>
            </Carousel>

        </div>
    );
}

export default Menu;
