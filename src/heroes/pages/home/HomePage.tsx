import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { ChevronLeft, ChevronRight, Heart, MoreHorizontal } from "lucide-react";
import { SearchControls } from "../search/ui/SearchControls";

export const HomePage = () => {
  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de Superhéroes"
          subtitle="Explora y gestiona tus superhéroes y villanos favoritos"
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}
        <SearchControls />

        {/* Tabs */}
        <Tabs value="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains">Villains (2)</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Character Grid */}
        <HeroGrid />

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </>
    </>
  );
};
