import HText from '@/shared/HText';
import { motion } from 'framer-motion'
import { useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
  address: string;
  postalcode: string;
  city: string;
  phone: string;
}

const SignUp = () => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    fetch('http://localhost:8080/auth/register', {
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
          alert(data.message);
        });
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if(data) {
        console.log('Success:', data);
        navigate('/signin');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  };

  return (
    <section className="mx-auto w-1/2 pt-24">
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
          <span className="text-primary-500">SIGN UP</span> TO HAVE NICE PC
        </HText>
      </motion.div>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <input 
            className={inputStyles}
            type="text"
            placeholder="USERNAME"
            {...register("username", {
              required: true,
              maxLength: 100
            })}
          />
          {errors.username && (
            <p className="mt-1 text-primary-500">
              {errors.username.type === "required" && "This field is required."}
              {errors.username.type === "maxLength" && "Max length is 100 characters."}
            </p>
          )}
          <input 
            className={inputStyles}
            type="text"
            placeholder="NAME"
            {...register("name", {
              required: true,
              maxLength: 100
            })}
          />
          {errors.name && (
            <p className="mt-1 text-primary-500">
              {errors.name.type === "required" && "This field is required."}
              {errors.name.type === "maxLength" && "Max length is 100 characters."}
            </p>
          )}

          <input 
            className={inputStyles}
            type="text"
            placeholder="EMAIL"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })}
          />
          {errors.email && (
            <p className="mt-1 text-primary-500">
              {errors.email.type === "required" && "This field is required."}
              {errors.email.type === "pattern" && "Invalid email address."}
            </p>
          )}

          <input 
            className={inputStyles}
            type="password"
            placeholder="PASSWORD"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 36
            })}
          />
          {errors.password && (
            <p className="mt-1 text-primary-500">
              {errors.password.type === "required" && "This field is required."}
              {errors.password.type === "minLength" && "Min length is 8 characters."}
              {errors.password.type === "maxLength" && "Max length is 36 characters."}
            </p>
          )}

          <input 
              className={inputStyles}
              type="text"
              placeholder="ADDRESS"
              {...register("address", {
                required: true,
                maxLength: 50
              })}
          />
          {errors.address && (
            <p className="mt-1 text-primary-500">
              {errors.address.type === "required" && "This field is required."}
              {errors.address.type === "maxLength" && "Max length is 50 characters."}
            </p>
          )}

          <input 
              className={inputStyles}
              type="text"
              placeholder="POSTAL CODE"
              {...register("postalcode", {
                required: true,
                maxLength: 50
              })}
          />
          {errors.postalcode && (
            <p className="mt-1 text-primary-500">
              {errors.postalcode.type === "required" && "This field is required."}
              {errors.postalcode.type === "maxLength" && "Max length is 50 characters."}
            </p>
          )}

          <input 
            className={inputStyles}
            type="text"
            placeholder="CITY"
            {...register("city", {
              required: true,
              maxLength: 50
            })}
          />
          {errors.city && (
            <p className="mt-1 text-primary-500">
              {errors.city.type === "required" && "This field is required."}
              {errors.city.type === "maxLength" && "Max length is 50 characters."}
            </p>
          )}

          <input 
              className={inputStyles}
              type="text"
              placeholder="PHONE NUMBER"
              {...register("phone", {
                required: true,
                maxLength: 15
              })}
          />
          {errors.phone && (
            <p className="mt-1 text-primary-500">
              {errors.phone.type === "required" && "This field is required."}
              {errors.phone.type === "maxLength" && "Max length is 15 characters."}
            </p>
          )}

          <button 
              type="submit"
              className="mt-5 rounded-lg bg-secondary-500 xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-primary-500 px-10"
          >
              SIGN UP
          </button>
       
        </form>            
      </motion.div>
      <motion.div 
        className="mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
            hidden: {opacity: 0, x:-50},
            visible: {opacity: 1, x:0}
        }}
      >
        <Link to={`/signin`} className="text-sm font-bold text-primary-500 underline hover:text-secondary-500">Already have account</Link>
      </motion.div>
      <motion.div 
        className="mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        variants={{
            hidden: {opacity: 0, x:-50},
            visible: {opacity: 1, x:0}
        }}
      >
        <Link to={`/`} className="text-sm font-bold text-primary-500 underline hover:text-secondary-500">Back to home</Link>
      </motion.div>
    </section>
  )
}

export default SignUp
