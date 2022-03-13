import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";

type CustomLinkProps = LinkProps & {
   classes: string;
};

export default function CustomLink({children, to, ...props}: CustomLinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({path: resolved.pathname, end: true})
  return (
    <Link
      className={`${props.classes} ${match ? "text-text-accent" : "text-white"}`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}
