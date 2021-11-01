import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonPages } from '.';

describe('<ButtonPages />', () => {
  it('should render the button with the text "Carregar mais Posts"', () => {
    const fn = jest.fn();
    render(<ButtonPages text="Carregar mais Posts" onClick={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<ButtonPages text="Carregar mais Posts" onClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<ButtonPages text="Carregar mais Posts" disabled={true} onClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });

    expect(button).toBeDisabled();
  });

  it('should be disabled when disabled is false', () => {
    const fn = jest.fn();
    render(<ButtonPages text="Carregar mais Posts" disabled={false} onClick={fn}/>);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });

    expect(button).toBeEnabled();
  });
});
