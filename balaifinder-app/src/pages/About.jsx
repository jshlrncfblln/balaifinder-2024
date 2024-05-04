import Footer from "../components/Footer"
import Navbar from "../components/navbar"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"


function About() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-400">
        <Navbar />
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mb-24 text-center">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                  Meet the Developers of BalaiFinders
              </h1>
              <p className="text-sky-700 text-xl font-semibold mt-2">Introducing the Syntax Finders</p>
          </div>
          {/*This section is for Project*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="order-2 md:order-1">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Joshua.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Project Manager/Software Engineer/ Full Stack Developer
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Joshua Laurence
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Joshua Laurence Fabillon, a vital asset to our team,
                serving in the essential capacities of Project Manager, Software
                Engineer, and Full Stack Developer. With an acute attention to
                detail and an innate drive for innovation, Joshua masterfully
                manages project timelines, ensuring smooth collaboration among
                teams. His extensive expertise in software engineering enables him
                to engineer solutions that are robust and reliable. As a Full
                Stack Developer, Joshua seamlessly navigates both front-end and
                back-end development, delivering user-friendly interfaces and code
                that's both efficient and scalable. With Joshua leading the way,
                our projects excel thanks to his leadership, technical
                proficiency, and unwavering commitment to excellence.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/kuyafabi/" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />
            </div>
          </div>
          {/*This section is for Associate Software Engineer*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1 md:text-right">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Assistant Software Engineer/ Lead Front-End Developer
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Vince Edward
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Vince Edward Sy, a valued team member serving as both
                Assistant Software Engineer and Lead Front-End Developer. Vince's
                contributions are integral to our projects; he assists in software
                development tasks and leads the design of user-friendly front-end
                interfaces. With a keen eye for aesthetics and strong coding
                skills, Vince ensures our applications are not only visually
                appealing but also function smoothly. In his role as Lead
                Front-End Developer, Vince leads the team in creating engaging
                user experiences, driving the adoption of best practices and
                innovative solutions. Vince's commitment and expertise are key
                drivers of our project success.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/kuyafabi/" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />            
            </div>
            <div className="order-1 md:order-2">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Vince.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
          </div>
          {/*This section is for Lead Back-End*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Paul.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Lead Back-End Developer/ Database Manager
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Paul Adrien
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Paul Adrien Arangorin, an indispensable asset within
                our team, holding the key positions of Lead Back-End Developer and
                Database Manager. Paul's contributions are pivotal to our projects
                as he leads the development of server-side logic and oversees
                database management, guaranteeing smooth and effective data
                storage and retrieval processes. With a sharp emphasis on
                enhancing performance and scalability, Paul designs and implements
                strong back-end solutions that seamlessly drive our applications.
                In his role as Database Manager, Paul diligently maintains and
                enhances our databases, safeguarding data integrity and
                dependability. Paul's expertise and unwavering commitment play a
                vital role in steering the success of our projects.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/kuyafabi/" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />
            </div>
          </div>
          {/*This section is for Front-End*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1 md:text-right">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Front-End Developer
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Jumyl Reyes
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Jumyl Reyes, a skilled Front-end Developer adding
                creativity and accuracy to our team. Jumyl's focus lies in
                creating compelling user interfaces and dynamic experiences that
                capture our audience's attention. Possessing a sharp design sense
                and proficiency in HTML, CSS, and JavaScript, Jumyl translates
                ideas into visually impressive and intuitive websites and
                applications. His commitment to staying abreast of the newest web
                development trends guarantees our projects remain at the forefront
                of innovation. Jumyl's efforts play a pivotal role in providing
                meaningful digital solutions for our clients.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/kuyafabi/" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />              
            </div>
            <div className="order-1 md:order-2">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Jumyl.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
          </div>
          {/*This section is for Front-End*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Crystel.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Front-End Developer
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Crystel Joy Coquia
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Crystel Joy Coquia, our skilled Front-end Developer
                who adds creativity and precision to our team. Crystel excels in
                designing visually captivating and intuitive interfaces for both
                websites and applications. Armed with expertise in HTML, CSS, and
                JavaScript, Crystel brings design ideas to life, crafting
                immersive digital experiences. Her commitment to keeping pace with
                the latest trends ensures that our projects remain innovative.
                Crystel's valuable contributions are instrumental in delivering
                effective and engaging digital solutions for our clients.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/imcrysteeel24?mibextid=ZbWKwL" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="https://www.instagram.com/joyimnida_?igsh=MW00ank5ODN0OWN5YQ==" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="https://github.com/imcrysteeel" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />
            </div>
          </div>
          {/*This section is for Back-End*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1 md:text-right">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Back-End Developer/Database Manager
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Alryan Licup
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Alryan Licup, an adept Back-End Developer and Database
                Manager who holds a crucial position within our team. Alryan's
                focus lies in crafting the server-side logic for our applications
                and overseeing database operations. Proficient in programming
                languages such as Java, Python, and SQL, Alryan ensures smooth
                data handling, storage, and retrieval processes. His duties extend
                to enhancing database performance, safeguarding data integrity,
                and enforcing security protocols. Alryan's attention to detail and
                technical expertise are key factors in driving the success of our
                projects.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/shirensui?mibextid=JRoKGi" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="https://github.com/AruLicup" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Alryan.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
          </div>
          {/*This section is for Technical Writer*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Steven.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Technical Writer/ Software QA
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Steven Daniel Boloy
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Steven Daniel Boloy, a crucial team member fulfilling
                the roles of Technical Writer and Software QA specialist. Steven's
                strength lies in crafting detailed documentation and user guides
                that streamline our workflows and improve user satisfaction. In
                his capacity as a Software QA expert, Steven rigorously evaluates
                our applications to guarantee they meet high-quality standards and
                operate seamlessly. With his sharp eye for detail and effective
                communication abilities, Steven plays a central role in delivering
                exceptional software solutions that surpass expectations.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/steven.boloy.7?mibextid=ZbWKwL" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="https://www.instagram.com/stevenboloy?igsh=MWNzbWRmNnVxYXN3aw==" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="https://github.com/StevenDaniel16" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />
            </div>
          </div>
          {/*This section is for Technical Writer*/}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-16">
            <div className="order-2 md:order-1 md:text-right">
              <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
                Technical Writer/ Software QA
              </h1>
              <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                Lyka Mae Fortuna
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Introducing Lyka Mae Fortuna, a key member of our team handling
                Technical Writing and Software Quality Assurance. Lyka stands out
                in crafting straightforward documentation that simplifies
                intricate technical ideas. Moreover, she conducts thorough testing
                on our software, guaranteeing they adhere to quality benchmarks
                and operate seamlessly. Lyka's precision and communication prowess
                play a vital role in delivering refined software solutions that
                effectively address user requirements.
              </p>
              {/*Social Media Links*/}
              <div className="mt-4 mb-4 flex justify-center">
                <a href="https://www.facebook.com/JimLy.ParkJimin28?mibextid=ZbWKwL" className="flex items-center justify-start m-2 hover:text-sky-500"><FaFacebook className="size-10"/><span className="ml-2"></span></a>
                <a href="https://www.instagram.com/mey_2_u?igsh=MTlmeWdmanV0ang5aw==" className="flex items-center justify-start m-2 hover:text-sky-500"><FaInstagram className="size-10"/><span className="ml-2"></span></a>
                <a href="https://github.com/LYKAMAEEE" className="flex items-center justify-start m-2 hover:text-sky-500"><FaGithub className="size-10"/><span className="ml-2"></span></a>
              </div>
              <hr class="border-t-2 border-gray-900" />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex justify-center md:h-auto md:w-auto">
                <img
                  src="/assets/Lyka.jpg"
                  className="object-cover object-center outline shadow-2xl shadow-sky-600 outline-sky-950 size-96 rounded-full mt-8 md:-mt-0"
                  alt="Person"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </section>
  )
}
export default About
