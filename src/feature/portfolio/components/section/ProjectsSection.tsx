import { useNavigate } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiFileText, FiUsers, FiUser } from 'react-icons/fi';

import styles from './ProjectsSection.module.css';
import type { ProjectData } from '../../types';
import { SkillBadge } from '@/components';

interface ProjectsSectionProps {
  data: ProjectData[];
}

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionDesc}>
          문제 해결 과정과 기술적 성장을 중심으로 정리했습니다.
        </p>
      </div>

      <div className={styles.projects}>
        {data.map((project) => (
          <article
            key={project.id}
            className={styles.project}
          >
            <div className={styles.projectHeader}>
              <div className={styles.projectMeta}>
                <span className={styles.period}>{project.period}</span>
                <span className={styles.projectType}>
                  {project.isTeamProject ? (
                    <>
                      <FiUsers size={14} />
                      팀 프로젝트 ({project.teamSize}명)
                    </>
                  ) : (
                    <>
                      <FiUser size={14} />
                      개인 프로젝트
                    </>
                  )}
                </span>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.role}>{project.role}</p>
            </div>

            <p className={styles.description}>{project.shortDescription}</p>

            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <SkillBadge key={tech} name={tech} size="sm" />
              ))}
            </div>

            <div className={styles.highlights}>
              <h4 className={styles.highlightsTitle}>주요 성과 & 문제 해결</h4>
              <ul className={styles.highlightsList}>
                {project.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className={styles.highlightItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.links}>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  onClick={handleLinkClick}
                >
                  <FiGithub size={16} />
                  GitHub
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  onClick={handleLinkClick}
                >
                  <FiExternalLink size={16} />
                  Demo
                </a>
              )}
              {project.links.notion && (
                <a
                  href={project.links.notion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  onClick={handleLinkClick}
                >
                  <FiFileText size={16} />
                  문서
                </a>
              )}
              <span 
                className={styles.viewMore} 
                onClick={() => handleProjectClick(project.id)}
                >자세히 보기 →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
