import { Container, Card, Text, Col, Row, Input, Spacer, Button, Link } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";



const Login: any = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();


    const login = async () => {
        let data = { email, password };
        let result = await fetch('https://noteapi-three.vercel.app/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        result = await result.json();

        const { token }: any = JSON.parse(JSON.stringify(result) as any);

        if (token) {
            cookies.set('NOTEAPI_USER', token, { path: '/', maxAge: 60 * 60 * 24 * 30 });
            navigate('/dashboard');
        } else {
            window.alert('Wrong email address or password provided.')
            navigate('/login')
        }

    }

    useEffect(() => {
        document.title = 'Login';
    }, []);

    return (
        <Container xs css={{ padding: '6rem' }}>
            <Row gap={1}>
                <Col>
                    <Card css={{ padding: '40px' }}>
                        <Text
                            size={40}
                            css={{
                                textAlign: "center"
                            }} h1>Login</Text>
                        <Card.Body>
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
                            <Button className='form-btn' color="primary" onClick={login}>
                                Login
                            </Button>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                color="primary"
                                target="_active"
                                href="/signup"
                            >
                                New User? Create an account.
                            </Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;