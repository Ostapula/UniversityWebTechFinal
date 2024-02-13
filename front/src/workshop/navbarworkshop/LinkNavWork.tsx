import { SelectedPageWorkshop } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll"

type Props = {
    page: string;
    selectedPage: SelectedPageWorkshop;
    setSelectedPage: (value: SelectedPageWorkshop) => void;
}

const LinkNavWrok = ({ page, selectedPage, setSelectedPage }: Props) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPageWorkshop;

    return (
        <AnchorLink
            className={`${selectedPage === lowerCasePage ? "text-primary-500" : "" }
                transition duration-500 hover:text-primary-300
            `}
            href={`#${lowerCasePage}`}
            onClick={() => setSelectedPage(lowerCasePage)}
        >
            {page}
        </AnchorLink>
    )
}

export default LinkNavWrok