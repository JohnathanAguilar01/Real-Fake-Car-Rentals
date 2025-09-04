import { Button } from "@/components/ui/button";
import DateRangePicker from "../../components/date-picker/date-range-picker.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LandingSearch() {
  return (
    <div className="flex bg-[url('/car_background.jpg')] w-screen h-156 bg-cover bg-center justify-center items-center pr-128 shadow-lg">
      <div className="flex flex-col w-fit h-64 bg-figmabackground rounded-lg px-16 justify-center">
        <h1 className="text-3xl font-['Archivo_Black']">
          Looking to save more
        </h1>
        <h1 className="text-3xl font-['Archivo_Black']">on your car rental?</h1>
        <div className="h-1 w-32 bg-figmaprimary my-2" />
        <p className="font-['Archivo']">Get your best car rental today!</p>
        <div className="flex gap-2 bg-figmavarient w-fit p-3 rounded-lg my-2">
          <DateRangePicker />
          <Select>
            <SelectTrigger className="w-[128px] bg-figmabackground">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="w-32 bg-figmaprimary text-2xl font-['Archivo_Black']">
            Find
          </Button>
        </div>
      </div>
    </div>
  );
}
