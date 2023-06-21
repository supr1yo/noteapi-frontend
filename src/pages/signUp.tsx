import { Container, Card, Col, Row, Input, Spacer, Button, Link } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();



    const signup = async () => {
        const data = { username, email, password };
        let result = await fetch('https://noteapi-three.vercel.app/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        result = await result.json();
        const { token } = JSON.parse(JSON.stringify(result));

        if (token) {
            cookies.set('NOTEAPI_USER', token, { path: '/' });
            navigate('/dashboard');
        } else {
            window.alert('Something went wrong.')
            navigate('/signup')
        }

    }

    useEffect(() => {
        document.title = 'Sign up';
    }, []);

    return (
        <div>
            <Container xs css={{ padding: '6rem' }}>
                <Row gap={1}>
                    <Col>
                        <Card css={{ padding: '40px' }}>
                            <h2>Signup</h2>
                            <Card.Body>
                                {/* <Input type="file"/> */}
                                <Input
                                    type='text'
                                    clearable
                                    underlined
                                    labelPlaceholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Spacer y={2} />
                                <Input
                                    type='text'
                                    clearable
                                    underlined
                                    labelPlaceholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Spacer y={2} />
                                <Input.Password
                                    type='Password'
                                    clearable
                                    underlined
                                    labelPlaceholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Spacer y={1.5} />

                                <Button className='form-btn' color="primary" onClick={signup}>
                                    Sign up
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <Link
                                    color="primary"
                                    target="_active"
                                    href="/signup"
                                >
                                    Existing user? Login.
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </div>
    )
}

export default Signup;