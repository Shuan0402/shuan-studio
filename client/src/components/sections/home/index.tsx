import { forwardRef } from 'react';
import { profileData } from '../../../data/profile';
import ProfileCard from './ProfileCard';
import ContactIcons from './ContactIcons';
import SkillTags from './SkillTags';

interface SectionProps {
  id: string;
}

const Home = forwardRef<HTMLElement | null, SectionProps>((props, ref) => {
  return (
    <section 
      id={props.id} 
      ref={ref} 
      className="min-h-full w-full flex items-center justify-center relative px-10"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 w-full max-w-7xl">
        
        {/* 左側：個人卡片 */}
        <ProfileCard 
          name={profileData.name} 
          nameEn={profileData.nameEn} 
          imagePath="Shuan.jpg" 
        />

        {/* 右側：詳細文字介紹區 */}
        <div className="flex-1 space-y-6 text-left">
          <div className="space-y-4">
            <h2 className="text-stone-800 text-5xl font-black tracking-tighter">About Me</h2>
            <p className="text-blue-600 text-2xl font-extrabold tracking-tight">
              {profileData.title}
            </p>
            
            <div className="max-w-2xl text-stone-500 leading-relaxed font-medium text-lg space-y-1">
              {profileData.education.map((edu, i) => (
                <p key={i}>
                  {edu.status} <span className="text-stone-900 font-bold">{edu.school} {edu.department}</span>
                </p>
              ))}
              <p className="pt-2">{profileData.bio}</p>
            </div>
          </div>

          {/* 聯絡資訊圖標 */}
          <ContactIcons contact={profileData.contact} />
          
          {/* 技能標籤區 */}
          <SkillTags skills={profileData.skills} />
        </div>
      </div>
    </section>
  );
});

Home.displayName = 'Home';
export default Home;