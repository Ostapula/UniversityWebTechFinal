import HText from "@/shared/HText";
import { setClientData } from "@/state/userschanger/clientDataSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const SignIn = () => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;
  const [isErrorMsg, setIsErrorMsg] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          return response.json().then((data) => {
            console.error("Error:", data.message);
            setIsErrorMsg(data.message);
          });
        } else if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", data.jwt);
        const newClientData = {
          id: data.id,
          username: data.username,
          name: data.name,
          email: data.email,
          address: data.address,
          postalCode: data.postalcode,
          city: data.city,
          phone: data.phone,
        };
        console.log(newClientData.username);
        dispatch(setClientData(newClientData));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
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
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <HText>
          <span className="text-primary-500">SIGN IN</span> TO HAVE NICE PC
        </HText>
      </motion.div>
      <motion.div
        className="mt-10 basis-3/5 md:mt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={inputStyles}
            type="text"
            placeholder="USERNAME"
            {...register("username", {
              required: true,
              maxLength: 100,
            })}
          />
          {errors.username && (
            <p className="mt-1 text-primary-500">
              {errors.username.type === "required" && "This field is required."}
              {errors.username.type === "maxLength" &&
                "Max length is 100 characters."}
            </p>
          )}

          <input
            className={inputStyles}
            type="password"
            placeholder="PASSWORD"
            {...register("password", {
              required: true,
              maxLength: 36,
            })}
          />
          {errors.password && (
            <p className="mt-1 text-primary-500">
              {errors.password.type === "required" && "This field is required."}
              {errors.password.type === "maxLength" &&
                "Max length is 36 characters."}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 rounded-lg bg-secondary-500 xs:px-20 py-3 transition duration-500 hover:text-white hover:bg-primary-500 px-10"
          >
            SIGN IN
          </button>
        </form>
      </motion.div>
      {isErrorMsg == "" ? (
        ""
      ) : (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-5 bg-white rounded shadow-lg">
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsErrorMsg("")}
            >
              &times;
            </span>
            <div>
              <HText>
                E<span className="text-primary-500">RR</span>OR
              </HText>
              <div className="pt-2">
                <h6 className="font-bold">{isErrorMsg}</h6>
              </div>
              <div>
                <div className="pt-10 flex justify-center gap-10">
                  <button
                    onClick={() => setIsErrorMsg("")}
                    className="rounded-lg bg-secondary-500 px-10 py-2 hover:text-white hover:bg-primary-500"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <motion.div
        className="mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <Link
          to={`/forgot-password`}
          className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
        >
          Forgot password
        </Link>
      </motion.div>
      <motion.div
        className="mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <Link
          to={`/signup`}
          className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
        >
          Don't have account
        </Link>
      </motion.div>
      <motion.div
        className="mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <Link
          to={`/`}
          className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
        >
          Back to home
        </Link>
      </motion.div>
    </section>
  );
};

export default SignIn;
