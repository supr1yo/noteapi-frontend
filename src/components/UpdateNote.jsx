import { useState } from "react";
import Cookies from 'universal-cookie';
import { Modal, Input, Textarea, Button, Text } from "@nextui-org/react";


const UpdateNewNote = ({ id, oldTitle, oldDescription }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesc] =  useState('');
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const cookies = new Cookies();
  const token = cookies.get("NOTEAPI_USER");
  

  const updateNote = async () => {
    let data = { title, description };
        let result = await fetch(`https://noteapi-three.vercel.app/note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        result = await result.json();

        setVisible(false);
  }


  return (
    <div>
      <Button size="sm" color="primary" light onPress={handler} rounded>
        Edit
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        aria-label="Close" 
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Create a new Note
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Title"
            initialValue={oldTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea 
          placeholder="Description"
          initialValue={oldDescription}
          rows={12} 
          onChange={(e) => setDesc(e.target.value)} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={updateNote}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateNewNote;