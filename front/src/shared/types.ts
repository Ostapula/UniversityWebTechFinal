export enum SelectedPage {
    Home = "home",
    Benefits = "benefits",
    OurWorks = "ourworks",
    ContactUs = "contactus"
}

export enum SelectedPageShop {
    Home = "home",
    ComputerCase = "computercase",
    Motherboard = "motherboard",
    GPU = "gpu",
    CPU = "cpu",
    RAM = "ram",
    Memory = "memory",
    PowerSupply = "powersupply",
    Cooling = "cooling"
}

export enum SelectedPageWorkshop {
    Home = "home",
    History = "history"
}

export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
}

export interface ComputerParts {
    image: string;
    itemPage: SelectedPageShop;
}

export interface WorkType {
    name: string;
    description?: string
    image: string;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type Order = {
    id: number;
    computerCase: Product;
    motherboard: Product;
    gpu: Product;
    cpu: Product;
    ram: Product;
    hardMemory: Product;
    powerSupply: Product;
    cooler: Product;
    sum: number;
    date: string;
};

export type WorkshopOrder = {
    id: number;
    date: string;
    time: string;
    service: string;
    description: string;
    done: boolean;
    localDateTime: string;
}
