type PropsType = {
  groupId: string;
  selectedValue: number | null;
  onChange: (groupId: string, value: number) => void
}

function RadioGroup({ groupId, selectedValue, onChange }: PropsType) {
  const options = {
    1: "ア",
    2: "イ",
    3: "ウ",
    4: "エ"
  }
  return (
    <div className="section">
      {Object.entries(options).map(([value, label]) => (
        <label key={`${groupId}-${value}`} className="label">
          <input
            type="radio"
            name={`group-${groupId}`}
            value={value}
            checked={selectedValue === parseInt(value, 10)}
            onChange={() => onChange(groupId, parseInt(value, 10))}
            className="radio"
          />
          {label}
        </label>
      ))
      }
    </div>
  );
}

export default RadioGroup;