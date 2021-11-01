import P from "prop-types";
import "./styles.css";

export const ButtonPages = ({ text, onClick, disabled = false }) => (
    <button className="button" onClick={onClick} disabled={disabled}>
        {text}
    </button>
);

ButtonPages.defaultProps = {
    disabled: false,
};

ButtonPages.propTypes = {
    text: P.string.isRequired,
    onClick: P.func.isRequired,
    disabled: P.bool,
};
