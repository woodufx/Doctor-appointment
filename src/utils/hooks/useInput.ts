import { useState } from "react";

const useInput = (initial: string, required: boolean) => {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<"" | "error" | "warning" | undefined>(undefined);

  return {
    value,
    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value && required) setStatus('error');
      else setStatus(undefined);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    status
  };
};

export default useInput
