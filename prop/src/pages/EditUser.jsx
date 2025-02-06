import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userService.getUserById(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (values) => {
    await userService.updateUser(userId, values);
    navigate('/');
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(3, 'Minimum 3 characters'),
    email: Yup.string().email('Invalid email format').required('Required'),
    role: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={user}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" />
        <Field type="email" name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />
        <Field type="text" name="role" placeholder="Role" />
        <ErrorMessage name="role" component="div" />
        <button type="submit">Update User</button>
      </Form>
    </Formik>
  );
};

export default EditUser;
