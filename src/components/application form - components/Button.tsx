import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function ButtonPrimary() {
    return (
        <Button className="bg-emerald-600 hover:bg-emerald-700 hover:text-white px-10 text-white transition-colors duration-300">
            Continue
        </Button>
    );
}

export function ButtonSecondary() {
    return (
        <Button className="bg-white hover:bg-emerald-700 hover:text-white text-emerald-600 px-6 transition-colors duration-300">
            Save
        </Button>
    );
}

export function ButtonLink() {
    return (
        <div className="flex justify-start">
            <Button
                variant="link"
                className="text-emerald-500 flex items-center"
            >
                <ChevronLeft className="text-xl" />
                <span className="text-base font-medium ml-0 pl-0">Back</span>
            </Button>
        </div>
    );
}

export function ButtonSubmit() {
    return (
        <Button className="bg-emerald-600 hover:bg-emerald-700 hover:text-white px-10 text-white transition-colors duration-300">
            Submit
        </Button>
    );
}


