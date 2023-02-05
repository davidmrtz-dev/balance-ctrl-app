import { useAuthContext } from "../../context/AuthContext";

const Home = (): JSX.Element => {
  const auth = useAuthContext();
  return (
    <>
      Hi, {auth.user?.name}
    </>
  );
};

export default Home;