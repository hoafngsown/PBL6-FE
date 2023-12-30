import { postApi } from '@/api/api';
import { API_PATH } from '@/api/path';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import AddProject from './components/AddProject';
import ProjectCard from './components/ProjectCard';

function WorkSpace() {

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getProjectList = async () => {
    const response = await postApi(API_PATH.PROJECT.GET_ALL, {}, {});
    return response.data.metadata;
  }

  const { data: projectList, refetch } = useQuery({
    queryKey: ['get_list_project'],
    queryFn: getProjectList,
    onSuccess(data) {
      console.log({ data })
    },
    onError(err) {
      console.log({ err })
    },
  })

  return (
    <>
      <div className='p-3'>
        <h3 className='text-center text-2xl font-bold'>My WorkSpace</h3>
        <div className='shadow-sm mt-6 rounded-sm bg-white px-8 py-4'>

          <div className='flex justify-end '>
            <Button
              variant='contained'
              size='large'
              className='w-fit custom-button'
              type='button'
              onClick={() => setIsOpenDialog(true)}
            >
              Add Project
            </Button>
          </div>

          <div className='mt-10 grid grid-cols-4 gap-x-8'>
            {
              projectList && projectList.length && projectList.map((project) => (
                <ProjectCard key={project.projectID} project={project} />
              ))
            }

          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <AddProject
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onAddProject={() => {
          setIsOpenDialog(false);
          refetch();
        }}
      />
    </>
  )
}

export default WorkSpace