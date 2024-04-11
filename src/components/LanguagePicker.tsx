import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import "/node_modules/flag-icons/css/flag-icons.min.css";

type Props = {};

const LanguagePicker = (props: Props) => {
  return (
    <div>
      <Select defaultValue="en">
        <SelectTrigger id="languages" className="space-x-2">
          <SelectValue placeholder="Lang" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="en">
            <span className="fi fis fi-gb pr-2"></span>
          </SelectItem>
          <SelectItem value="fi">
            <span className="fi fis fi-fi"></span>
          </SelectItem>
          <SelectItem value="vn">
            <span className="fi fis fi-vn"></span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguagePicker;
