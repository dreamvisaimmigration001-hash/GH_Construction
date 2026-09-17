import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectDetailView } from './ProjectDetailView';
import { PROJECTS } from '../data/ghData';

interface ProjectDetailWrapperProps {
  onStartProject: () => void;
}

export const ProjectDetailWrapper: React.FC<ProjectDetailWrapperProps> = ({ onStartProject }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    if (!project) {
      navigate('/work', { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <ProjectDetailView
      project={project}
      allProjects={PROJECTS}
      onBack={() => navigate('/work')}
      onSelectProject={(newId) => navigate(`/work/${newId}`)}
      onStartProject={onStartProject}
    />
  );
};
