import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "../search/ui/SearchControls";
import { useSearchParams } from "react-router";
import { isValidPage } from "@/utils/isValidPage";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";

type ActiveTab = "all" | "favorites" | "heroes" | "villains";
type Category = "all" | "favorites" | "hero" | "villain";

const isActiveTab = (value: string | null): value is ActiveTab => {
  return ["all", "favorites", "heroes", "villains"].includes(value ?? "");
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const queryLimit = searchParams.get("limit") ?? "6";
  const queryPage = searchParams.get("page");
  const categoryPage = searchParams.get("category") ?? "all";
  const page = isValidPage(queryPage);

  const { data: heroesData } = usePaginateHero(page, +queryLimit, categoryPage);

  const { data: summary } = useHeroSummary();

  const activeTab = isActiveTab(tabParam) ? tabParam : "all";

  const onTabChange = (value: ActiveTab, category: Category) => {
    setSearchParams((prev) => {
      prev.set("tab", value);
      prev.set("category", category);
      prev.set("page", "1");
      return prev;
    });
  };

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de Superhéroes"
          subtitle="Explora y gestiona tus superhéroes y villanos favoritos"
        />

        <CustomBreadcrumb currentPage="Super Heroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}
        <SearchControls />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => onTabChange("all", "all")}>
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => onTabChange("favorites", "favorites")}
              className="flex items-center gap-2"
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => onTabChange("heroes", "hero")}
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => onTabChange("villains", "villain")}
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesData?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
            <HeroGrid heroes={heroesData?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <HeroGrid heroes={heroesData?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}
        {/* <HeroGrid /> */}

        {/* Pagination */}
        <CustomPagination totalPages={heroesData?.pages ?? 1} />
      </>
    </>
  );
};
