import { motion } from "framer-motion"
import { useAtom } from "jotai";
import { currProjectAtom, projects } from "./ProjectSlider";

const Section = (props) => {
    const {children} = props;
    return (
        <motion.section className={`
            h-screen w-screen p-8 max-w-screen-2xl mx-auto
            flex flex-col items-start justify-center
        `}
        initial={{
            opacity: 0,
            y: 50,
        }}
        whileInView={{
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.6,
            }
        }}
        >{children}</motion.section>
    )
};

export const Interface = (props) => {
    const {setSection} = props;
    return (
    <div className="flex flex-col items-center w-screen">
        <AboutSection setSection={setSection}/>
        <div className="flex-grow"><SkillsSection/></div>
        <ProjectsSection/>
        <ContactSection/>
    </div>
    );
};

const AboutSection = (props) => {
    const {setSection} = props;
    return (
    <Section>
        <h1 className="text-6xl font-extrabold text-gray-300 leading-snug">
        Bienvenue, je suis
        </h1>
        <br />
        <span className="bg-white text-6xl font-extrabold  px-1 italic">Victor</span>

        <motion.p className="text-lg text-gray-800 mt-4"
            initial={{opacity: 0, y: 25}}
            whileInView={{ opacity: 1, y: 0}}
            transition={{ duration: 1, delay: 2 }}
        >
            <span className="leading-snug font-extrabold">Developpeur Full Stack + Pentester</span> en devenir!
            <br />
            Bienvenue sur mon espace! Vous y retrouverez mon parcours et<br />
            un aperçu de mes divers projets.
            <br />Direction <a href="https://github.com/JustCallMe-V" className="font-bold">Github</a> pour en savoir plus!    
        </motion.p>
        <motion.button onClick={() => setSection(3)}className="bg-yellow-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16">Prenons Contact</motion.button>
    </Section>
    );
};

const skills = [
    {
        title: "HTML/CSS",
        level: 40,
        icon: "https://img.icons8.com/color/48/html-5--v1.png"
    },
    {
        title: "ReactJS",
        level: 30,
        icon: "https://img.icons8.com/external-others-amoghdesign/24/external-react-native-soleicons-fill-vol-1-others-amoghdesign.png",
    },
    {
        title: "C/C++",
        level: 70,
        icon: "https://img.icons8.com/color/48/c-plus-plus-logo.png"
    },
    {
        title: "Python",
        level: 60,
        icon: "https://img.icons8.com/color/48/python--v1.png"
    },
    {
        title: "Shell scripting",
        level: 50,
        icon: "https://img.icons8.com/cute-clipart/64/console.png"
    }
];

const languages = [
    {
        title:  ":fr: Francais",
        level: 100
    },
    {
        title: ":en: English",
        level: 99
    },
    {
        title: ":de: Deutsch",
        level: 30
    }
];

const SkillsSection = () => {
   return ( 
        <Section>
            <motion.div whileInView={"visible"}>
                <span className="text-4xl bg-white italic font-extrabold ">Competences</span>
                <div className="mt-8 space-y-4">
                    {skills.map((skill, index) => (
                        <div className="w-64 " key={index}>
                            <div className="flex items-center">
                                <motion.img 
                                    className="mr-2" width="48" height="48" 
                                    initial = {{
                                      opacity: 0,  
                                    }}
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            transition:{
                                                duration: 1,
                                                delay: 1 + index * 0.2,
                                            }
                                        }
                                    }}
                                    src={skill.icon}
                                >
                                </motion.img>
                                <motion.h3 
                                    className="text-xl font-bold text-gray-800"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    variants={{
                                        visible: {
                                          opacity: 1,
                                          transition: {
                                            duration: 1,
                                            delay: 1 + index * 0.2,
                                          },
                                        },
                                    }}
                                >
                                    {skill.title} 
                                </motion.h3>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div 
                                    className="h-full bg-indigo-600 rounded-full"
                                    initial = {{
                                        scaleX: 0,
                                        originX: 0,
                                    }}
                                    variants={{
                                        visible:{
                                            scaleX: 1,
                                            transition:{
                                                duration: 1,
                                                delay: 1 + index * 0.2,
                                            }
                                        }
                                    }}
                                    style={{ width: `${skill.level}%`}}/>
                            </div>
                        </div>                            
                    ))}
                </div>
            </motion.div>

            <motion.div whileInView={"visible"}>  
                <h2><span className="text-4xl italic font-extrabold bg-white mt-10"><br />Langues</span></h2>
                <div className="mt-8 space-y-4">
                    {languages.map((lang, index) => (
                        <div className="w-64" key={index}>
                            <motion.h3 
                                className="text-xl font-bold text-gray-800"
                                initial={{
                                    opacity: 0,
                                  }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      transition: {
                                        duration: 1,
                                        delay: 2 + index * 0.2,
                                      },
                                    },
                                  }}>
                                {lang.title}
                            </motion.h3>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div 
                                    className="h-full bg-indigo-600 rounded-full"
                                    initial = {{
                                        scaleX: 0,
                                        originX: 0,
                                    }}
                                    variants={{
                                        visible: {
                                            scaleX: 1,
                                            transition:{
                                                duration: 1,
                                                delay: 2 + index * 0.2,
                                            }
                                        }
                                    }}
                                    style={{width: `${lang.level}%`}}>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </Section>
   );
};


const ProjectsSection = () => {
    const [currProject, setCurrProject] = useAtom(currProjectAtom);
    const nextProject = () => {
        setCurrProject((currProject + 1 ) % projects.length)
    }
    const previousProject = () => {
        setCurrProject((currProject - 1 ) % projects.length)
    }
    return (
        <Section>
            <div className="flex w-full h-full gap-8  items-center justify-center">
                <button className="bg-yellow-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16" onClick={previousProject}>← Previous</button>
                <h2 className="bg-white text-4xl font-extrabold  px-1 italic">Projets et Realisations</h2>
                <button className="bg-yellow-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16" onClick={nextProject}>Next →</button>
            </div>
        </Section>
    );
};

const ContactSection = () => {
    return(
        <Section>
            <h2 className="text-5xl font-bold">Contact!</h2>
            <div className="mt-8 p-8 rounded-md bg-gray-400 w-96 max-w-full">
                <form action="" method="post">
                    <label htmlFor="name" className="font-medium text-gray-900 block mb-1">Nom</label>
                    <input type="text" name="name" id="name" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"/>
                    <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">Mail</label>
                    <input type="email" name="email" id="email"             className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"/>
                    <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">Message</label>
                    <textarea name="message" id="message" className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"/>
                    <button className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">Envoyer</button>
                </form>
            </div>
        </Section>
    );
};

