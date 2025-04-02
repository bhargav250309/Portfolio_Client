import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFrontendData } from '../../store/slices/frontendSlice';
import ApiLoader from '../../components/apiLoader';
import Loaderpage from '../../components/loaderpage';
import Navbar from '../../components/navbar';

const HomePage = lazy(() => import('./homePage'));
const ProjectsPage = lazy(() => import('./projectsPage'));
const AboutPage = lazy(() => import('./aboutPage'));
const ContactPage = lazy(() => import('./contactPage'));

function UserPage() {
  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'true');
  
  const dispatch = useDispatch();
  const {isLoading, data, error } = useSelector((state) => state.frontend);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    dispatch(getFrontendData()); // Fetch data when component mounts
  }, [dispatch]);

  if (error) {
    return <p className="text-red-500 text-center">Failed to load data. Please try again later.</p>;
  }

  if (isLoading) {
    return <ApiLoader />;
  }

  return (
    <>
      <Loaderpage />
      <Suspense fallback={<ApiLoader />}>
        <div className="app">
          <Navbar 
            toggleTheme={() => setIsDarkMode((prev) => !prev)} 
            isDarkMode={isDarkMode} 
            navName={data.userInfo?.[0]?.navText || 'Loading...'}
          />
          <main className="relative">
            <section id="home">
              {data.userInfo?.length > 0 ? (
                <HomePage userInfo={data.userInfo[0]} links={data.links?.[0]} stack={data.stackInfo} />
              ) : (
                <p>Loading Home Info...</p>
              )}
            </section>
            <section id="project">
              {data.projectInfo?.length > 0 ? (
                <ProjectsPage projects={data.projectInfo} />
              ) : (
                <p>Loading Projects...</p>
              )}
            </section>
            <section id="about">
              {data.aboutInfo?.length > 0 ? (
                <AboutPage aboutInfo={data.aboutInfo[0]} links={data.links?.[0]} />
              ) : (
                <p>Loading About Info...</p>
              )}
            </section>
            <section id="reachout">
              {data.links?.length > 0 ? (
                <ContactPage links={data.links[0]} />
              ) : (
                <p>Loading Contact Info...</p>
              )}
            </section>
          </main>
        </div>
      </Suspense>
    </>
  );
}

export default UserPage;
