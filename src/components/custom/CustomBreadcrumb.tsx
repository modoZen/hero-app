import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumb = ({ currentPage, breadcrumbs }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs?.map((breadcrumb) => (
          <div className="flex items-center">
            <BreadcrumbSeparator className="mr-2" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
