import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SearchControls = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchParams((prev) => {
        prev.set("name", inputRef.current?.value || "");
        return prev;
      });
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            placeholder="Search heroes, villains, powers, teams..."
            className="pl-12 h-12 text-lg bg-white"
            defaultValue={searchParams.get("name") || ""}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="h-12 bg-transparent">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12 bg-transparent">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion type="single" collapsible value="item-1">
        <AccordionItem value="item-1">
          {/* <AccordionTrigger>Filtros Avanzados</AccordionTrigger> */}
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost">Clear All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All teams
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All categories
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universe</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All universes
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    All statuses
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Minimum Strength: 0/10
                </label>
                {/* <div className="relative flex w-full touch-none select-none items-center mt-2">
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute h-full bg-primary"
                style={{ width: "0%" }}
              />
            </div>
            <div className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors" />
          </div> */}
                <Slider defaultValue={[33]} max={100} step={1} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
