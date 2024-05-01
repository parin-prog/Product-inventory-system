import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../apiCalls/userApis';

const Register = () => {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      if (status) {
        navigate('/');
      }
    }, [currentUser, status])

    const handleSubmit = async (values) => {
      try {
        const res = await register(dispatch, values);
        setStatus(true);
        console.log(res)
      } catch (err) {
        console.error(err);
      }
    };



    return (
      <Formik
        initialValues={{ name: '', username: '', email: '', password: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          username: Yup.string().required('Required').min(4, 'Enter the username above 4 characters.'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Product Inventory
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <div className="form-group">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <Field type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <Field type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <Field type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <Field type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <button type="submit" className="btn">Submit</button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    );
  };

  export default Register;
