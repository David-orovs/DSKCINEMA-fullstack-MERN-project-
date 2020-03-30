import React, { useState } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import './login.css'
import axios from 'axios';
import { Checkbox } from 'antd';
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import { loginUser } from "../../actions/actions";
import { useDispatch } from "react-redux";
import CustomButton from '../../components/CustomButton/CustomButton'

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };
          console.log('yuuyuy')
          
       dispatch(loginUser(dataToSubmit))
          .then(response => {
            if (response.token) {
              
              props.history.push('/')
              
            } else {
              setFormErrorMessage('Check out your Account or Password again')
              console.log('e no ')
            }
          })
          .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}

      render={props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="login__page">
            <div>
              <h2 style={{ color: 'white' }}>LOGIN</h2>
            </div>
            <Form onSubmit={handleSubmit} >

              <div>
                <Field
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input_styles'
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>

              <div>
                <Field
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input_styles'
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>


              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}
              <div>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>

                <div>
                  <CustomButton style={{ margin: '10px' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in</CustomButton>
                </div>
                Or <a href="/register">register now!</a>
              </div>

            </Form>
          </div>



        );
      }}
    />
  );
};

export default withRouter(LoginPage);


