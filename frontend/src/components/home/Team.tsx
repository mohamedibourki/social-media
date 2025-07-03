export default function Team() {
  return (
    <>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 px-20 mx-auto mt-7 text-center sm:px-0 sm:grid-cols-2 md:mt-10 gap-x-8 md:grid-cols-5 gap-y-12 lg:gap-x-16 xl:gap-x-20">
            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop"
                alt="Abdelatif"
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Abdelatif
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Chief Technology Officer (CTO)
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop"
                alt="Walid"
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Walid
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Chief Innovation Officer (CIO)
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop"
                alt="Saad"
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Saad
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Chief Executive Officer (CEO)
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop"
                alt="Abdelhakim"
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Abdelhakim
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Chief Financial Officer (CFO)
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop"
                alt="Mohamed"
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Mohamed
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Chief Operating Officer (COO)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
