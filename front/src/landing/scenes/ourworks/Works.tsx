
type Props = {
  name: string;
  description?: string
  image: string;
}

const Works = ({name, description, image}: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex xs:h-[450px] xs:w-[450px] flex-col items-center 
  justify-center whitespace-normal bg-primary-500 text-center text-white opacity-0
  transition duration-500 hover:opacity-90`;
  
    return (
    <li className="relative mx-5 inline-block xs:h-[380px] xs:w-[450px]">
        <div className={overlayStyles}>
            <p className="text-2xl">{name}</p>
            <p className="mt-5">{description}</p>
        </div>
        <img alt={`${image}`} src={image} className="xs:w-[350px] w-[200px] pt-2"/>
    </li>
  )
}

export default Works