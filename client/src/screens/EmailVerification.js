import React, { useState, useEffect } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success';
import Card from 'react-bootstrap/Card'
import { useSearchParams } from "react-router-dom";
import Button from 'react-bootstrap/Button'
export default function EmailVerification() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState();

    async function getEmailVerification(token) {
        const response = await fetch(`/api/users/verify?token=${token}`);
        return response;
    }

    useEffect(async () => {
        setLoading(true);
        const response = await getEmailVerification(searchParams.get('token'));
        if (response.status === 200) {
            setStatus(true);
            // setSuccess(false);
        } else {
            setStatus(false);
            // setSuccess(true );
        }
        setLoading(false);
    }, []);

    return (
        <div>
            {/* {loading ? <Loading /> : body} */}
            {loading && (<Loading />)}
            {!status && (<Error error='Account is not varified! Please check your Email' />)}
            {status && (<Success success='Account Varified Successfully' />)}
            <Card border="dark" style={{ textAlign: 'center' }}>
                
                {status ? (
                    <Card.Body>
                        <Card.Title>Wellcome to Bimi Kitchen</Card.Title>
                        <Card.Text>
                            <p>Please login to Bimi Kitchen</p>
                            <Button href="/login" variant="secondary" size="lg">
                                Link
                            </Button>
                        </Card.Text>
                    </Card.Body>
                ) : (
                    <Card.Body>
                        <Card.Title>Sorry, Account not varified</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                )}

            </Card>
            <br />
        </div>
    );
}