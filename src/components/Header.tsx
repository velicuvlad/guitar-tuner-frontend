import CustomLink from "./CustomLink";

export default function Header() {
  return (
    <header>
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-text-accent sm:border-none">
          <div className=" w-full flex items-center justify-between">
            <div className={"flex items-center"}>
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-10 w-auto"
                  src={'logo.png'}
                  alt="equalizer image"
                />
              </a>
              <h2 className={'ml-10 text-base font-medium text-xl text-white hover:text-indigo-50'}>App name</h2>
            </div>
            <div className="absolute w-full flex justify-center mr-8 hidden sm:flex">
              <CustomLink to={'/tuner'} classes="mx-3 text-xl font-medium hover:text-text-accent">
                Tuner
              </CustomLink>
              <CustomLink to={'/metronome'} classes="mx-3 text-xl font-medium hover:text-text-accent">
                Metronome
              </CustomLink>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 sm:hidden">
          <CustomLink to={'/tuner'} classes="mx-3 text-xl font-medium hover:text-text-accent">
            Tuner
          </CustomLink>
          <CustomLink to={'/metronome'} classes="mx-3 text-xl font-medium hover:text-text-accent">
            Metronome
          </CustomLink>
        </div>
      </nav>
    </header>
  )
}
