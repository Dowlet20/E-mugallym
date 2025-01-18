import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import {useState} from "react";
import {Ripple} from "react-css-spinners";
const Login = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [emailRegister, setEmailRegister] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!emailLogin || !passwordLogin) {
      setError('Doly doldurmaly');
      return;
    }
    
    setError('');

    const requestData = {
      email: emailLogin,
      password: passwordLogin
    }

    try {
      const response = await axiosInstance.post(`http://216.250.12.100:5000/api/login/`, requestData);

      e.target.reset();

    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Içeri girmekde ýalňyşlyk')
    }  finally {
      setLoading(false);
    }

  };


  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!usernameRegister || !passwordRegister || !emailRegister || !confirmPassword) {
        setError('Hemmesini doldur!');
        return;
      }
      if (passwordRegister !== confirmPassword) {
        setError('Girizýän açar sözleriňiz gabat gelmeli')
        return;
      }

      setError('');

      const registerData = {
        email:emailRegister,
        username: usernameRegister,
        password:passwordRegister,
        password2:confirmPassword
      }

      try {
        const response = await axiosInstance.post(`http://216.250.12.100:5000/api/register/`, registerData);
        console.log(response.data);
        e.target.reset();
      } catch (error) {
        setError(error.response?.data?.message || 'Agza bolmakda yalnyslyk')
      } finally {
        setLoading(false);
      }
    };
    


  return (
    <>
      {loading && (
          <div 
            className="d-flex bg-transparent"  
            style={{height: '100vh'}}
          >
            <Ripple
              color="rgba(12,235,115,1)"
              size={115}
              thickness={7}
              className="mx-auto align-self-center"
            />
          </div>
      )}
      <div className="col-lg-6">
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Içeri girmek</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>} 
          <form onSubmit={handleLogin} className="max-width-auto">
            <div className="form-group">
              <input
                name="con_name"
                type="text"
                placeholder="ulanyjy ady ýa-da e-poçta *"
                onChange={(e)=> {
                  setEmailLogin(e.target.value);
                }}
              />
              <span className="focus-border"></span>
            </div>
            <div className="form-group">
              <input
                name="con_email"
                type="password"
                placeholder="Açar sözi *"
                onChange={(e)=> {
                  setPasswordLogin(e.target.value);
                }}
              />
              <span className="focus-border"></span>
            </div>

            <div className="row mb--30">
              <div className="col-lg-6">
                <div className="rbt-checkbox">
                  <input type="checkbox" id="rememberme" name="rememberme" />
                  <label htmlFor="rememberme">Meni ýatda sakla</label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="rbt-lost-password text-end">
                  <Link className="rbt-btn-link" href="#">
                    Açar sözi ýatdan çykardym?
                  </Link>
                </div>
              </div>
            </div>

            <div className="form-submit-group">
              <button
                type="submit"
                className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Giriş</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="rbt-contact-form contact-form-style-1 max-width-auto">
          <h3 className="title">Agza bolmak</h3>
          <form onSubmit={handleRegister} className="max-width-auto">
            <div className="form-group">
              <input
                name="register-email"
                type="email"
                placeholder="e-poçta *"
                onChange={(e)=> {
                  setEmailRegister(e.target.value);
                }}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group">
              <input
                name="register_user"
                type="text"
                // placeholder="Username *"
                placeholder="Ulanyjy ady *"
                onChange={(e)=> {
                  setUsernameRegister(e.target.value);
                }}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group">
              <input
                name="register_password"
                type="password"
                // placeholder="Password *"
                placeholder="Açar sözi *"
                onChange={(e)=> {
                  setPasswordRegister(e.target.value);
                }}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-group">
              <input
                name="register_conpassword"
                type="password"
                // placeholder="Confirm Password *"
                placeholder="Açar sözi gaýtala *"
                onChange={(e)=> {
                  setConfirmPassord(e.target.value);
                }}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-submit-group">
              <button
                type="submit"
                className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Agza bolmak</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
