import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonClassNames, type ButtonSize, type ButtonVariant } from "./buttonStyles";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  ...props
}: LinkButtonProps) {
  return <Link className={buttonClassNames(variant, size, { fullWidth, className })} {...props} />;
}
