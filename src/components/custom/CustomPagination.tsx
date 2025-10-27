import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";
import { isValidPage } from "@/utils/isValidPage";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("page");
  const page = isValidPage(queryPage);

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handleChangePage(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handleChangePage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      {/* <Button variant="default" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button> */}
      {/* <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handleChangePage(page + 1)}
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
