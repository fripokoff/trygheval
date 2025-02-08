import GeneralSection from "./sections/GeneralSection";
import AttachmentSection from "./sections/AttachmentSection";
import PreliminarySection from "./sections/PreliminarySection";
import MandatorySection from "./sections/MandatorySection";
import BonusSection from "./sections/BonusSection";
import GradingOptionsSection from "./sections/GradingOptionsSection";

export default function SheetForm({
  sheetData,
  options,
  show,
  handleClose,
  handleChange,
  openModal,
  selectedDate
}) {

  return (
    <div className="mt-4">
      <div className="bg-base-100 rounded-xl p-2 lg:p-5">
      <GeneralSection
          options={options}
          show={show}
          handleClose={handleClose}
          handleChange={handleChange}
          openModal={openModal}
          selectedDate={selectedDate}
        />
        <AttachmentSection/>
        <PreliminarySection sheetData={sheetData} openModal={openModal}/>
        <MandatorySection sheetData={sheetData} openModal={openModal}/>
        <BonusSection sheetData={sheetData} openModal={openModal}/>
        <GradingOptionsSection/>
      </div>
    </div>
  );
}