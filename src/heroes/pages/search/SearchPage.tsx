import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
