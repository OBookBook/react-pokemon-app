import "./Btn.css";

type BtnProps = {
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const Btn = ({ handlePrevPage, handleNextPage }: BtnProps) => {
  return (
    <div className="btn">
      <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Btn;
