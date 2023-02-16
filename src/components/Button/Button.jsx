import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClickBtn, children }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClickBtn}>
      {children}
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
