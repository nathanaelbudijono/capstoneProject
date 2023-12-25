import cn from "@/type/clsxm";
import * as React from "react";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showText, setShowText] = React.useState<boolean>(false);
    const toggleText = () => {
      setShowText(!showText);
    };
    return (
      <div className="relative">
        <input
          type={showText ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white border-primary px-3 py-2 text-sm text-typography-800",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className=" absolute inset-y-0 right-0 flex items-center pr-3 z-[100]">
          <button onClick={toggleText}>
            {showText ? (
              <IoEyeOffOutline className="text-typography-800" />
            ) : (
              <IoEyeOutline className="text-typography-800" />
            )}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
