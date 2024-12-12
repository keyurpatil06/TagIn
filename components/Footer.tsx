import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mt-auto whitespace-nowrap">
      <span className="tracking-wider text-gray-400">Made by </span>
      <Link
        href="https://github.com/keyurpatil06"
        className="underline text-gray-200 font-semibold tracking-wide whitespace-nowrap"
        target="_blank"
      >
        Keyur Patil
      </Link>
    </footer>
  )
}

export default Footer