import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import HistoryArchiveIndex from '@/components/history/HistoryArchiveIndex';
import HistoryTimelineExperience from '@/components/history/HistoryTimelineExperience';

export default function HistoryPage() {
  return <main className="historyArchivePage historyTimelineV2Page">
    <div className="historyArchiveUtility">
      <BreadcrumbTrail className="historyPath" items={[{label:'FORMA OPUS',href:'/'},{label:'ACADEMIA',href:'/?scene=academia'},{label:'HISTORY',href:'/academia/history'}]} />
      <span>HISTORY TIMELINE SYSTEM V2</span>
    </div>
    <HistoryTimelineExperience />
    <HistoryArchiveIndex embedded />
  </main>;
}
