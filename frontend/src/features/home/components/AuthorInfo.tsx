import HomeSectionText from '@/components/ui/HomeSectionText';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Intro from './Intro';
import RoleDetail from './RoleDetail';
import ProjectBox from './ProjectBox';
import ExperienceBox from './ExperienceBox';
import EducationBox from './EducationBox';
import ExtraCurricularBox from './ExtraCurricularBox';
import CertificationsBox from './CertificationsBox';
import AchievementsBox from './AchievementsBox';
import MiscInfo from './MiscInfo';

const AuthorInfo: React.FC = () => {
  return (
    <div
      id="subsection-author-info"
      className="min-h-170 bg-[linear-gradient(rgba(26,34,36,0.9),rgba(0,0,0,0.5)),url(/deepdarkstarrysky_hd.jpg)] bg-[length:50%] relative"
    >
      <ScrollProgress />

      <div id="container mt-20">
        <HomeSectionText
          sectionID="author-home"
          textClass="text-[clamp(24px,2.2vw,33.7px)]"
          sectionText={
            <>
              Hi...{' '}
              <span className="border-b-2 border-[#facd8a] pb-5">
                it&apos;s An
              </span>
              ant!
            </>
          }
        />

        <Intro />

        <div className="mt-[5vw]">
          <HomeSectionText
            sectionID="author-projects"
            textClass="text-[clamp(22px,2vw,33.7px)]"
            sectionText={
              <>
                I&apos;m a{' '}
                <span className="border-b-2 border-[#facd8a] pb-5">
                  full sta
                </span>
                ck dev.
              </>
            }
          />
        </div>

        <div className="z-1">
          <RoleDetail />
        </div>

        <div className="w-full">
          <ProjectBox />
        </div>

        <div className="mt-[3vw]">
          <HomeSectionText
            sectionID="author-experience"
            textClass="text-[clamp(22px,2vw,33.7px)]"
            sectionText={
              <>
                My e
                <span className="border-b-2 border-[#facd8a] pb-5">
                  xperie
                </span>
                nce
              </>
            }
          />
        </div>

        <div id="section-experience" className="mb-[3vw]">
          <ExperienceBox />
        </div>

        <div
          id="section-education"
          className="mb-[3vw] flex justify-center flex-col items-center"
        >
          <div className="mt-[3vw] mb-[3vw]">
            <HomeSectionText
              sectionID="author-education-title"
              textClass="text-[clamp(22px,2vw,33.7px)]"
              sectionText={
                <>
                  My E
                  <span className="border-b-2 border-[#facd8a] pb-5">
                    ducatio
                  </span>
                  n
                </>
              }
            />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10 lg:gap-20 items-stretch">
            <div className="flex-1">
              <h3 className="text-[#facd8a] text-xl font-bold mb-6 text-center lg:text-left pl-6 border-l-4 border-transparent">
                Academic History
              </h3>
              <EducationBox />
            </div>

            <div className="flex-1">
              <h3 className="text-[#facd8a] text-xl font-bold mb-6 text-center lg:text-left pl-6 border-l-4 border-gray-700">
                Participation
              </h3>
              <ExtraCurricularBox />
            </div>
          </div>
          
          { /* TODO: Decide and make changes to this, it's not used for now. */ }
          {/* <div className="w-full max-w-7xl mx-auto px-4 mt-8 lg:mt-16">
            <h3 className="text-[#facd8a] text-xl font-bold mb-6 text-center lg:text-left pl-6 border-l-4 border-transparent">
              Achievements
            </h3>
            <AchievementsBox />
          </div> */}

          <div className="w-full max-w-7xl mx-auto px-4 mt-16">
            <h3 className="text-[#facd8a] text-xl font-bold mb-6 text-center border-t border-gray-800 pt-8">
              Certifications
            </h3>
            <CertificationsBox />
          </div>
        </div>

        <MiscInfo />
      </div>
    </div>
  );
};

export default AuthorInfo;
