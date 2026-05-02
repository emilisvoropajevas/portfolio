import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";

const App = () => {
  return (
    <div>
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl bg-black">
      <Navbar/>
      </header>
       <main>
        <HeroSection/>
        <AboutSection/>
      </main>
    </div>
  );
}

export default App;


/*  terminal loading animations on all text loading, when image loads : ubuntu like instillation loading */

/* 

About Section

Projects

Contact

*/