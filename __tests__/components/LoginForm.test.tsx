// __tests__/LoginForm.test.tsx
import LoginForm from "@/components/LoginForm";
import { fireEvent, render, screen } from "@testing-library/react";

describe("LoginForm", () => {
  test("renders the login form", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error message when email and password are empty", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/email and password are required./i)
    ).toBeInTheDocument();
  });

  test("shows error message when email is empty", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/email and password are required./i)
    ).toBeInTheDocument();
  });

  test("shows error message when password is empty", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/email and password are required./i)
    ).toBeInTheDocument();
  });

  test("shows error message for invalid email format", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "userexample.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/invalid email format./i)).toBeInTheDocument();
  });

  test("shows error message when password is too short", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/password must be at least 6 characters long./i)
    ).toBeInTheDocument();
  });

  test("calls onLogin with email and password when input is valid", () => {
    const onLoginMock = jest.fn();
    render(<LoginForm onLogin={onLoginMock} />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "securepassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(onLoginMock).toHaveBeenCalledWith(
      "user@example.com",
      "securepassword"
    );
  });
});
