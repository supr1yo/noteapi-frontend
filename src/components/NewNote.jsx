import { useState } from "react";
import Cookies from 'universal-cookie';
import { Modal, Input, Textarea, Button, Text } from "@nextui-org/react";


const CreateNewNote = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesc] =  useState('');
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const cookies = new Cookies();
  const token = cookies.get("NOTEAPI_USER");
  

  const addNote = async () => {
    let data = { title, description };
        let result = await fetch('https://noteapi-three.vercel.app/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        result = await result.json();
        console.log(result);
        setVisible(false);
  }


  return (
    <div>
      <Button auto color="success" onPress={handler} rounded>
        New Note
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea 
          placeholder="Description"
          rows={12} 
          onChange={(e) => setDesc(e.target.value)} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateNewNote;