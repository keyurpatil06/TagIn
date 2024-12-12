import Image from "next/image";

const DiscoverCard = ({
  title,
  description,
  imgURL,
  alt
}: {
  title: string;
  description: string;
  imgURL: string;
  alt: string;
}) => {
  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
      <Image
        src={imgURL}
        alt={alt}
        height={1000}
        width={800}
        className=" w-full"
      />
      <h2 className="text-xl font-bold text-white mt-3">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  )
}

export default DiscoverCard
