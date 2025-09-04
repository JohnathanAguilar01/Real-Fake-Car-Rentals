import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <nav className="w-screen h-16 shadow-lg bg-figmabackground flex justify-between items-center p-4">
      <h1 className="text-figmaprimary font-['Archivo_Black'] text-3xl">
        Real Fake Car Rentals
      </h1>
      <Button className="bg-figmaprimary w-32 h-10 rounded-2xl text-center text-md font-['Archivo_Black']">
        Sign Up
      </Button>
    </nav>
  );
}
