function SearchBox({ value, onChange }) {
  return (
    <input
      className="Buscser"
      type="text"
      placeholder="Buscar servicio..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
export default SearchBox;