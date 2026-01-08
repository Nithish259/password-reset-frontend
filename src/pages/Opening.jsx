import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Opening = () => {
  return (
    <div className="flex flex-col relative min-h-screen">
      <Navbar />
      <Header />
    </div>
  );
};

export default Opening;