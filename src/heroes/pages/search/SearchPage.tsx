import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { useQuery } from "@tanstack/react-query";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { searchHero } from "@/heroes/actions/searchHero";
import { useSearchParams } from "react-router";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data = [] } = useQuery({
    queryKey: [
      "search-heroes",
      {
        name,
        strength,
      },
    ],
    queryFn: () =>
      searchHero({
        name,
        strength,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de Superhéroes"
        subtitle="Descubre , explora y gestiona tus superhéroes y villanos favoritos"
      />

      <CustomBreadcrumb
        currentPage="Buscador de Héroes"
        breadcrumbs={[
          { label: "Home1", to: "/" },
          { label: "Home2", to: "/" },
          { label: "Home3", to: "/" },
        ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      <HeroGrid heroes={data} />
    </>
  );
};

export default SearchPage;
