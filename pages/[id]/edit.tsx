import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

interface Props {
  note: { title: string; description: string };
}

const EditNote: NextPage<Props> = ({ note }) => {
  const [form, setForm] = useState<IForm>({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  interface IForm {
    title: string;
    description: string;
  }

  const updateNote = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${router.query.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );
      console.log('hello');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [form, router]);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.values(errors).filter((e) => e).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, updateNote]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error = validate();
    setErrors(error);
    setIsSubmitting(true);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validate = () => {
    let error = { title: '', description: '' };

    if (!form.title) {
      error.title = 'title is required';
    }
    if (!form.description) {
      error.description = 'description is required';
    }
    return error;
  };

  return (
    <div className='form-container'>
      <h1>Update Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline='centered' />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: 'Please enter a title', pointing: 'below' }
                  : null
              }
              label='Title'
              placeholder='Title'
              name='title'
              value={form.title}
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              error={
                errors.description
                  ? { content: 'Please enter a description', pointing: 'below' }
                  : null
              }
              label='Description'
              placeholder='Description'
              name='description'
              value={form.description}
              onChange={handleChange}
            />
            <Button type='submit'>Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();
  return { note: data };
};

export default EditNote;
