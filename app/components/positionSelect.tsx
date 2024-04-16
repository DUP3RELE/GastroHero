
interface PositionSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PositionSelect: React.FC<PositionSelectProps> = ({ value, onChange }) => {
  return (
    <select
      name="position"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
    >
      <option value="">Wybierz opcję</option>
      <option value="opcja1">Opcja 1</option>
      <option value="opcja2">Opcja 2</option>
      <option value="opcja3">Opcja 3</option>
    </select>
  );
};

export default PositionSelect;
