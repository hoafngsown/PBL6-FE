import { MY_WORKSPACE } from '@/constants';
import { IProject } from '@/types/project';
import { r } from '@/utils/routes';
import { useNavigate } from 'react-router-dom';

interface IProps {
  project: IProject;
};

function ProjectCard({ project }: IProps) {
  const navigate = useNavigate();

  const onGotoDetail = () => {
    navigate(r(MY_WORKSPACE.PROJECT_DETAIL, { id: project.projectID }));
  };

  return (
    <div
      onClick={onGotoDetail}
      className='cursor-pointer p-3 rounded-lg border border-solid border-gray-200 shadow-sm h-[300px] transition-all
      hover:-translate-y-4 hover:shadow-lg'>
      <img
        src='https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png'
        alt='project-card'
        className='h-[135px] object-cover'
      />

      <div className='mt-4'>
        <h4 className='font-medium text-xl'>{project.title}</h4>
        <p className='text-sm tracking-wide text-ellipsis overflow-hidden'>
          {project.title}
        </p>
      </div>
    </div>
  )
}

export default ProjectCard