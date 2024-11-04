interface RandomDateProps {
  totalCalories: number;
}

const Total: React.FC<RandomDateProps> = ({ totalCalories }) => {
  return (
    <div className="total-frame">
      <span> Total calories {totalCalories}</span>
    </div>
  );
};

export default Total;
