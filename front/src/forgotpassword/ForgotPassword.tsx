import HText from '@/shared/HText';
import { RootState } from '@/state/store';
import { setClientData } from '@/state/userschanger/clientDataSlice';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface FormData {
    username: string;
}
interface FormDataCode {
    code: number;
}

interface FormDataNewPassword {
    password: string; 
    confirmPassword: string;
}


const ForgotPassword = () => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;
  const [isUsernameSubmited, setIisUsernameSubmited] = useState<boolean>(false);
  const [isCode, setisCode] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const clientData = useSelector((state: RootState) => state.clientData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatchEvent
  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorsUsername },
  } = useForm<FormData>();

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
  } = useForm<FormDataCode>();

  const {
    register: registerNewPassword,
    handleSubmit: handleSubmitNewPassword,
    formState: { errors: errorsNewPassword },
    watch,
  } = useForm<FormDataNewPassword>();

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    fetch(`http://localhost:8080/auth/forgot-password/${data.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.status === 401) {
        return response.json().then(data => {
          console.log(data);
          console.error('Error:', data.message);
        });
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        const newClientData = {
            id: data.id,
            username: '',
            name: '',
            email: '',
            address: '',
            postalCode: '',
            city: '',
            phone: '',
        };
      dispatch(setClientData(newClientData));
      console.log(data.id);
      setIisUsernameSubmited(true);
      setisCode(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const onSubmitCode = (data: FormDataCode) => {
    fetch(`http://localhost:8080/auth/forgot-password-code/${data.code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.status === 401) {
        return response.json().then(data => {
          console.error('Error:', data.message);
        });
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setisCode(false);
      setNewPassword(true);
      console.log(data.message);
      console.log(clientData.id);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  const onSubmitPassword = (data: FormDataNewPassword) => {
    fetch(`http://localhost:8080/auth/change-pass/${clientData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.status === 401) {
        return response.json().then(data => {
          console.error('Error:', data.message);
        });
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        console.log(data.message);
      navigate("/signin");
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  return (
    <div className="mx-auto w-1/2 pt-24">
        
        <motion.div
        className="md:w-4/5 mb-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
            hidden: {opacity: 0, x:-50},
            visible: {opacity: 1, x:0}
        }}
      >
        <HText>
            FORGOT<span className="text-primary-500">PASSWORD</span>
        </HText>
      </motion.div>
      {!isUsernameSubmited && (
      <motion.div
        className="mt-10 basis-3/5 md:mt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
            hidden: {opacity: 0, y:50},
            visible: {opacity: 1, y:0}
        }}
        >
            <HText>
                ENTER<span className="text-primary-500">USERNAME</span>
            </HText>
            <form
              onSubmit={handleSubmitUsername(onSubmit)}
            >
              <input 
                className={inputStyles}
                type="text"
                placeholder="USERNAME"
                {...registerUsername("username", {
                  required: true,
                  maxLength: 100
                })}
              />
              {errorsUsername.username && (
                <p className="mt-1 text-primary-500">
                  {errorsUsername.username.type === "required" && "This field is required."}
                  {errorsUsername.username.type === "maxLength" && "Max length is 100 characters."}
                </p>
              )}
              <button 
                  type="submit"
                  className="mt-5 rounded-lg bg-secondary-500 xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-primary-500 px-10"
              >
                  SUBMIT
              </button>
            
            </form>            
        
      </motion.div>
        )}
        {isCode && (
            <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
                hidden: {opacity: 0, y:50},
                visible: {opacity: 1, y:0}
            }}
            >
                <HText>
                  ENTER<span className="text-primary-500">CODE FROM YOUR EMAIL</span>
                </HText>
                <form
                  onSubmit={handleSubmitCode(onSubmitCode)}
                >
                  <input 
                    className={inputStyles}
                    type="number"
                    placeholder="CODE"
                    {...registerCode("code", {
                      required: true,
                      maxLength: 6
                    })}
                  />
                  {errorsCode.code && (
                    <p className="mt-1 text-primary-500">
                      {errorsCode.code.type === "required" && "This field is required."}
                      {errorsCode.code.type === "maxLength" && "Max length is 6 characters."}
                    </p>
                  )}
                  <button 
                      type="submit"
                      className="mt-5 rounded-lg bg-secondary-500 xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-primary-500 px-10"
                  >
                      SUBMIT
                  </button>
                </form>            
            </motion.div>
        )}
        {newPassword && (
            <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
                hidden: {opacity: 0, y:50},
                visible: {opacity: 1, y:0}
            }}
            >
                <HText>
                  SET <span className="text-primary-500">NEW PASSWORD</span>
                </HText>
                <form
                    onSubmit={handleSubmitNewPassword(onSubmitPassword)}
                >
                    <input 
                        className={inputStyles}
                        type="password"
                        placeholder="PASSWORD"
                        {...registerNewPassword("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 36
                        })}
                    />
                    {errorsNewPassword.password && (
                    <p className="mt-1 text-primary-500">
                        {errorsNewPassword.password.type === "minLength" && "Min length is 8 characters."}
                        {errorsNewPassword.password.type === "required" && "This field is required."}
                        {errorsNewPassword.password.type === "maxLength" && "Max length is 36 characters."}
                    </p>
                    )}
                    <input 
                        className={inputStyles}
                        type="password"
                        placeholder="PASSWORD"
                        {...registerNewPassword("confirmPassword", {
                        required: true,
                        minLength: 8,
                        maxLength: 36,
                        validate: value => 
                            value === password || "The passwords do not match."
                        
                        })}
                    />
                    {errorsNewPassword.password && (
                    <p className="mt-1 text-primary-500">
                        {errorsNewPassword.password.type === "minLength" && "Min length is 8 characters."}
                        {errorsNewPassword.password.type === "required" && "This field is required."}
                        {errorsNewPassword.password.type === "maxLength" && "Max length is 36 characters."}
                        {errorsNewPassword.password.type === "value" && "Value error TEST."}
                    </p>
                    )}
                    <button 
                      type="submit"
                      className="mt-5 rounded-lg bg-secondary-500 xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-primary-500 px-10"
                  >
                      SUBMIT
                  </button>
                </form>
            </motion.div>
        )}
    </div>
  )
}

export default ForgotPassword