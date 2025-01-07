import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useRegister } from "@/hooks/useAuth";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getAuthData } from "@/services/authAxios";

const Signup = () => {
  const { register, isLoading, error } = useRegister();
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }
        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear validation error when user types
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const success = await register(formData);
        if (success) {
            const { user } = getAuthData();
            setAuth({ user, isLoading: false });
            navigate('/dashboard'); // or wherever you want to redirect after registration
        }
    };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Signup"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                      <label htmlFor="username" className="sr-only">Username</label>
                      <input
                          id="username"
                          name="username"
                          type="text"
                          required
                          className={`appearance-none rounded-none relative block w-full px-3 py-2 border 
                              ${validationErrors.username ? 'border-red-500' : 'border-gray-300'}
                              placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                      />
                      {validationErrors.username && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
                      )}
                  </div>
                  <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          className={`appearance-none rounded-none relative block w-full px-3 py-2 border 
                              ${validationErrors.password ? 'border-red-500' : 'border-gray-300'}
                              placeholder-gray-500 text-gray-900 focus:outline-none 
                              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                      />
                      {validationErrors.password && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
                      )}
                  </div>
                  <div>
                      <label htmlFor="firstName" className="sr-only">First Name</label>
                      <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className={`appearance-none rounded-none relative block w-full px-3 py-2 border 
                              ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'}
                              placeholder-gray-500 text-gray-900 focus:outline-none 
                              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                      />
                      {validationErrors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                      )}
                  </div>
                  <div>
                      <label htmlFor="lastName" className="sr-only">Last Name</label>
                      <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className={`appearance-none rounded-none relative block w-full px-3 py-2 border 
                              ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'}
                              placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                              focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                      />
                      {validationErrors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                      )}
                  </div>
              </div>

              {error && (
                  <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{error}</span>
                  </div>
              )}

              <div>
                  <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {isLoading ? (
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              {/* You can add a loading spinner here */}
                          </span>
                      ) : null}
                      {isLoading ? 'Creating account...' : 'Sign up'}
                  </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
