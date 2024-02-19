import Featured from "@/components/Featured/Featured";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeatured } from "@/libs/apis";

const Home= async()=> {
  const featured = await getFeatured();
  return (
    <>
    <HeroSection/>
    <PageSearch/>
    <Featured featured = {featured}/>
    <Gallery/>
    <NewsLetter/>
    </> 
  
  );
}
export default Home;
