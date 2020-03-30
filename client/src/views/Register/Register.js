import React from "react";
import moment from "moment";
import './register.css'
// field form ErrorMessage
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../actions/actions";
import { useDispatch } from "react-redux";
import CustomButton from '../../components/CustomButton/CustomButton'




function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        // lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        // lastName: Yup.string()
        //   .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            
            
          };
          console.log(dataToSubmit)
          dispatch(registerUser(dataToSubmit)).then(response => {
            console.log(response)
            if (response.payload.token) {
              props.history.push("/login");
            } else {
              alert('couldnt log you in check your credentials')
            }
          })

          setSubmitting(false);
        }, 500);
      }}
      render=  { props => {
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
          <div className="app">
            <div>
            <h2>SIGN UP</h2>
            </div>
            
            <Form style={{ minWidth: '375px' }} onSubmit={handleSubmit} >

              <div>
              <Field
                  id="name"
                  placeholder="Enter your name"
                  
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input_style'
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </div>
                
              

              {/* <div>
              <Field
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input_style'
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </div> */}
                
              <div>
              <Field
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input_style'
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
                  className='input_style'
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>
                
              <div><Field
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='input_style'
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </div>
                
              <div>
                <CustomButton style={{marginTop:'20px'}} onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit</CustomButton>
                
              </div>
              <p>Already have an account? <a href='/login'>Log In</a> </p>
            </Form>
          </div>
        );
      }}
    />
    )}


export default RegisterPage
