import {Modal, Button} from "react-bootstrap";
import React, {useState} from "react";
import "./PostForm.css";



function PostForm ({
    onSubmit,
   
}: {
    onSubmit: (title: string, thought: string) => void;
   
}) {
    // bootstrap settings for modal 
    const [show, setShow] = useState(false);
    const onClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[title, setTitle] = useState("");
    const[thought, setThought] = useState("")
  
   
  
    return (
        <div className="formWrapper">{

    <>
      <Button 
      role="button"
      aria-label="showForm"
      className="button" 
      variant="primary" 
      onClick={handleShow}>
        New Thought
      </Button>

      <Modal 
      role="modal"
      aria-label="modalForm"
       show={show} 
       className={show === true ? "modal show" : "modal"}
       onClick={onClose}>

        <Modal.Header closeButton>
          <Modal.Title>Share your thoughts...</Modal.Title>
        </Modal.Header>

        <form 
            role="form"
            aria-label="form"
            onSubmit={(event) => {
            event.preventDefault();
            onSubmit(title, thought);
            onClose();
            setTitle("");
            setThought("");
              
        }}> 

        <Modal.Body className="modalBody">
            <label>
                <p>Title:</p>
                <input 
                role="textbox1" 
                aria-label="titleInput"
                type="text" 
                onChange={(event) => {setTitle(event.target.value)}}/>
            </label>
            <label>
                <p>Thought:</p>
                <textarea 
                role="textbox2"
                aria-label="thoughtInput"
                className="thoughtInput" 
                onChange={(event) => {setThought(event.target.value)}}/>
            </label>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          role="button"
          aria-label="onSubmit"
          type="submit" 
          variant="primary" 
          >
            Add Spook
          </Button >
          </Modal.Footer>
        </form>  
      </Modal>
    </>
  
}
        </div>
       
    )
    
}

export default PostForm;