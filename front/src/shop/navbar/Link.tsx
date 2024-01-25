import { SelectedPageShop } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll"

type Props = {
    page: string;
    selectedPage: SelectedPageShop;
    setSelectedPage: (value: SelectedPageShop) => void;
}

const LinkNav = ({ page, selectedPage, setSelectedPage }: Props) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPageShop;

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

export default LinkNav