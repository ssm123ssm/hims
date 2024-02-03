import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ props: { beds, handleSearchChange } }) => {
  return (
    <div className="flex flex-row justify-end p-4 border-slate-700 mt-4 h-15">
      <Autocomplete
        label="Search patients"
        className="max-w-xs text-slate-500"
        onSelectionChange={(e) => {
          handleSearchChange(e);
        }}
        startContent={
          <FontAwesomeIcon icon={faSearch} className="text-slate-500" />
        }
        labelPlacement="outside"
      >
        {beds.map((bed) => (
          <AutocompleteItem key={bed._id} value={bed.first_name[0]?.value}>
            {bed.first_name.slice(-1)[0]?.value}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default Search;
