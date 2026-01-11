import { 
  AboutSection, 
  ArchivingSection, 
  HeroSection, 
  ProjectsSection, 
  Section, 
  SkillsSection, 
  StickyHeader} from '../components';
import { portfolioData } from '../constants';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  return (
    <div className={styles.page}>
      {/* Sticky 헤더 - 스크롤 시 표시 */}
      <StickyHeader />

      {/* Hero - 맥 창 스타일 */}
      <HeroSection data={portfolioData.hero} />

      <main className={styles.main}>
        {/* About Me */}
        <Section id="about">
          <AboutSection data={portfolioData.about} />
        </Section>

        {/* Skills */}
        <Section id="skills">
          <SkillsSection data={portfolioData.skills} />
        </Section>

        {/* Archiving */}
        <Section id="archiving">
          <ArchivingSection data={portfolioData.archiving} />
        </Section>

        {/* Projects */}
        <Section id="projects">
          <ProjectsSection data={portfolioData.projects} />
        </Section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {portfolioData.about.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};
