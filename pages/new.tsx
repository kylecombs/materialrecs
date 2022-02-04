import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, FormRadio, Loader } from 'semantic-ui-react';
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
      if (Object.keys(errors).length === 0) {
        createNote();
      }
    }
  }, [errors]);

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
    <div className='from-container'>
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
