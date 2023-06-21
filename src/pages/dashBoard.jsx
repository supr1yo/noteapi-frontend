import  { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Card, Grid, Text, Row } from "@nextui-org/react";
import Header from "../components/Header";
import DeleteNoteButton from '../components/DeleteNote';
import UpdateNewNote from '../components/UpdateNote';
import { Loading } from "@nextui-org/react";

const Dashboard = () => {
    const cookies = new Cookies();
    const [cookieExist] = useState(cookies.get('NOTEAPI_USER'));
    const [note, setNote] = useState(null);
    const [user, setUser] = useState(0);
    const token = cookies.get("NOTEAPI_USER");

    const { id } = token ? jwt_decode(token) : {}; // Decoding token
    

    const notes = async () => {

        // Encoding ID as parameter
        const encodedParam = new URLSearchParams((id)).toString();

        // getNotes endpoint
        const result = await fetch(`https://noteapi-three.vercel.app/note?${encodedParam}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        setNote(await result.json());
    }

    const noteUser = async () => {

        const userResult = await fetch(`https://noteapi-three.vercel.app/users/userinfo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const status = userResult.status;
        if (status === 200) {
            setUser(await userResult.json());


        } else {
            window.alert('Something went wrong.');
        }

    }
    useEffect(() => {
        notes();
        noteUser();
        // document.title = `${user.username}'s dashboard`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note]);

    



    if (!cookieExist) {
        return <Navigate replace to="/login" />;
    } else if (note === null) {
        return (
            <div>

                <Grid.Container gap={2} justify="center" css={{ padding: '50px' }}>
                    <Grid sm={12} md={2}>
                        <Loading
                            loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
                        />
                    </Grid>
                </Grid.Container>


            </div>
        );
    } else {

        return (
            <div>
                <Header avatarURL="" username={user.username} createdAt={user.createdAt}/>
                <Grid.Container gap={2} justify="center" >
                    {note.map((item) => (


                        <Grid key={item._id} sm={12} md={2} >
                            <Card css={{ mw: "330px" }}>
                                <Card.Header>
                                    <Text b>{item.title}</Text>
                                </Card.Header>
                                <Card.Divider />
                                <Card.Body css={{ py: "$10" }}>
                                    <Text>
                                        {item.description}
                                    </Text>
                                </Card.Body>
                                <Card.Divider />
                                <Card.Footer>
                                    <Row justify="flex-end">
                                        <UpdateNewNote id={item._id} oldTitle= {item.title} oldDescription={item.description} />
                                        <DeleteNoteButton id={item._id}/>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Grid>


                    ))}
                </Grid.Container>


            </div>
        );
    }
};

export default Dashboard;