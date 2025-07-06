'use client';

type ErrorNoteProps = {
  error: Error;
  reset: () => void;
};
const ErrorComponent = ({ error, reset }: ErrorNoteProps) => {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default ErrorComponent;
