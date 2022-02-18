import fetch from 'isomorphic-unfetch';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';
import { NextPage } from 'next';

interface Props {
  note: { title: string; description: string };
}

const Note: NextPage<Props> = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteNote = useCallback(async () => {
    const noteId = router.query.id;
    console.log('noteId', noteId);
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting, deleteNote]);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  return (
    <div className='notes-container'>
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color='red' onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();
  return { note: data };
};

export default Note;
