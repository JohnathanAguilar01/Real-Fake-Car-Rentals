import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      <nav className="w-screen h-16 shadow-lg bg-figmabackground flex justify-between items-center p-4">
        <h1 className="text-figmaprimary font-['Archivo_Black'] text-3xl">
          Real Fake Car Rentals
        </h1>
        <Button className="bg-figmaprimary w-32 h-10 rounded-2xl text-center text-md font-['Archivo_Black']">
          Sign Up
        </Button>
      </nav>
      <div className="flex bg-[url('/car_background.jpg')] w-screen h-156 bg-cover bg-center justify-center items-center pr-128 shadow-lg">
        <div className="flex flex-col w-256 h-64 bg-figmabackground rounded-lg px-16 justify-center">
          <h1 className="text-3xl font-['Archivo_Black']">
            Looking to save more
          </h1>
          <h1 className="text-3xl font-['Archivo_Black']">
            on your car rental?
          </h1>
          <div className="h-1 w-32 bg-figmaprimary my-2" />
          <p className="font-['Archivo']">Get your best car rental today!</p>
        </div>
      </div>
    </>
  );
}
