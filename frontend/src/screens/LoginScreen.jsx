import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { setCartOwner } from "../slices/cartSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth); //in redux state ->  auth: { userInfo: null}

  const { search } = useLocation();
  const sp = new URLSearchParams(search); //search params(sp)
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("submit");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCartOwner(res._id));
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer
      kicker="Member access"
      title={<>Welcome back to the <mark>shelf</mark>.</>}
      lede="Sign in to manage your orders, track deliveries and pick up where you left off."
      notes={['Saved cart and favourites', 'Live order status', 'Faster checkout next time']}
      index="01"
    >
      <p className="eyebrow">Sign in</p>
      <h1>Good to see you again.</h1>
      <p className="lede">Use your account details below to continue shopping.</p>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="auth-switch">
        <Col>
          New customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Create an account
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
