import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div>
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl bg-black">
      <Navbar/>
      </header>
       <main>
        <HeroSection/>
        <AboutSection/>
        <ProjectsSection/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;


/*  terminal loading animations on all text loading, when image loads : ubuntu like instillation loading */

/* 

Play around with background intenisty of grid

Skills Section - Skill Tree as i add in more skills

Contact

Footer
*/