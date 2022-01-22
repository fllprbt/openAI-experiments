import NextLink, { LinkProps } from "next/link";
import { Link as MUILink } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

export const Link: React.FC<
  React.PropsWithChildren<LinkProps> & { variant?: Variant }
> = ({ href, children = "Link", variant = "body2" }) => (
  <NextLink href={href} passHref>
    <MUILink variant={variant}>{children}</MUILink>
  </NextLink>
);
