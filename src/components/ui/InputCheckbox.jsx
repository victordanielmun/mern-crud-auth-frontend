import { forwardRef } from "react";

export const InputCheckbox = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-fit bg-zinc-700 text-white px-4 py-2 rounded-md"
  />
));
