import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewNote = () => {
  const [form, setForm] = useState<IForm>({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  interface IForm {
    title: string;
    description: string;
  }

  useEffect(() => {
    if (isSubmitting) {
      if (Object.values(errors).filter(e => e).length === 0) {
        createNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createNote = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });
      console.log('hello');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = validate();
    setErrors(error);
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
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
      <h1>Create Note</h1>
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
              onChange={handleChange}
            />
            <Button type='submit'>Create</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewNote;
