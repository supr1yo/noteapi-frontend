import { Button } from '@nextui-org/react'
import Cookies from 'universal-cookie';

const DeleteNoteButton = ({ id }) => {
    const cookies = new Cookies();
    const token = cookies.get('NOTEAPI_USER');
  

    const deleteNote = async () => {
        const result = await fetch(`https://noteapi-three.vercel.app/note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(await result.json())
    }
    
    return (
        <Button size="sm" color="error" light onPress={deleteNote} rounded>
            Delete
        </Button>
    )
}


export default DeleteNoteButton;