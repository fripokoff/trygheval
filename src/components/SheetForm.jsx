import GeneralSection from "./sections/GeneralSection";
import AttachmentSection from "./sections/AttachmentSection";
import EditMandatorySection from "./sections/EditMandatorySection";
import BonusSection from "./sections/BonusSection";
import GradingOptionsSection from "./sections/GradingOptionsSection";

export default function SheetForm({
  sheetData,
  options,
  show,
  handleClose,
  handleChange,
  openModal,
  selectedDate,
  editMode
}) {

  return (
    <div className="mt-4">
      <div className="bg-base-100 rounded-xl md:p-5 lg:p-5">
      <GeneralSection
          options={options}
          show={show}
          handleClose={handleClose}
          handleChange={handleChange}
          openModal={openModal}
          selectedDate={selectedDate}
        />
        <AttachmentSection/>
        <EditMandatorySection sheetData={sheetData} openModal={openModal} editMode={editMode}/>
        <BonusSection sheetData={sheetData} openModal={openModal}/>
        <GradingOptionsSection/>
      </div>
    </div>
  );
}