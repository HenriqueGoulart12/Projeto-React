import { TextInput } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<TextInput />', () => {
    it('should jave a value of searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'o valor'} />);

        const input = screen.getByPlaceholderText(/procure por posts/i);
        expect(input.value).toBe('o valor');
    });

    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'valor qualquer'} />);

        const input = screen.getByPlaceholderText(/procure por posts/i);

        const value = 'o valor';

        userEvent.type(input, value);

        expect(input.value).toBe('valor qualquer');
        expect(fn).toHaveBeenCalledTimes(value.length);
    });
});
