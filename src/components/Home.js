import Note from "./Note";


const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      <Note showAlert={showAlert}></Note>
    </div>
  );
};

export default Home;
