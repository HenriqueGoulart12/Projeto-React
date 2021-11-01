import P from "prop-types";
import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <input
            className="text-input"
            value={searchValue}
            onChange={handleChange}
            type="search"
            placeholder="Procure por Posts"
        />
    );
};

TextInput.propTypes = {
    searchValue: P.string.isRequired,
    handleChange: P.func.isRequired,
};
