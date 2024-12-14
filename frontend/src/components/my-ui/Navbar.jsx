import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Filter } from "lucide-react";
import { useUI } from "../../context/UIContext";
import { useUser } from "../../context/UserContext";
import { useEmailsContext } from "../../context/EmailsContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Navbar = () => {
  const { profile, setProfile } = useUI();
  const [searchbarInput, setSearchbarInput] = useState("");
  const { user } = useUser();
  const { setSearchQuery } = useEmailsContext();

  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    subjects: "",
    body: "",
    date: null,
    attachments: false,
    senders: "",
  });

  // Track if any filters are applied
  const [isFiltered, setIsFiltered] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    setSearchQuery(searchbarInput);
  }, [searchbarInput]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilterOptions((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    // Check if any filter is applied
    const hasActiveFilter = Object.values(filterOptions).some(
      (value) => value !== null && value !== "" && value !== false
    );

    setIsFiltered(hasActiveFilter);

    // TODO: Implement actual filter logic in EmailsContext
    console.log("Applying filters:", filterOptions);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    // Reset all filter options
    setFilterOptions({
      subjects: "",
      body: "",
      date: null,
      attachments: false,
      senders: "",
    });
    setIsFiltered(false);
    setIsFilterOpen(false);
  };

  const createNewFolder = () => {
    // TODO: Implement create folder logic
    console.log("Creating new folder:", newFolderName);
    // Reset folder name after creation
    setNewFolderName("");
  };

  return (
    <div className="w-full left-0 flex justify-between gap-2 items-center px-4 py-2">
      <div>
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
          alt="logo"
        />
      </div>

      <div className="flex items-center gap-2 lg:w-1/2 w-full rounded-full px-3 py-2 lg:text-lg text-sm bg-[#EAF1FB]">
        <GoSearch />
        <input
          type="text"
          placeholder="Search"
          value={searchbarInput}
          onChange={(e) => setSearchbarInput(e.target.value)}
          className="bg-transparent outline-none w-full"
        />

        {/* Filter Button */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Filter
                className={`h-5 w-5 ${
                  isFiltered
                    ? "text-blue-600 fill-blue-100"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Filter Emails</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subjects" className="text-right">
                  Subjects
                </Label>
                <Input
                  id="subjects"
                  name="subjects"
                  placeholder="Filter by subject"
                  className="col-span-3"
                  value={filterOptions.subjects}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="body" className="text-right">
                  Body
                </Label>
                <input
                  id="body"
                  name="body"
                  placeholder="Filter by email body"
                  className="col-span-3"
                  value={filterOptions.body}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="col-span-3 pl-3 text-left font-normal"
                    >
                      {filterOptions.date ? (
                        format(filterOptions.date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filterOptions.date}
                      onSelect={(date) =>
                        setFilterOptions((prev) => ({
                          ...prev,
                          date,
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attachments" className="text-right">
                  Attachments
                </Label>
                <input
                  type="checkbox"
                  id="attachments"
                  name="attachments"
                  checked={filterOptions.attachments}
                  onChange={handleFilterChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="senders" className="text-right">
                  Senders
                </Label>
                <Input
                  id="senders"
                  name="senders"
                  placeholder="Filter by sender username"
                  className="col-span-3"
                  value={filterOptions.senders}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Create Folder Section */}
              <div className="grid grid-cols-4 items-center gap-4 mt-4">
                <Label htmlFor="newFolder" className="text-right">
                  New Folder
                </Label>
                <Input
                  id="newFolder"
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="col-span-2"
                />
                <Button
                  onClick={createNewFolder}
                  disabled={!newFolderName.trim()}
                  className="col-span-1"
                >
                  Create
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                Cancel
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div onClick={() => setProfile(!profile)} className="cursor-pointer">
        <img
          src={user?.image}
          alt="profile_pic"
          className="rounded-full w-10 h-10 object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Navbar;
